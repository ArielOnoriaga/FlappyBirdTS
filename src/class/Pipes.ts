// @ts-ignore
import Canvas from "@types/canvas";

class Pipe {
  private _container: Canvas;

  private _color: string = 'lime';
  private _currentPosition: number;

  private _height: number;
  private _space: number = 200;
  private _steep: number = 3;
  private _width: number = 100;

  constructor(container: Canvas, height: number, width?: number) {
    this._container = container;

    this._currentPosition = this._container.width + this._width;

    if(width !== undefined) {
      this._currentPosition += width;
    }

    this._height = height;
  }

  private _drawTop(): void {
    this._baseDrag(true);
  }

  private _drawDown(): void {
    this._baseDrag(false);
  }

  private _baseDrag(isTop: Boolean): void {
    const size = {
      y: this._height + this._space,
      height: this._container.height,
    }

    if(isTop) {
      size.y = 0;
      size.height = this._height
    }

    this._container.drawRectangle(this._color, {
      width: this._width,
      x: this._currentPosition,
      ...size,
    });
  }

  private _setPosition(): void {
    this._currentPosition = this._currentPosition - this._steep;
  }

  public doSteep(): void {
    this._setPosition();

    this.draw();
  }

  get position(): number {
    return this._currentPosition + this._width;
  }

  public draw(): void {
    this._drawTop();
    this._drawDown();
  }
}

export default Pipe;