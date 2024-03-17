import {
    GameState,
    cellAt,
    clearSelection,
    flipWhoseTurn,
    isPathBlocked,
    isPositionInEndGoalFor,
    pieceAt,
    selectionIsComplete,
} from "./GameState";
import { isOnLine } from "./position";
import { ClickedAction } from "./reducerFunction";

export function doPieceClicked(gs: GameState, action: ClickedAction) {
    if (!gs.selection.from) {
        const p = pieceAt(action.pos, gs);
        if (
            !p ||
            p.owner !== gs.whoseTurn ||
            (gs.nextFlavour && p.flavour !== gs.nextFlavour)
        ) {
            return;
        }
        gs.selection.from = action.pos;
    } else {
        gs.selection.to = action.pos;
    }

    if (selectionIsComplete(gs.selection)) {
        moveSelectedPiece(gs);
    }
}

export function moveSelectedPiece(gs: GameState) {
    if (!selectionIsComplete(gs.selection)) {
        throw new Error("selection is not complete");
    }
    const { from, to } = gs.selection;
    const fromCell = cellAt(from, gs);
    const toCell = cellAt(to, gs);

    if (!isOnLine(from, to)) {
        clearSelection(gs);
        return;
    }

    if (!fromCell.piece) {
        clearSelection(gs);
        return;
    }
    if (toCell.piece) {
        clearSelection(gs);
        return;
    }

    const pieceToMove = fromCell.piece;
    if (pieceToMove.owner !== gs.whoseTurn) {
        return;
    }
    if (gs.nextFlavour && gs.nextFlavour !== pieceToMove.flavour) {
        clearSelection(gs);
        return;
    }
    if (isPathBlocked(from, to, gs)) {
        clearSelection(gs);
        return;
    }
    fromCell.piece = undefined;
    toCell.piece = pieceToMove;
    gs.nextFlavour = toCell.flavour;

    if (isPositionInEndGoalFor(to, pieceToMove.owner)) {
        gs.winState = { type: "won", winner: pieceToMove.owner };
    }
    flipWhoseTurn(gs);
    clearSelection(gs);
}
