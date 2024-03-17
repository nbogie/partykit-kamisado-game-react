import { createRoot } from "react-dom/client";
import Counter from "./components/Counter";
import { Footer } from "./components/Footer";
import "./styles.css";
import Game from "./components/Game";

function App() {
    return (
        <main>
            <Game />
            <Counter />
            <Footer />
        </main>
    );
}

createRoot(document.getElementById("app")!).render(<App />);
