import { type Dispatch } from "react";
import { type Cell } from "../gameCore/GameState";
import { PieceC } from "./PieceC";
import { type GameAction } from "../gameCore/reducerFunction";
import clsx from "clsx";

export function CellC({
    cell,
    isCellForNextPlay,
    isCellSelected,
    dispatch,
}: {
    cell: Cell;
    isCellForNextPlay: boolean;
    isCellSelected: boolean;
    dispatch: Dispatch<GameAction>;
}) {
    return (
        <div
            className={clsx(
                "cell",
                cell.flavour,
                isCellForNextPlay && "next",
                isCellSelected && "selected"
            )}
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
