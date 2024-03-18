import { type GameState } from "../gameCore/GameState";
import { type GameAction } from "../gameCore/reducerFunction";

export function GameOverOverlay({
    gameState,
    dispatch,
}: {
    gameState: GameState;
    dispatch: React.Dispatch<GameAction>;
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
