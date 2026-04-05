import { Scene } from "phaser";

import { EventBus } from "@/game/EventBus";

export class EndScene extends Scene {
  constructor() {
    super("EndScene");
  }

  create() {
    EventBus.emit("current-scene-ready", this);
  }
}
