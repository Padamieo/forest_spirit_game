import { Viewport } from 'pixi-viewport';
import { Application, Container, Geometry, Graphics, Mesh, Resource, Shader, Sprite, Texture } from 'pixi.js';
import { useEffect, useRef } from 'react';
// import { MazeDimensions } from 'types';
// import { getMapTexture } from 'utils/pixiUtils';

class Bbb extends Sprite {
  public velocity: { x: number; y: number } = { x: 0, y: 0 };

  constructor(texture: Texture<Resource> | undefined) {
    super(texture);
  }

  customCall() {
    // this.position.x = this.position.x + this.velocity.x;
    console.log('a a a');
  }
}

export const useScenario = (isInitialised: boolean, app?: Application, viewport?: Viewport) => {
  const backgroundContainer = useRef(new Container<Sprite>());
  backgroundContainer.current.name = 'background';
  // backgroundContainer.current.interactiveChildren = false;

  const createBackground = () => {
    if (viewport) {
      const sprite = viewport.addChild(new Bbb(Texture.WHITE));
      sprite.tint = 0xff0000;
      sprite.width = sprite.height = 10;
      sprite.position.set(10, 10);
      sprite.anchor.set(0.5);
      // sprite.velocity = { x: 0, y: 0 }

      sprite.cursor = 'pointer';
      // sprite.interactive = true;
      sprite.eventMode = 'dynamic';

      // sprite.onmousedown = (() => console.log('test'))
      sprite.on('click', () => {
        // console.log('test');
        sprite.customCall();
      });
      // sprite.onmouseover = (() => console.log('test'))

      // app && app.ticker.add((delta) => {
      //   sprite.rotation += 0.01;
      // });

      viewport.addChild(sprite);

      const geometry = new Geometry();

      // .addAttribute('aVertexPosition', // the attribute name
      //   [-100, -50, // x, y
      //     100, -50, // x, y
      //     0.0, 100.0], // x, y
      //   2) // the size of the attribute

      // .addAttribute('aColor', // the attribute name
      //   [1, 0, 0, // r, g, b
      //     0, 1, 0, // r, g, b
      //     0, 0, 1], // r, g, b
      //   3); // the size of the attribute

      geometry.addAttribute('aVertexPosition', [-100, -50, 100, -50, 0.0, 100.0], 2);
      geometry.addAttribute('aColor', [1, 0, 0, 0, 1, 0, 0, 0, 1], 3);
      geometry.addIndex([0, 1, 2]);

      const shader = Shader.from(
        `

      precision mediump float;
      attribute vec2 aVertexPosition;
      attribute vec3 aColor;

      uniform mat3 translationMatrix;
      uniform mat3 projectionMatrix;

      varying vec3 vColor;

      void main() {

      vColor = aColor;
      gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);

      }`,

        `precision mediump float;

      varying vec3 vColor;

      void main() {
      gl_FragColor = vec4(vColor, 1.0);
      }

      `,
      );

      const triangle = new Mesh(geometry, shader);

      triangle.position.set(10, -100);
      triangle.scale.set(1);
      triangle.zIndex = 100;
      triangle.eventMode = 'dynamic';
      triangle.interactive = true;

      // triangle.on('mouseover', (event) => {
      //   event.preventDefault()
      //   return;
      // });

      triangle.on('click', async (event) => {
        //console.log('h', event);
        if (!app) {
          return;
        }

        console.log(event);
        // const x = app.renderer.generateTexture(viewport);
        // console.log(x);
        // const a = app.renderer.extract.canvas(app.stage); // viewport app.stage triangle

        const imageThis = app.renderer.generateTexture(viewport, {
          region: app.screen,
          resolution: 1,
        });

        const a = app.renderer.extract.canvas(imageThis);
        imageThis.destroy();

        console.log(a, event);
        const canvas = a.getContext('2d');

        // document.body.appendChild(a);

        if (!canvas) {
          return;
        }
        console.log(event.screenX, event.screenY);
        var data = canvas.getImageData(event.screenX, event.screenY, 1, 1);
        console.log(data);
        var rgb = [data.data[0], data.data[1], data.data[2]];
        console.log(rgb);
      });
      viewport.addChild(triangle);

      viewport.sortableChildren = true;
    }

    //
    if (viewport) {
      const line = viewport.addChild(new Graphics());
      line.lineStyle(10, 0xff00ff).drawRect(0, 0, viewport.worldWidth, viewport.worldHeight);
    }

    // const texture = getMapTexture('background');
    // const background = Sprite.from(texture);
    // background.width = MazeDimensions.Width;
    // background.height = MazeDimensions.Height;
    // background.x = 0;
    // background.y = 0;

    //backgroundContainer.current.addChild(background);
  };

  useEffect(() => {
    if (!isInitialised) {
      return;
    }

    if (backgroundContainer.current.children.length <= 0) {
      createBackground();
    }
  }, [isInitialised]);

  return { scenarioContainer: backgroundContainer.current };
};
