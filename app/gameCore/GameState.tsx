import { positionToString } from "./createInitialGrid";
import { type Position, generateAllPositionsBetween } from "./position";
import type { GameAction } from "./reducerFunction";

// If there is anything you want to track for a specific user, change this interface
export interface User {
    id: string;
}

// Do not change this! Every game has a list of users and log of actions
interface BaseGameState {
    users: User[];
    log: {
        dt: number;
        message: string;
    }[];
}

export interface GameState extends BaseGameState {
    winState: { type: "in-play" } | { type: "won"; winner: PlayerColour };
    nextFlavour: Flavour | null;
    whoseTurn: PlayerColour;
    grid: Grid;
    selection: {
        from: Position | null;
        to: Position | null;
    };
    //TODO: maintain last destination cell instead of nextFlavour directly
    //and highlight this cell for the players.
}

export interface Grid {
    rows: Cell[][];
}

export interface Cell {
    position: Position;
    flavour: Flavour;
    piece?: Piece;
}
export type PieceId = string;
export type Piece = {
    id: PieceId;
    type: PieceType;
    flavour: Flavour;
    owner: PlayerColour;
};
export type Flavour =
    | "orange"
    | "blue"
    | "purple"
    | "pink"
    | "yellow"
    | "red"
    | "green"
    | "brown";
export type PieceType = "standard";
export type PlayerColour = "white" | "black";

type CompleteSelection = { from: Position; to: Position };
export function selectionIsComplete(
    selection: GameState["selection"]
): selection is CompleteSelection {
    return selection.from !== null && selection.to !== null;
}

export function cellAt(pos: Position, gs: GameState): Cell {
    const cell = gs.grid.rows[pos.y][pos.x];
    if (!cell) {
        throw new Error("No cell (invalid position?) " + positionToString(pos));
    }
    return cell;
}
export function pieceAt(pos: Position, gs: GameState): Piece | null {
    const cell = cellAt(pos, gs);
    return cell?.piece ?? null;
}

export function clearSelection(gs: GameState) {
    gs.selection = { from: null, to: null };
}

export function isPositionInEndGoalFor(to: Position, owner: PlayerColour) {
    return (
        (to.y === 0 && owner === "black") || (to.y === 7 && owner === "white")
    );
}
export function flipWhoseTurn(gs: GameState) {
    gs.whoseTurn = gs.whoseTurn === "white" ? "black" : "white";
}

export function isPathBlocked(from: Position, to: Position, gs: GameState) {
    const allPositions: Position[] = generateAllPositionsBetween(from, to);
    return allPositions.some((pos) => {
        return !!pieceAt(pos, gs);
    });
}

export function allCells(gameState: GameState): Cell[] {
    console.log({ gameState });
    return gameState.grid.rows.flatMap((row) => row);
}
export function calcCellForNextPlay(gameState: GameState): Cell | null {
    const cell = allCells(gameState).find(
        (cell) =>
            cell.piece &&
            cell.piece.owner === gameState.whoseTurn &&
            cell.piece.flavour === gameState.nextFlavour
    );

    return cell ?? null;
}

export type ServerAction = WithUser<DefaultAction> | WithUser<GameAction>;

// Do not change!
export type Action = DefaultAction | GameAction;

export function addLogMutating(message: string, logs: GameState["log"]): void {
    logs.push({ dt: new Date().getTime(), message: message });
    const MAX_LOG_LENGTH = 3;
    if (logs.length > MAX_LOG_LENGTH) {
        logs.splice(0, logs.length - MAX_LOG_LENGTH);
    }
}

type WithUser<T> = T & { user: User };

export type DefaultAction = { type: "UserEntered" } | { type: "UserExited" };
