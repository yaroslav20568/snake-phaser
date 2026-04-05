import { Scene } from "phaser";

import { EventBus } from "@/game/EventBus";

export class GameScene extends Scene {
  constructor() {
    super("Game");
  }

  create() {
    EventBus.emit("current-scene-ready", this);
  }
}
