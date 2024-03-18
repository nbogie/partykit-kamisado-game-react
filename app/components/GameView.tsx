import { calcCellForNextPlay } from "../gameCore/GameState";
import { positionToString } from "../gameCore/createInitialGrid";
import { areSamePosition } from "../gameCore/position";
import { useGameRoom } from "../hooks/useGameRoom";
import { CellC } from "./CellC";
import "./Game.css";
import { GameOverOverlay } from "./GameOverOverlay";

interface GameViewProps {
    username: string;
    roomId: string;
}

function GameView({ username, roomId }: GameViewProps) {
    const { gameState, dispatch } = useGameRoom(username, roomId);

    // Indicated that the game is loading
    if (gameState === null) {
        return <p>Waiting for server...</p>;
    }

    const cellForNextPlay = calcCellForNextPlay(gameState);

    return (
        <div className="Game">
            <h1>Kamisado</h1>
            <div className="grid">
                {gameState.winState.type === "won" && (
                    <GameOverOverlay
                        gameState={gameState}
                        dispatch={dispatch}
                    />
                )}
                {gameState.grid.rows.flatMap((row) =>
                    row.map((cell) => (
                        <CellC
                            key={
                                cell.piece
                                    ? cell.piece.id
                                    : positionToString(cell.position)
                            }
                            isCellForNextPlay={
                                !!cellForNextPlay &&
                                areSamePosition(
                                    cell.position,
                                    cellForNextPlay.position
                                )
                            }
                            cell={cell}
                            dispatch={dispatch}
                        />
                    ))
                )}
            </div>
            <div>whose turn: {gameState.whoseTurn}</div>
            <div>win state: {gameState.winState.type}</div>
            <div>selection: {JSON.stringify(gameState.selection)}</div>
            <div>next flavour: {gameState.nextFlavour}</div>
            <details>
                <summary>game state</summary>
                <pre>{JSON.stringify(gameState, null, 2)}</pre>
            </details>
        </div>
    );
}

export default GameView;
