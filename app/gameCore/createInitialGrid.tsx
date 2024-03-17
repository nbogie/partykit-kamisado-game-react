import { Cell, Flavour, Grid, Piece, PlayerColour } from "./GameState";
import { Position } from "./position";

export function createInitialGrid(): Grid {
    const rows = [];
    for (let rowIx = 0; rowIx < 8; rowIx++) {
        const row: Cell[] = [];
        rows.push(row);
        for (let colIx = 0; colIx < 8; colIx++) {
            const pos: Position = { x: colIx, y: rowIx };
            const piece = pieceForStartingPosition(pos) ?? undefined;
            const cell: Cell = {
                position: pos,
                flavour: colourForPosition(pos),
                piece: piece,
            };
            row.push(cell);
        }
    }
    return { rows };
}

export function colourForPosition(pos: Position): Flavour {
    const data = `
    obpkyrgm
    rokgbymp
    gkorpmyb
    kpbomgry
    yrgmobpk
    bymprokg
    pmybgkor
    mgrykpbo
    `
        .split("\n")
        .map((s) => s.trim())
        .filter((s) => s.length === 8);
    const row = data[pos.y];
    const code = row[pos.x];

    const lookup: Record<string, Flavour> = {
        o: "orange",
        p: "purple",
        k: "pink",
        b: "blue",
        m: "brown",
        g: "green",
        y: "yellow",
        r: "red",
    };
    return lookup[code];
}

export function positionToString(position: Position): string {
    return `${position.x},${position.y}`;
}
function pieceForStartingPosition(pos: Position): Piece | null {
    if (pos.y !== 0 && pos.y !== 7) {
        return null;
    }

    const playerColour: PlayerColour = pos.y === 0 ? "white" : "black";

    const flavour = colourForPosition(pos);

    return {
        type: "standard",
        flavour,
        owner: playerColour,
        id: "piece_" + playerColour + "_" + flavour,
    };
}
