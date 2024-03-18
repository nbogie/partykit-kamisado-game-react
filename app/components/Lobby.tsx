import { useState } from "react";

interface EntryInfo {
    username: string;
    roomId: string;
}

export function Lobby({ start }: { start: (info: EntryInfo) => void }) {
    const [username, setUsername] = useState<string | null>(null);
    const [roomId, setRoomId] = useState<string | null>(null);
    return (
        <>
            <h1>Game Lobby</h1>

            <div className="formRow">
                <input
                    type="text"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username ?? ""}
                    placeholder="your username"
                />
                <input
                    type="text"
                    onChange={(e) => setRoomId(e.target.value)}
                    value={roomId ?? ""}
                    placeholder="your roomId"
                />
                <button
                    onClick={() => {
                        if (username && roomId) {
                            start({ username, roomId });
                        }
                    }}
                >
                    go
                </button>
            </div>
        </>
    );
}
