import {
  forwardRef,
  useEffect,
  useLayoutEffect,
  useRef,
  useImperativeHandle,
} from "react";
import StartGame from "@/game/main";
import { EventBus } from "@/game/EventBus";

export interface IRefPhaserGame {
  game: Phaser.Game | null;
  scene: Phaser.Scene | null;
}

interface IProps {
  currentActiveScene?: (scene_instance: Phaser.Scene) => void;
}

export const PhaserGame = forwardRef(({ currentActiveScene }: IProps, ref) => {
  const game = useRef<Phaser.Game | null>(null);
  const scene = useRef<Phaser.Scene | null>(null);

  useImperativeHandle(ref, () => ({
    game: game.current,
    scene: scene.current,
  }));

  useLayoutEffect(() => {
    if (!game.current) {
      game.current = StartGame("game-container");
    }

    return () => {
      game.current?.destroy(true);
      game.current = null;
    };
  }, []);

  useEffect(() => {
    const onSceneReady = (scene_instance: Phaser.Scene) => {
      scene.current = scene_instance;
      currentActiveScene?.(scene_instance);
    };

    EventBus.on("current-scene-ready", onSceneReady);

    return () => {
      EventBus.removeListener("current-scene-ready", onSceneReady);
    };
  }, [currentActiveScene]);

  return <div id="game-container"></div>;
});
