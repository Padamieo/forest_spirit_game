import './Canvas.css';

import { FC, useEffect, useRef, useState } from 'react';
import { createPixiApp, useViewport } from '../../utils/pixiUtils';
import { useScenario } from '../../hooks/useScenario';
import { Container, Sprite, Texture } from 'pixi.js';

export const Canvas: FC = () => {
  const pixiApp = createPixiApp('map');
  const containerRef = useRef<HTMLDivElement>(null);
  const viewport = useViewport(pixiApp);
  const [isAssetsLoaded, setIsAssetsLoaded] = useState(false);

  const aaa = useRef(new Container());
  aaa.current.name = 'aaa';

  const { scenarioContainer } = useScenario(isAssetsLoaded, pixiApp, viewport);

  useEffect(() => {
    // TODO: ensure assets are loaded
    setIsAssetsLoaded(true);

    return () => {
      pixiApp.stage.removeChild(viewport);
    };
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      //pixiApp.resizeTo = containerRef.current;
      pixiApp.resize();

      pixiApp.stage.addChild(viewport);

      // aaa.current.zIndex = 111;
      pixiApp.stage.addChild(aaa.current);

      containerRef.current.appendChild(pixiApp.view);
    }

    return () => {
      containerRef?.current?.removeChild(pixiApp.view);
    };
  }, [containerRef]);

  useEffect(() => {
    if (isAssetsLoaded) {
      const a = aaa.current.addChild(new Sprite(Texture.WHITE));
      a.tint = 0xffff00;
      a.width = a.height = 20;
      a.position.set(50, 50);

      // Add children
      viewport.addChild(scenarioContainer);
      // console.log(viewport.scaled);
      viewport.setZoom(1.0, true);
      // viewport.moveCenter(250, 250);
      console.log(viewport);
    }
  }, [isAssetsLoaded]);

  return (
    <div className="test" ref={containerRef}>
      {/* NOTE: UI overlays can be put here */}
    </div>
  );
};

export default Canvas;
