const urlToAssets = "/assets/";

export enum ENameImage {
  "SNAKE_HEAD" = "SNAKE_HEAD",
  "SNAKE_HEAD_NO_EYES" = "SNAKE_HEAD_NO_EYES",
  "SNAKE_BLOB" = "SNAKE_BLOB",
  "WALL_BLOCK" = "WALL_BLOCK",
  "APPLE_GREEN" = "APPLE_GREEN",
  "APPLE_RED" = "APPLE_RED",
}

export const assets: Record<ENameImage, string> = {
  SNAKE_HEAD: urlToAssets + "snake-head.png",
  SNAKE_HEAD_NO_EYES: urlToAssets + "snake-head-no-eyes.png",
  SNAKE_BLOB: urlToAssets + "snake-blob.png",
  WALL_BLOCK: urlToAssets + "wall-block.png",
  APPLE_GREEN: urlToAssets + "apple-green.png",
  APPLE_RED: urlToAssets + "apple-red.png",
};
