import { BrowserRouter, Routes, Route } from "react-router-dom"

// pages
import Home from "./pages/Home"

function App() {
  return (
    <BrowserRouter>
      <nav>
        <h1>Gerência de Estoque e Inventário</h1>
      </nav>
      <Routes>
        <Route path="/contatos" element={<Home />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
