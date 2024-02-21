import './Canvas.css';

import { FC, useEffect, useRef, useState } from 'react';
import { createPixiApp, useViewport } from '../../utils/pixiUtils';
import { useScenario } from '../../hooks/useScenario';

export const Canvas: FC = () => {
  const pixiApp = createPixiApp('map');
  const containerRef = useRef<HTMLDivElement>(null);
  const viewport = useViewport(pixiApp);
  const [isAssetsLoaded, setIsAssetsLoaded] = useState(false);

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
      containerRef.current.appendChild(pixiApp.view);
    }
  }, [containerRef]);

  useEffect(() => {
    if (isAssetsLoaded) {
      // Add children
      viewport.addChild(scenarioContainer);
      // console.log(viewport.scaled);
      viewport.setZoom(1.0, true);
      // viewport.moveCenter(250, 250);
    }
  }, [isAssetsLoaded]);

  return (
    <div className="test" ref={containerRef}>
      {/* NOTE: UI overlays can be put here */}
    </div>
  );
};

export default Canvas;
