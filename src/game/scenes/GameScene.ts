import { Scene } from "phaser";

import { assets, ENameImage } from "@/game/const";
import { SnakePlayer, Apple } from "@/game/entities";
import { EventBus } from "@/game/EventBus";

export class GameScene extends Scene {
  private snake: SnakePlayer | undefined;
  private apples: Phaser.Physics.Arcade.Group;

  constructor() {
    super("GameScene");
  }

  preload() {
    this.load.image(ENameImage.SNAKE_HEAD, assets.SNAKE_HEAD);
    this.load.image(ENameImage.APPLE_RED, assets.APPLE_RED);
    this.load.image(ENameImage.APPLE_GREEN, assets.APPLE_GREEN);
  }

  create() {
    const { width, height } = this.scale;

    this.apples = this.physics.add.group();

    this.spawnApples();

    this.snake = new SnakePlayer(this, width / 2, height / 2);

    this.physics.add.overlap(
      this.snake,
      this.apples,
      (_, apple) => {
        this.collectApple(apple as Apple);
      },
      undefined,
      this,
    );

    EventBus.emit("current-scene-ready", this);
  }

  update() {
    this.snake?.update();

    if (this.snake?.health === -1) {
      this.scene.start("EndScene");
    }
  }

  private collectApple(apple: Apple) {
    if (apple.variant === "negative") {
      this.snake?.updateSnakeData("dec");
    } else {
      this.snake?.updateSnakeData("inc");
    }

    apple.destroy();

    const isNotGreenApples = !this.apples.children.entries.some(
      (apple) => (apple as Apple).variant === "positive",
    );

    if (isNotGreenApples) {
      this.spawnApples();
    }
  }

  private spawnApples() {
		this.apples.clear(true, true);

    for (let i = 0; i < 4; i++) {
      const redApple = new Apple(this, "negative");
      const greenApple = new Apple(this, "positive");

      this.apples.add(redApple);
      this.apples.add(greenApple);
    }
  }
}
