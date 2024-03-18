import { produce } from "immer";
import { addLogMutating, type GameState, type ServerAction } from "./GameState";
import { createInitialGameState } from "./createInitialGameState";
import { doPieceClicked } from "./doPieceClicked";
import { type Position } from "./position";

export type GameAction = ClickedAction | RestartAction;
export type ClickedAction = { type: "clicked"; pos: Position };
export type RestartAction = { type: "restart" };

export function reduceWithImmer(
    baseState: GameState,
    action: ServerAction
): GameState {
    const nextState = produce(baseState, (draft) => {
        reducerFunction(draft, action);
    });
    return nextState;
}

export function reducerFunction(gs: GameState, action: ServerAction) {
    switch (action.type) {
        case "clicked": {
            doPieceClicked(gs, action);
            addLogMutating("Piece clicked ", gs.log);
            return;
        }
        case "restart": {
            createInitialGameState();
            addLogMutating("Restarted ", gs.log);
            return;
        }
        case "UserEntered": {
            if (gs.users.length < 2) {
                gs.users.push(action.user);
                addLogMutating("User joined " + action.user.id, gs.log);
            }
            return;
        }
        case "UserExited": {
            createInitialGameState();
            addLogMutating("User left " + action.user.id, gs.log);
            return;
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
