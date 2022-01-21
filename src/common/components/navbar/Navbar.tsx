import "./styles.scss";
import { NavLink } from "react-router-dom";
import { MdHome, MdBarChart } from "react-icons/md";

const SIZE = "20px";

export const Navbar = () => {
  return (
    <nav className="navbar">
      <NavLink to="/">
        <MdHome size={SIZE} />
      </NavLink>
      <NavLink to="/list-coins">
        <MdBarChart size={SIZE} />
      </NavLink>
    </nav>
  );
};
