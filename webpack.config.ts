import CopyPlugin from "copy-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";
import * as tagIndex from './static/data/tag';
import * as newsIndex from './static/data/news';
import * as versionIndex from './static/data/versions';
import * as bugIndex from './static/data/bugs';

const viewdir = path.resolve(__dirname, "view");
const outdir = path.resolve(__dirname, 'docs');

const htmlPlugins: {title: string, filename: string, template: string, rootPath: string, params?: {[key: string]: any}}[] = [
  {
    title: "",
    filename: "index.html",
    template: "index.ejs",
    rootPath: "./",
    params: {
      newsIndex: newsIndex.index
    }
  },
  {
    title: "ダウンロード",
    filename: "download.html",
    template: "download.ejs",
    rootPath: "./",
    params: {
      versionIndex: versionIndex.index
    }
  },
  {
    title: "バージョン履歴",
    filename: "versions.html",
    template: "versions.ejs",
    rootPath: "./",
    params: {
      versionIndex: versionIndex.index
    }
  },
  {
    title: "くぉーつについて",
    filename: "about.html",
    template: "about.ejs",
    rootPath: "./"
  },
  {
    title: "お問い合わせ",
    filename: "contact.html",
    template: "contact.ejs",
    rootPath: "./",
    params: {
      bugIndex: bugIndex.index
    }
  },
  {
    title: "お知らせ",
    filename: "news.html",
    template: "news.ejs",
    rootPath: "./",
    params: {
      newsIndex: newsIndex.index
    }
  },
  ...newsIndex.index.map(news => {
    return {
      title: news.title,
      filename: `news/${news.id}.html`,
      template: "detail.ejs",
      rootPath: "../",
      params: {
        content: {
          title: news.title,
          date: news.date,
          detail: news.detail,
          tags: news.tags.map(tagLabel => tagIndex.index.find(tag => tag.id === tagLabel))
        },
        feedbackDisabled: true
      }
    }
  }),
]

module.exports = async () => {
  return {
    entry: {
      'footer.js': './src/footer.ts',
      'function.js': "./src/function.ts"
    },
    target: ["web", "es5"],
    output: {
      path: outdir,
      filename: '[name]',
    },
    resolve: {
      fallback: {
        "path": false,
        "fs": false,
        "assert": false
      },
      extensions: [
        '.ts', '.js',
      ],
    },
    mode: 'development',
    devtool: "source-map",
    module: {
      rules: [
        {
          test: /\.css/,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: { url: false }
            }
          ]
        },
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          },
        }
      ]
    },
    plugins: [
      new CopyPlugin({
        patterns: [
          {
            from: "./static/css",
            to: path.join(outdir, "css")
          },
          {
            from: "./static/img",
            to: path.join(outdir, "img")
          },
          {
            from: "./static/game-assets",
            to: path.join(outdir, "game-assets")
          }
        ]
      }),
      ...htmlPlugins.map(htmlPlugin => {
        return new HtmlWebpackPlugin({
          filename: htmlPlugin.filename,
          template: "!!ejs-webpack-loader!" + path.join(viewdir, htmlPlugin.template),
          inject: false,
          templateParameters: {
            pageTitle: htmlPlugin.title,
            rootPath: htmlPlugin.rootPath,
            ...(htmlPlugin.params || {})
          }
        })
      })
    ],
    devServer: {
      historyApiFallback: {
        rewrites: [
          {
            from: /^(.*)$/, to: (context) => {
              return `${context.parsedUrl.pathname}.html`;
            }
          }
        ]
      },
    }
  }
};