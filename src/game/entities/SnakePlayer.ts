import { Scene, GameObjects, Types } from "phaser";

import { ENameImage } from "@/game/const";

export class SnakePlayer extends GameObjects.Container {
  private cursors: Types.Input.Keyboard.CursorKeys | undefined;
  private tailContainer: GameObjects.Container;
  private direction: "up" | "down" | "left" | "right" = "right";
  private speed: number = 3;
  score: number = 0;
  health: number = 0;

  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y);

    this.cursors = scene.input.keyboard?.createCursorKeys();

    const snakeContainer = scene.add.container(0, 0);
    const snakeHead = scene.add
      .image(0, 0, ENameImage.SNAKE_HEAD)
      .setDisplaySize(50, 50)
      .setOrigin(0.5);

    this.tailContainer = scene.add.container(0, 0);

    snakeContainer.add([this.tailContainer, snakeHead]);

    this.add(snakeContainer);
    scene.add.existing(this);
    scene.physics.add.existing(this);

    (this.body as Phaser.Physics.Arcade.Body)
      .setSize(50, 50)
      .setOffset(-25, -25);
  }

  update() {
    this.handleInput();
    this.move();
  }

  private handleInput() {
    if (this.cursors?.up.isDown && this.direction !== "down") {
      this.direction = "up";
    } else if (this.cursors?.down.isDown && this.direction !== "up") {
      this.direction = "down";
    } else if (this.cursors?.left.isDown && this.direction !== "right") {
      this.direction = "left";
    } else if (this.cursors?.right.isDown && this.direction !== "left") {
      this.direction = "right";
    }

    this.updateTailPositions();
  }

  private move() {
    switch (this.direction) {
      case "up":
        this.y -= this.speed;
        break;
      case "down":
        this.y += this.speed;
        break;
      case "left":
        this.x -= this.speed;
        break;
      case "right":
        this.x += this.speed;
        break;
    }
  }

  updateSnakeData(type: "dec" | "inc") {
    if (type === "dec") {
      this.health -= 1;
      this.speed -= 0.5;

      const last = this.tailContainer.list.at(-1) as GameObjects.Image;

      if (this.score > 0) {
        this.score -= 1;
      }

      if (last) {
        last.destroy();
      }
    } else {
      this.speed += 0.5;
      this.score += 1;

      if (this.health < 3) {
        this.health += 1;

        this.addTailSegment();
      }
    }
  }

  private addTailSegment() {
    const lastSegment = this.tailContainer.list.at(-1) as GameObjects.Image;

    const newX = lastSegment ? lastSegment.x - 20 : -30;
    const newBlob = this.scene.add
      .image(newX, 0, ENameImage.SNAKE_BLOB)
      .setDisplaySize(20, 20);

    this.tailContainer.add(newBlob);
  }

  private updateTailPositions() {
    const segments = this.tailContainer.list as GameObjects.Image[];
    const spacing = 15;
    const baseOffset = 30;

    segments.forEach((segment, index) => {
      const offset = baseOffset + index * spacing;

      switch (this.direction) {
        case "up":
          segment.setPosition(0, offset);
          break;
        case "down":
          segment.setPosition(0, -offset);
          break;
        case "left":
          segment.setPosition(offset, 0);
          break;
        case "right":
          segment.setPosition(-offset, 0);
          break;
      }
    });
  }
}
