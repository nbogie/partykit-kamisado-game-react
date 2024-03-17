import { motion } from "framer-motion";
import { Piece } from "../gameCore/GameState";

export function PieceC({ piece }: { piece: Piece }) {
    return (
        <motion.div
            layout={true}
            layoutId={piece.id}
            className={"piece " + piece.owner + " " + piece.flavour}
        ></motion.div>
    );
}
