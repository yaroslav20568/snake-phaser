import { GameObjects, Scene } from "phaser";

export class Button extends GameObjects.Text {
  constructor(
    scene: Scene,
    x: number,
    y: number,
    text: string,
    onClick: () => void,
  ) {
    super(scene, x, y, text, {
      fontSize: "30px",
      backgroundColor: "#000",
      padding: { x: 20, y: 10 },
      color: "#fff",
    });

    this.setOrigin(0.5)
      .setInteractive({ useHandCursor: true })
      .on("pointerover", () => this.setStyle({ fill: "#ff0" }))
      .on("pointerout", () => this.setStyle({ fill: "#fff" }))
      .on("pointerdown", () => onClick());

    scene.add.existing(this);
  }
}
