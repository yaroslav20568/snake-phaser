import { GameObjects, Scene } from "phaser";

import { assets, ENameImage } from "@/game/const";
import { SnakePlayer, Apple } from "@/game/entities";
import { EventBus } from "@/game/EventBus";

export class GameScene extends Scene {
  private snake: SnakePlayer | undefined;
  private apples: Phaser.Physics.Arcade.Group;
  private walls: Phaser.Physics.Arcade.StaticGroup;
  private scoreText: Phaser.GameObjects.Text;
  private healthIndicator: Phaser.GameObjects.Container;

  constructor() {
    super("GameScene");
  }

  preload() {
    this.load.image(ENameImage.SNAKE_HEAD, assets.SNAKE_HEAD);
    this.load.image(ENameImage.APPLE_RED, assets.APPLE_RED);
    this.load.image(ENameImage.APPLE_GREEN, assets.APPLE_GREEN);
    this.load.image(ENameImage.WALL_BLOCK, assets.WALL_BLOCK);
  }

  create() {
    const { width, height } = this.scale;

    this.apples = this.physics.add.group();

    this.spawnApples();
    this.renderWalls();

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

    this.physics.add.overlap(
      this.snake,
      this.walls,
      () => {
        this.navigateToEndScene();
      },
      undefined,
      this,
    );

    this.renderTopBar();
    this.renderHealthIndicator();

    EventBus.emit("current-scene-ready", this);
  }

  update() {
    this.snake?.update();

    if (this.snake?.health === -1) {
      this.navigateToEndScene();
    }
  }

  private collectApple(apple: Apple) {
    if (apple.variant === "negative") {
      this.snake?.updateSnakeData("dec");
      this.healthIndicator.last?.destroy();
    } else {
      this.snake?.updateSnakeData("inc");

      if (this.healthIndicator.length <= 3) {
        this.addHealthInIndicator();
      }
    }

    if (this.scoreText) {
      this.scoreText.setText(`Очки: ${this.snake?.score}`);
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

  private renderTopBar() {
    const { width } = this.scale;
    const barHeight = 50;

    const barContainer = this.add.container(0, 0);

    const background = this.add
      .rectangle(0, 0, width, barHeight, 0x000000, 0.7)
      .setOrigin(0, 0);

    this.scoreText = this.add.text(10, 12, `Очки: ${this.snake?.score}`, {
      fontSize: "25px",
    });

    barContainer.add([background, this.scoreText]);
  }

  private renderHealthIndicator() {
    const { width } = this.scale;
    this.healthIndicator = this.add.container(width - 30, 25);

    const health = this.add
      .image(0, 0, ENameImage.SNAKE_BLOB)
      .setDisplaySize(30, 30);

    this.healthIndicator.add(health);
  }

  private renderWalls() {
    const { width, height } = this.scale;
    this.walls = this.physics.add.staticGroup();
    const tileSize = 40;

    for (let x = tileSize / 2; x < width; x += tileSize) {
      this.walls
        .create(x, tileSize / 2 + 50, ENameImage.WALL_BLOCK)
        .setDisplaySize(tileSize, tileSize)
        .refreshBody();

      this.walls
        .create(x, height - tileSize / 2, ENameImage.WALL_BLOCK)
        .setDisplaySize(tileSize, tileSize)
        .refreshBody();
    }

    for (let y = tileSize / 2; y < height - 100; y += tileSize) {
      this.walls
        .create(tileSize / 2, y + 86, ENameImage.WALL_BLOCK)
        .setDisplaySize(tileSize, tileSize)
        .refreshBody();

      this.walls
        .create(width - tileSize / 2, y + 86, ENameImage.WALL_BLOCK)
        .setDisplaySize(tileSize, tileSize)
        .refreshBody();
    }
  }

  private addHealthInIndicator() {
    const lastHealth = this.healthIndicator.list.at(
      -1,
    ) as GameObjects.Container;

    const newX = lastHealth ? lastHealth.x - 30 : -30;

    const health = this.add
      .image(newX, 0, ENameImage.SNAKE_BLOB)
      .setDisplaySize(30, 30);

    this.healthIndicator.add(health);
  }

  private navigateToEndScene() {
    this.scene.start("EndScene", { score: this.snake?.score });
  }
}
