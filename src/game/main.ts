import { AUTO, Game, Types } from "phaser";

import { StartScene, GameScene, EndScene } from "@/game/scenes";

const config: Types.Core.GameConfig = {
  type: AUTO,
  width: 1920,
  height: 1080,
  parent: "game-container",
  backgroundColor: "#009B00",
  scene: [StartScene, GameScene, EndScene],
};

const StartGame = (parent: string) => {
  return new Game({ ...config, parent });
};

export default StartGame;
