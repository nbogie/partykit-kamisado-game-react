export type Position = { x: number; y: number };

/**
 * all positions between from and to, excluding from and to
 * @param from
 * @param to
 * @returns
 */
export function generateAllPositionsBetween(
    from: Position,
    to: Position
): Position[] {
    if (!isOnLine(from, to)) {
        throw new Error("Not on line");
    }
    if (from.x === to.x) {
        return generateAllPositionsBetweenVertical(from, to);
    } else if (from.y === to.y) {
        return generateAllPositionsBetweenHorizontal(from, to);
    } else {
        return generateAllPositionsBetweenDiagonal(from, to);
    }
}
function generateAllPositionsBetweenDiagonal(from: Position, to: Position) {
    const positions: Position[] = [];
    const xDir = from.x < to.x ? 1 : -1;
    const yDir = from.y < to.y ? 1 : -1;
    for (
        let x = from.x + xDir, y = from.y + yDir;
        x !== to.x;
        x += xDir, y += yDir
    ) {
        positions.push({ x, y });
    }
    return positions;
}

function generateAllPositionsBetweenHorizontal(from: Position, to: Position) {
    const positions: Position[] = [];
    const left = Math.min(from.x, to.x);
    const right = Math.max(from.x, to.x);
    for (let x = left + 1; x < right; x++) {
        positions.push({ x, y: from.y });
    }
    return positions;
}

function generateAllPositionsBetweenVertical(from: Position, to: Position) {
    const positions: Position[] = [];
    const top = Math.min(from.y, to.y);
    const bottom = Math.max(from.y, to.y);
    for (let y = top + 1; y < bottom; y++) {
        positions.push({ x: from.x, y });
    }
    return positions;
}

export function isOnLine(from: Position, to: Position) {
    return (
        from.x === to.x ||
        from.y === to.y ||
        Math.abs(from.x - to.x) === Math.abs(from.y - to.y)
    );
}

export function areSamePosition(p1: Position, p2: Position) {
    return p1.x === p2.x && p1.y === p2.y;
}
