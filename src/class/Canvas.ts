// @ts-ignore
import { CanvasElement, CanvasContext, Cords } from "@types/canvas";
// @ts-ignore
import PipesInterface from "@types/Pipes";
// @ts-ignore
import { Position } from "@types/Bird";

import Pipes from "@class/Pipes";

export class Canvas {
  private _flappyContainer: CanvasElement = document.createElement('canvas');
  private _context: CanvasContext = this.container.getContext('2d');

  private _width: number;
  private _height: number;

  private _pipes: PipesInterface[] = [];
  private _spaceBetween = 300;

  constructor(width: number, height: number) {
    this._width = width;
    this._height = height;

    const pipes = this._generatePipes();
    this._setPipes(pipes);
  }

  private _generatePipes(): PipesInterface[] {
    const maxPipes = 3;
    const pipes: PipesInterface[] = [];
    let lastPipe: number = 200;

    for(let i = 0; i < maxPipes; i++) {
      pipes.push(new Pipes(this, this._getHeight(), lastPipe));

      lastPipe += this._spaceBetween;
    }

    return pipes;
  }

  private _getHeight(): number {
    const minHeight = 200;
    const maxHeight = this.height - minHeight;

    return Math.floor(Math.random() * (maxHeight - minHeight) + minHeight);
  }

  private _setPipes(pipes: PipesInterface[]) {
    this._pipes = pipes;
  }

  private _removePipe(): void {
    this._pipes.shift();
  }

  private _addPipe(): void {
    const pipe = new Pipes(this, this._getHeight(), 300);

    this._pipes.push(pipe);
  }

  get ctx(): CanvasContext {
    return this._context;
  }

  get container(): CanvasElement {
    return this._flappyContainer;
  }

  get width(): number {
    return this._width;
  }

  get height(): number {
    return this._height;
  }

  public init(): void {
    this.container.width = this.width;
    this.container.height = this.height;

    this.refresh();

    const body = document.getElementsByTagName('body');
    body[0].appendChild(this.container);
  }

  private _drawBackground(): void {
    this.drawRectangle('gray', {
      height: this.height,
      width: this.width,
      x: 0,
      y: 0
    });
  }

  public refresh(birdPosition?: Position): void {
    this._drawBackground();

    const [firstPipe] = this._pipes;

    if(firstPipe.position < 30) {
      this._addPipe();
      this._removePipe();
    }

    if(birdPosition) {
      const  { top, bottom, right } = birdPosition;

      if(firstPipe.isCrossing(right) && !firstPipe.between(top, bottom))
        throw new Error('Loseeeeer!')
    }

    this._pipes.forEach(pipe => pipe.doSteep());
  }

  public drawRectangle(color: string, cords: Cords): void {
    this.ctx.fillStyle = color;

    const { x, y, width, height } = cords;

    this.ctx.fillRect(x, y, width, height);
  }
}

export default Canvas;