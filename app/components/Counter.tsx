import usePartySocket from "partysocket/react";
import { useState } from "react";

export default function Counter() {
    const [count, setCount] = useState<number | null>(null);

    const socket = usePartySocket({
        // host defaults to the current URL if not set
        //host: process.env.PARTYKIT_HOST,
        // we could use any room name here
        room: "example-room",
        onMessage(evt) {
            setCount(parseInt(evt.data));
        },
    });

    const increment = () => {
        // optimistic local update
        setCount((prev) => prev ?? 0 + 1);
        // send the update to the server
        socket.send("increment");
    };

    return (
        <button onClick={increment}>
            Increment me! {count !== null && <>Count: {count}</>}
        </button>
    );
}
