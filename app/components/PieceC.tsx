import clsx from "clsx";
import { motion } from "framer-motion";
import { type Piece } from "../gameCore/GameState";

export function PieceC({ piece }: { piece: Piece }) {
    return (
        <motion.div
            layout={true}
            layoutId={piece.id}
            className={clsx("piece " + piece.owner, piece.flavour)}
        ></motion.div>
    );
}
