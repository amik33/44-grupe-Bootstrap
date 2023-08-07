import { BrowserRouter, Routes, Route} from "react-router-dom";
import { Home } from './pages/Home';
import { NoPages} from './pages/NoPages';
import { Layout } from "./layout/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route Component={Layout}>
          <Route index path="/" element={<Home />} />
          <Route path="*" element={<NoPages />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
