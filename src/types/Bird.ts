interface Bird {
  draw: () => void;
  flap: () => void;
  flyHeight: number;
  isFlapping: boolean;
  moveDown: () => void;
  outOfScreen: boolean;
  setFlapping: (state: boolean) => void;
  setWeight: (gravity: number) => void;
}

export default Bird;