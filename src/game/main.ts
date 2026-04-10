import { AUTO, Game, Scale, Types } from "phaser";

import { StartScene, GameScene, EndScene } from "@/game/scenes";

const config: Types.Core.GameConfig = {
  type: AUTO,
  width: 1920,
  height: 1080,
  parent: "game-container",
  backgroundColor: "#005500",
  scale: {
    mode: Scale.FIT,
    autoCenter: Scale.CENTER_BOTH,
  },
  scene: [StartScene, GameScene, EndScene],
  physics: {
    default: "arcade",
  },
};

const StartGame = (parent: string) => {
  return new Game({ ...config, parent });
};

export default StartGame;
