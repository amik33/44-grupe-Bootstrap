import { BrowserRouter, Routes, Route} from "react-router-dom";
import { Home } from './pages/Home';
import { NoPages} from './pages/NoPages';
import { Layout } from "./layout/Layout";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Hero } from "./components/Hero";
import { Products } from "./components/Products";
import { Future } from "./components/Future";
import { Dashboard } from "./pages/Dashboard";
import { UserLayout } from "./layout/UserLayout";
import { Content } from "./pages/Content";
import { UserContextProvider } from './context/UserContext';

function App() {
  return (
    <UserContextProvider>
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

          <Route Component={UserLayout}>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/content' element={<Content />} />
          </Route>

          <Route Component={Layout}>
            <Route path="*" element={<NoPages />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
