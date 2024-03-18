import { createRoot } from "react-dom/client";
import LobbySwitch from "./components/LobbySwitch";
import "./styles.css";

function App() {
    return <LobbySwitch />;
}

createRoot(document.getElementById("app")!).render(<App />);
