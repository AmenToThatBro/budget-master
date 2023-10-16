import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar">
            <h1>Budget Master</h1>
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/transactions">Transactions</Link>
                <Link to='/bills'>Bills</Link>
                <Link to="/month">Month-At-A-Glance</Link>
            </div>
        </nav>
      );
}
 
export default Navbar;