import usePartySocket from "partysocket/react";
import { useState } from "react";
import type { Action, GameState } from "../gameCore/GameState";

/**
 *
 * @param username
 * @param roomId
 * @returns the current game state, kept up to date from the server, and a dispatch function to send reducer actions to the server
 */
export const useGameRoom = (username: string, roomId: string) => {
    const [gameState, setGameState] = useState<GameState | null>(null);

    const socket = usePartySocket({
        // host defaults to the current URL if not set
        //host: process.env.PARTYKIT_HOST,
        // host: "127.0.0.1:1999",
        // we could use any room name here
        room: roomId,
        id: username,
        onMessage(event: MessageEvent<string>) {
            console.log({ receivedEvent: event.data });
            const received = JSON.parse(event.data) as { state: GameState };
            setGameState(received.state);
        },
    });

    const dispatch = (action: Action) => {
        socket.send(JSON.stringify(action));
    };

    return {
        gameState,
        dispatch,
    };
};
