// @ts-ignore
import { CanvasElement, CanvasContext, Cords } from "@types/canvas";

export class Canvas {
  private _flappyContainer: CanvasElement = document.createElement('canvas');
  private _context: CanvasContext = this.container.getContext('2d');

  private _width: number = 0;
  private _height: number = 0;

  constructor(width: number, height: number) {
    this._width = width;
    this._height = height;
  }

  public get ctx(): CanvasContext {
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

    this._drawBackground();

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

  public refresh(): void {
    this._drawBackground();
  }

  public drawRectangle(color: string, cords: Cords): void {
    this.ctx.fillStyle = color;

    const { x, y, width, height } = cords;

    this.ctx.fillRect(x, y, width, height);
  }
}

export default Canvas;