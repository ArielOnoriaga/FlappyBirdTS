class Bird {
  private _birdHeight: number = 50;
  private _container: any;

  private _flap: number = 35;
  private _flapInterval: NodeJS.Timeout | any;
  private _flapping: boolean = false;
  private _flapTime: number = 200;

  private _flyHeight: number = 0;
  private _weight: number = 5;

  constructor (container: any) {
    this._container = container;

    this._setFlyHeight(this._container.height / 2 + this._birdHeight);
  }

  public draw(): void {
    this._container.refresh();

    this._container.drawRectangle('yellow', {
      height: this._birdHeight,
      width: 50,
      x: 100,
      y: this._flyHeight,
    });
  }

  public flap(): void {
    clearInterval(this._flapInterval);
    this.setFlapping(true);

    this._setFlyHeight(this._flyHeight - this._flap * 0.2);
    this.draw();

    setTimeout(() => {
      this._setFlyHeight(this._flyHeight - this._flap * 0.3);
      this.draw();
    }, 40);

    setTimeout(() => {
      this._setFlyHeight(this._flyHeight - this._flap * 0.6);
      this.draw();
    }, 10);

    this._flapInterval = setTimeout(() => {
      this.setFlapping(false);
    }, this._flapTime);
  }

  public moveDown(): void {
    this._setFlyHeight(this._flyHeight + this._weight);

    this.draw();
  }

  get flyHeight(): number {
    return this._flyHeight;
  }

  get outOfScreen(): boolean {
    const screenTop = 0;
    return this.flyHeight + this._birdHeight > this._container.height || this.flyHeight <= screenTop;
  }

  get isFlapping(): boolean {
    return this._flapping;
  }

  public setFlapping(state: boolean): void {
    this._flapping = state;
  }

  public setWeight(gravity: number): void {
    this._weight = gravity;
  }

  private _setFlyHeight(height: number): void {
    this._flyHeight = height;
  }
}

export default Bird;