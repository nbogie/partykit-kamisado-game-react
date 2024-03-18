import { useState } from "react";
import { z } from "zod";
import GameView from "./GameView";
import { Lobby } from "./Lobby";

const queryParamsValidator = z.object({
    username: z.string().min(1),
    roomId: z.string().min(1),
});

interface GameSetup {
    username: string | null;
    roomId: string | null;
    showGame: boolean;
}

export default function LobbySwitch() {
    const [setup, setSetup] = useState<GameSetup>({
        username: null,
        roomId: null,
        showGame: false,
    });

    function handleStart(info: z.infer<typeof queryParamsValidator>) {
        setSetup({
            username: info.username,
            roomId: info.roomId,
            showGame: true,
        });
    }
    // Show the game after the user has picked a room and a username
    if (setup !== null && setup.showGame && setup.roomId && setup.username) {
        return (
            <>
                <GameView roomId={setup.roomId} username={setup.username} />
                <div className="flex justify-end">
                    <button
                        onClick={() => {
                            setSetup({
                                username: null,
                                roomId: null,
                                showGame: false,
                            });
                        }}
                    >
                        Leave Room
                    </button>
                </div>
            </>
        );
    }

    return <Lobby start={handleStart} />;
}
