import { Scene } from "phaser";

import { EventBus } from "@/game/EventBus";
import { Button } from "@/ui";

export class EndScene extends Scene {
  constructor() {
    super("EndScene");
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
      .text(this.centerX, this.centerY - 100, "Конец Игры", {
        fontSize: "70px",
      })
      .setOrigin(0.5);

    new Button(this, this.centerX, this.centerY + 50, "Попробовать Ещё", () => {
      this.scene.start("GameScene");
    });
  }
}
