import { Link } from "react-router-dom";

export default function Nav() {
    return (
        <nav className="nav-bar">
            <Link className="nav-link" to="/">INSERT</Link>
            <Link className="nav-link" to="/get">GET CUSTOMERS</Link>
        </nav>
    );
}