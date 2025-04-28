import { NavLink } from 'react-router-dom';
import './style.css';
import { useSelector } from 'react-redux';

export const Nav = () => {
    const name = useSelector(store => store.currentUser);
    console.log(name._id);

    return (
        <div className="nav">
            <NavLink to="/All" className={({ isActive }) => (isActive ? "link active" : "link")}>🏚️</NavLink>
            <NavLink to="/Log" className={({ isActive }) => (isActive ? "link active" : "link")}>➡️</NavLink>
            {name._id && (
            <NavLink to="/Nihul" className={({ isActive }) => (isActive ? "link active" : "link")}>👨‍💼</NavLink>
            )}
        </div>
    );
};
