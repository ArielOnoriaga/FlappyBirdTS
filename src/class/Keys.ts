export class Keys {
  private up: string[] = ['ArrowUp', 'KeyW'];
  private down: string[] = ['ArrowDown', 'KeyS'];

  public isUp (evt: KeyboardEvent): boolean {
    return this.up.includes(evt.code);
  }

  public isDown (evt: KeyboardEvent): boolean {
    return this.down.includes(evt.code);
  }
}

export default Keys;