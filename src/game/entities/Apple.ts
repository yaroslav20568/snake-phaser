import { Scene, GameObjects } from "phaser";

import { ENameImage } from "@/game/const";

type TVariant = "negative" | "positive";

export class Apple extends GameObjects.Container {
  variant: TVariant = "negative";

  constructor(scene: Scene, variant: TVariant) {
    const { x, y } = Apple.getRandomCoords(scene);

    super(scene, x, y);

    this.variant = variant;

    const apple = scene.add.image(
      0,
      0,
      variant === "negative" ? ENameImage.APPLE_RED : ENameImage.APPLE_GREEN,
    );
    apple.setDisplaySize(30, 30);

    this.add(apple);
    scene.add.existing(this);
    scene.physics.add.existing(this);

    const body = this.body as Phaser.Physics.Arcade.Body;

    body.setSize(30, 30);
    body.setOffset(-15, -15);

    scene.add.tween({
      targets: apple,
      scale: { from: apple.scale, to: apple.scale * 1.2 },
      duration: 800,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
    });
  }

  private static getRandomCoords(scene: Scene) {
    const worldView = scene.cameras.main.worldView;
    const padding = 200;

    const x = Phaser.Math.Between(
      worldView.left + padding,
      worldView.right - padding,
    );

    const y = Phaser.Math.Between(
      worldView.top + padding,
      worldView.bottom - padding,
    );

    return { x, y };
  }
}
