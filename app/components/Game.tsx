import { useImmerReducer } from "use-immer";
import { calcCellForNextPlay } from "../gameCore/GameState";
import { createInitialGameState } from "../gameCore/createInitialGameState";
import { positionToString } from "../gameCore/createInitialGrid";
import { reducerFunction } from "../gameCore/reducerFunction";
import "./Game.css";
import { CellC } from "./CellC";
import { GameOverOverlay } from "./GameOverOverlay";
import { areSamePosition } from "../gameCore/position";

function Game() {
    const [gameState, dispatch] = useImmerReducer(
        reducerFunction,
        createInitialGameState()
    );
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
        </div>
    );
}

export default Game;
