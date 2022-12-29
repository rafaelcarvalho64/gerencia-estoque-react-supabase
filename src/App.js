import { BrowserRouter, Routes, Route } from "react-router-dom"

// pages
import Home from "./pages/Home"

function App() {
  return (
    <BrowserRouter>
      <nav>
        <h1>CRUD Contatos Supabase</h1>
      </nav>
      <Routes>
        <Route path="/contatos" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
