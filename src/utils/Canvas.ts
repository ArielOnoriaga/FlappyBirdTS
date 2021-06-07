// @ts-ignore
import { DrawRectangle } from "@types/canvas";

export const drawRectangle = ({
  ctx,
  color,
  cords,
}: DrawRectangle): void => {
  ctx.fillStyle = color;

  const { x, y, width, height } = cords;

  ctx.fillRect(x, y, width, height);
}
