import { GameState } from "../gameCore/GameState";
import { Action } from "../gameCore/reducerFunction";

export function GameOverOverlay({
    gameState,
    dispatch,
}: {
    gameState: GameState;
    dispatch: React.Dispatch<Action>;
}) {
    if (gameState.winState.type === "won") {
        return (
            <div className="gameOverOverlay">
                <div>Game over! {gameState.winState.winner} wins!</div>
                <button onClick={() => dispatch({ type: "restart" })}>
                    Restart
                </button>
            </div>
        );
    }
    return null;
}
