import { Scene } from "phaser";

import { assets, ENameImage } from "@/game/const";
import { SnakePlayer } from "@/game/entities";
import { EventBus } from "@/game/EventBus";

export class GameScene extends Scene {
  private snake: SnakePlayer | undefined;

  constructor() {
    super("GameScene");
  }

  preload() {
    this.load.image(ENameImage.SNAKE_HEAD, assets.SNAKE_HEAD);
  }

  create() {
    const { width, height } = this.scale;

    this.snake = new SnakePlayer(this, width / 2, height / 2);

    EventBus.emit("current-scene-ready", this);
  }

  update() {
    this.snake?.update();
  }
}
