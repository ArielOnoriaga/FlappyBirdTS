import Canvas from "@class/Canvas";
import Keyboard from "@class/Keys";
import Bird from "@class/Bird";

class Game {
  private _game: number = 0;
  private _lose: Boolean = false;
  private _keyboard = new Keyboard();
  private _bird: any;


  private _container: any;

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
      if(this.lose || this._bird.isFlapping) return;

      this._bird.moveDown();

      if(this._bird.outOfScreen)
        this._gameOver();
    }, 20);
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