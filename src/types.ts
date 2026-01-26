export interface VersionInfo {
  "version": string;
  "date": string;
  "detail": string;
}
export interface DiaryInfo {
  "id": string;
  "date": string;
  "title": string;
  "detail": string;
  "tags": string[];
  "files": string[];
}
export interface News {
  "id": string;
  "date": string;
  "title": string;
  "abstruct": string;
  "detail": string;
  "tags": string[];
  "files": string[];
}
export interface TagInfo {
  "id": string;
  "label": string;
}