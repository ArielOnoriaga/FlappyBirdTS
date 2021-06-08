interface Pipes {
  position: number;
  doSteep: () => void;
  draw: () => void;
  isCrossing: (x: number) => boolean;
  between: (y: number, y2: number) => boolean;
};

export default Pipes;