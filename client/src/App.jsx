import { BrowserRouter, Routes, Route} from "react-router-dom";
import { Home } from './pages/Home';
import { NoPages} from './pages/NoPages';
import { Layout } from "./layout/Layout";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Hero } from "./components/Hero";
import { Products } from "./components/Products";
import { Future } from "./components/Future";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route Component={Layout}>
          <Route index path="/" element={<Home />} />
          <Route path="/hero" element={<Hero />} />
          <Route path="/future" element={<Future />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/products" element={<Products />} />
          <Route path="*" element={<NoPages />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
