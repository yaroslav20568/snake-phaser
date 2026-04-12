import { Scene } from "phaser";

import { EventBus } from "@/game/EventBus";
import { Button } from "@/ui";

export class EndScene extends Scene {
  private score: number;
  private bestScore: number;

  constructor() {
    super("EndScene");
  }

  init(data: { score: number; bestScore: number }) {
    this.score = data.score;
    this.bestScore = data.bestScore;
  }

  create() {
    this.createUI();

    EventBus.emit("current-scene-ready", this);
  }

  get centerX() {
    return this.scale.width / 2;
  }

  get centerY() {
    return this.scale.height / 2;
  }

  private createUI() {
    this.add
      .text(this.centerX, this.centerY - 150, "Конец Игры", {
        fontSize: "70px",
      })
      .setOrigin(0.5);

    this.add
      .text(
        this.centerX,
        this.centerY - 50,
        `Очки: ${this.score} / Рекорд: ${this.bestScore}`,
        {
          fontSize: "40px",
        },
      )
      .setOrigin(0.5);

    new Button(
      this,
      this.centerX,
      this.centerY + 150,
      "Попробовать Ещё",
      () => {
        this.scene.start("GameScene");
      },
    );
  }
}
