import { Scene, GameObjects, Types } from "phaser";

import { ENameImage } from "@/game/const";

export class SnakePlayer extends GameObjects.Container {
  private cursors: Types.Input.Keyboard.CursorKeys | undefined;
  private direction: "up" | "down" | "left" | "right" = "right";
  private speed: number = 3;

  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y);

    this.cursors = scene.input.keyboard?.createCursorKeys();

    const snakeHead = scene.add.image(0, 0, ENameImage.SNAKE_HEAD);
    snakeHead.setDisplaySize(50, 50);

    this.add(snakeHead);

    scene.add.existing(this);
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
}
