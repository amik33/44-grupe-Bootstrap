import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export function Header () {
    const ctx = useContext(UserContext);
    const userLoggedIn = ctx.user.loggedIn;

    const publicMenu = (
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-end">
          <Link to="/login" className="btn btn-outline-light me-2">Login</Link>
          <Link to="/register" className="btn btn-warning">Sign-up</Link>
        </div>
      </div>
    );

    const userMenu = (
      <div className="container ">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-end">
          <Link to="/" className="d-flex align-items-right mb-2 mb-lg-0 text-white text-decoration-none">
            <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" className="rounded-circle" />
          </Link>
        </div>
      </div>
    );

    return (
    <header className="p-3 text-bg-dark">
      <div className="conteiner d-flex px-5">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <Link to="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
            {/* <svg className="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"><use to="#bootstrap"></use></svg> */}
          </Link>
          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li><Link to="/hero" className="nav-link px-2 text-secondary">Home</Link></li>
            <li><Link to="/future" className="nav-link px-2 text-white">Features</Link></li>
            <li><Link to="/products" className="nav-link px-2 text-white">Pricing</Link></li>
            <li><Link to="/dashboard" className="nav-link px-2 text-white">Dashboard</Link></li>
            <li><Link to="/content" className="nav-link px-2 text-white">Content</Link></li>
            <li><Link to="/" className="nav-link px-2 text-white">About</Link></li>
            <li><Link to="/" className="nav-link px-2 text-white">About</Link></li>
          </ul>
        </div>
      </div>
      {userLoggedIn ? userMenu : publicMenu}
      </div>
    </header>)
};