import { createInitialGrid } from "./createInitialGrid";
import { type GameState } from "./GameState";

export function createInitialGameState(): GameState {
    return {
        grid: createInitialGrid(),
        whoseTurn: "black",
        selection: { from: null, to: null },
        nextFlavour: null,
        winState: { type: "in-play" },
        users: [],
        log: [],
        // winState: { type: "won", winner: "black" },
    };
}
