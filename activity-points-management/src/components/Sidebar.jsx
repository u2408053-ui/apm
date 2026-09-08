import { NavLink, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("loggedInStudent");
    navigate("/login");
  };

  return (
    <aside className="sidebar">

      <div className="sidebar-logo">
        <div className="logo-icon">💗</div>

        <div>
          <h2>APMS</h2>
          <span>Activity Points</span>
        </div>
      </div>

      <nav className="sidebar-nav">

        <p className="menu-title">MAIN MENU</p>

        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          <span>🏠</span>
          Dashboard
        </NavLink>

        <NavLink
          to="/activities"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          <span>📋</span>
          My Activities
        </NavLink>

        <NavLink
          to="/add-activity"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          <span>➕</span>
          Add Activity
        </NavLink>

        <NavLink
          to="/categories"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          <span>🏷️</span>
          Categories
        </NavLink>

        <p className="menu-title">ACCOUNT</p>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          <span>👤</span>
          My Profile
        </NavLink>

      </nav>

      <button className="logout-button" onClick={handleLogout}>
        <span>🚪</span>
        Logout
      </button>

    </aside>
  );
}

export default Sidebar;