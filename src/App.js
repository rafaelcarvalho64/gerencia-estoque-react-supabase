import { BrowserRouter, Routes, Route } from "react-router-dom"

// pages
import Home from "./pages/Home"

function App() {
  return (
    <BrowserRouter>
      <nav className="softBlue">
        <h1 className="blackLetter">Gerência de Estoque e Inventário</h1>
      </nav>
      <Routes>
        <Route path="/contatos" element={<Home />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

