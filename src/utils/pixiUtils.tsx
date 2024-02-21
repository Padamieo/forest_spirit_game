import { useEffect, useState } from 'react';
import { Application, Ticker } from 'pixi.js';
import * as PIXI from 'pixi.js';
import { Viewport } from 'pixi-viewport';

export const temporaryFieldDimensions = { Width: 300, Height: 300 };

export const createPixiApp = (name: string) => {
  const resolution = window.devicePixelRatio || 1;
  const app = new Application({
    antialias: true,
    autoDensity: true,
    backgroundColor: '#417961',
    resolution,
  });
  app.stage.name = name;

  Ticker.shared.maxFPS = 120; // Cap FPS to 60.

  //if (__DEV__) {
  //  registerPixiInspector();
  //}

  return app;
};

export const useViewport = (app: Application) => {
  const [viewport] = useState(() => createViewport(app));

  useEffect(() => {
    return () => {
      viewport.removeChildren();
    };
  }, [viewport]);

  return viewport;
};

export const createViewport = (app: Application) => {
  const viewport = new Viewport({
    screenWidth: window.innerWidth,
    screenHeight: window.innerHeight,
    worldWidth: temporaryFieldDimensions.Width,
    worldHeight: temporaryFieldDimensions.Height,
    // interaction: app.renderer.plugins.interaction, // the interaction module is important for wheel to work properly when renderer.view is placed or scaled
    // interaction: app.renderer.events,
    events: app.renderer.events,
  });

  viewport
    .drag()
    //   .pinch()
    //   .wheel({ keyToPress: ['KeyX'] })
    .decelerate()
    //   .clampZoom({
    //     maxWidth: MazeDimensions.Width,
    //     maxHeight: MazeDimensions.Height,
    //     minWidth: MazeDimensions.Width / 6,
    //     minHeight: MazeDimensions.Height / 6,
    //   })
    //   .clamp({ direction: 'all' })
    .fit()
    .moveCenter(temporaryFieldDimensions.Width / 2, temporaryFieldDimensions.Height / 2);

  return viewport;
};

// Registers pixi to the browser dev tool extension.
export const registerPixiInspector = () => {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  (window as any).__PIXI_INSPECTOR_GLOBAL_HOOK__ &&
    (window as any).__PIXI_INSPECTOR_GLOBAL_HOOK__.register({ PIXI: PIXI });
};
