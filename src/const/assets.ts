const urlToAssets = "/public/assets/";

export enum ENameImage {
  "SNAKE_HEAD" = "SNAKE_HEAD",
  "SNAKE_HEAD_NO_EYES" = "SNAKE_HEAD_NO_EYES",
  "SNAKE_BLOB" = "SNAKE_BLOB",
}

export const assets: Record<ENameImage, string> = {
  SNAKE_HEAD: urlToAssets + "snake-head.png",
  SNAKE_HEAD_NO_EYES: urlToAssets + "snake-head-no-eyes.png",
  SNAKE_BLOB: urlToAssets + "snake-blob.png",
};
