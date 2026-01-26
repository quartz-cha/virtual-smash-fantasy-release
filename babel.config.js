module.exports = api => {
  if (api.env("test")) {
    return {
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              node: 'current',
            },
          },
        ],
        '@babel/preset-typescript'
      ],
    }
  }
  return {
    "presets": [
      "@babel/typescript", [
        "@babel/env", {
          "modules": false,
          "targets": {
            "ie": 10
          },
          "useBuiltIns": "usage"
        }
      ]
    ],
    "plugins": [
      "@babel/plugin-proposal-object-rest-spread",
      "@babel/plugin-proposal-class-properties",
      "@babel/plugin-transform-spread",
      "@babel/plugin-proposal-optional-chaining",
      "@babel/plugin-transform-destructuring",
      ["@babel/plugin-transform-classes", { "loose": true }]
    ]
  }
};