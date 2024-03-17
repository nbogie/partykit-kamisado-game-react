import { GameState } from "./GameState";
import { createInitialGameState } from "./createInitialGameState";
import { doPieceClicked } from "./doPieceClicked";
import { Position } from "./position";

export type Action = ClickedAction | RestartAction;
export type ClickedAction = { type: "clicked"; pos: Position };
export type RestartAction = { type: "restart" };

export function reducerFunction(gs: GameState, action: Action) {
    switch (action.type) {
        case "clicked": {
            doPieceClicked(gs, action);
            break;
        }
        case "restart": {
            return createInitialGameState();
        }
        default:
            throw new UnreachableCaseError(action);
    }
}

class UnreachableCaseError extends Error {
    constructor(val: never) {
        super(`Unreachable case: ${val}`);
    }
}
