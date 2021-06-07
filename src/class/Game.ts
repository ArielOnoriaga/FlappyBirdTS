import Canvas from "@class/Canvas";
import Keyboard from "@class/Keys";
import Bird from "@class/Bird";

// @ts-ignore
import BirdInterface from "@types/Bird";
// @ts-ignore
import CanvasInterface from "@types/canvas";

class Game {
  private _bird: BirdInterface;
  private _container: CanvasInterface;
  private _game: number = 0;
  private _keyboard = new Keyboard();
  private _lose: Boolean = false;

  constructor(width: number, height: number) {
    this._container = new Canvas(width, height);

    this._bird = new Bird(this.game);
  }

  public init(): void {
    this.game.init();

    this._bird.draw();
    this._bird.flap();

    this._setEvents();
  }

  private _setEvents(): void {
    window.addEventListener('keydown', (evt: KeyboardEvent): void => {
      if(this._keyboard.isUp(evt) && !this.lose) {
        this._bird.flap();
      }
    });

    setInterval(() => {
      if(this.lose) return;

      if(!this._bird.isFlapping)
        this._bird.moveDown();

      this._bird.draw();

      if(this._bird.outOfScreen)
        this._gameOver();

    }, 15);
  }

  get game() {
    return this._container;
  }

  get lose() {
    return this._lose;
  }

  private _gameOver(): void {
    this._setLose();

    clearInterval(this._game);

    alert('Lose');
  }

  private _setLose(): void {
    this._lose = true;
  }
}

export default Game;