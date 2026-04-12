import { Scene, GameObjects } from "phaser";

import { ENameImage } from "@/game/const";

type TVariant = "negative" | "positive";

export class Apple extends GameObjects.Container {
  variant: TVariant = "negative";

  constructor(
    scene: Scene,
    variant: TVariant,
    existingApples: Phaser.Physics.Arcade.Group,
  ) {
    const { x, y } = Apple.getRandomCoords(scene, existingApples);

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

  private static getRandomCoords(
    scene: Scene,
    existingApples: Phaser.Physics.Arcade.Group,
  ) {
    const { width, height } = scene.scale;
    const padding = 100;
    const minDistance = 50;
    const coords = { x: 0, y: 0 };
    let isTooClose = true;

    while (isTooClose) {
      coords.x = Phaser.Math.Between(padding, width - padding);
      coords.y = Phaser.Math.Between(padding, height - padding);

      const apples = existingApples.getChildren() as Apple[];

      isTooClose = apples.some((apple) => {
        const dist = Phaser.Math.Distance.Between(
          coords.x,
          coords.y,
          apple.x,
          apple.y,
        );

        return dist < minDistance;
      });
    }

    return coords;
  }
}
