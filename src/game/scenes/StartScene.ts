import { Scene } from "phaser";

import { assets, ENameImage } from "@/game/const";
import { EventBus } from "@/game/EventBus";
import { Button } from "@/ui";

export class StartScene extends Scene {
  constructor() {
    super("StartScene");
  }

  preload() {
    this.load.image(ENameImage.SNAKE_HEAD, assets.SNAKE_HEAD);
    this.load.image(ENameImage.SNAKE_HEAD_NO_EYES, assets.SNAKE_HEAD_NO_EYES);
    this.load.image(ENameImage.SNAKE_BLOB, assets.SNAKE_BLOB);
  }

  create() {
    this.createSnakePreview();
    this.createUI();

    EventBus.emit("current-scene-ready", this);
  }

  get centerX() {
    return this.scale.width / 2;
  }

  get centerY() {
    return this.scale.height / 2;
  }

  private createSnakePreview() {
    const blobSize = [100, 100] as const;

    const snakeContainer = this.add.container(0, this.centerY);
    const snakeHead = this.add.image(this.centerX, 0, ENameImage.SNAKE_HEAD);
    const snakeSecondBlob = this.add.image(
      this.centerX - 10,
      -280,
      ENameImage.SNAKE_BLOB,
    );
    const snakeFirstBlob = this.add.image(
      this.centerX + 10,
      -190,
      ENameImage.SNAKE_BLOB,
    );

    snakeHead.setDisplaySize(300, 300);
    snakeSecondBlob.setDisplaySize(blobSize[0], blobSize[1]);
    snakeFirstBlob.setDisplaySize(blobSize[0], blobSize[1]);
    snakeContainer.add([snakeSecondBlob, snakeFirstBlob, snakeHead]);

    this.time.addEvent({
      delay: 1000,
      callback: () => {
        snakeHead.setTexture(ENameImage.SNAKE_HEAD_NO_EYES);

        this.time.delayedCall(200, () => {
          snakeHead.setTexture(ENameImage.SNAKE_HEAD);
        });
      },
      loop: true,
    });

    this.tweens.add({
      targets: [snakeFirstBlob],
      x: this.centerX - 10,
      duration: 700,
      yoyo: true,
      repeat: -1,
    });

    this.tweens.add({
      targets: [snakeSecondBlob],
      x: this.centerX + 10,
      duration: 700,
      yoyo: true,
      repeat: -1,
    });
  }

  private createUI() {
    this.add
      .text(this.centerX, this.centerY + 230, "Змейка", {
        fontSize: "70px",
      })
      .setOrigin(0.5);

    new Button(this, this.centerX, this.centerY + 350, "Начать игру", () => {
      this.scene.start("GameScene");
    });
  }
}
