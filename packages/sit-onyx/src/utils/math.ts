export function distanceToFurthestCorner(x: number, y: number, rect: DOMRect) {
  const dx = Math.max(Math.abs(x - rect.left), Math.abs(x - rect.right));
  const dy = Math.max(Math.abs(y - rect.top), Math.abs(y - rect.bottom));
  return Math.hypot(dx, dy);
}
