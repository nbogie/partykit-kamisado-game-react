import type * as Party from "partykit/server";
import type { GameState, ServerAction } from "../app/gameCore/GameState";
import { createInitialGameState } from "../app/gameCore/createInitialGameState";
import {
    reduceWithImmer,
    type GameAction,
} from "../app/gameCore/reducerFunction";

interface ServerMessage {
    state: GameState;
}

export default class Server implements Party.Server {
    private gameState: GameState;
    constructor(readonly room: Party.Room) {
        this.gameState = createInitialGameState();
        console.log("Server constructor.  Room: ", room.id);
    }

    onConnect(conn: Party.Connection, ctx: Party.ConnectionContext) {
        console.log(
            `Connected: id: ${conn.id} room: ${this.room.id} url: ${new URL(ctx.request.url).pathname}`
        );

        this.gameState = reduceWithImmer(this.gameState, {
            type: "UserEntered",
            user: { id: conn.id },
        });

        this.room.broadcast(JSON.stringify({ state: this.gameState }));
    }
    onClose(connection: Party.Connection) {
        console.log("Connection closed: ", connection.id);

        this.gameState = reduceWithImmer(this.gameState, {
            type: "UserExited",
            user: { id: connection.id },
        });

        //TODO: stop/pause game until player returns - record that player has left in state.
    }

    onMessage(message: string, sender: Party.Connection) {
        console.log(`connection ${sender.id} sent message: ${message}`);

        //TODO: validate
        const action = JSON.parse(message) as GameAction;

        //attach the user that sent it.
        const serverAction = {
            ...action,
            user: { id: sender.id },
        } as ServerAction;

        this.gameState = reduceWithImmer(this.gameState, serverAction);

        const objectToSend = { state: this.gameState };
        // console.log("Sending state: ", JSON.stringify(objectToSend, null, 2));
        this.room.broadcast(JSON.stringify(objectToSend));
    }
}

Server satisfies Party.Worker;
