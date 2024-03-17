import { Dispatch } from "react";
import { Cell } from "../gameCore/GameState";
import { PieceC } from "./PieceC";
import { Action } from "../gameCore/reducerFunction";

export function CellC({
    cell,
    isCellForNextPlay,
    dispatch,
}: {
    cell: Cell;
    isCellForNextPlay: boolean;
    dispatch: Dispatch<Action>;
}) {
    return (
        <div
            className={
                "cell " + cell.flavour + " " + (isCellForNextPlay ? "next" : "")
            }
            onClick={() =>
                dispatch({
                    type: "clicked",
                    pos: cell.position,
                })
            }
        >
            {cell.piece && <PieceC piece={cell.piece} />}
        </div>
    );
}
