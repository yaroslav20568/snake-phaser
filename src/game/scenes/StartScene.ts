import { Scene } from "phaser";

import { EventBus } from "@/game/EventBus";

export class StartScene extends Scene {
  constructor() {
    super("StartScene");
  }

  create() {
    EventBus.emit("current-scene-ready", this);
  }
}
