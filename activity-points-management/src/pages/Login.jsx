import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [students, setStudents] = useState([]);
  const [uid, setUid] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // Load student data from JSON
  useEffect(() => {
    fetch("/data/students.json")
      .then((response) => response.json())
      .then((data) => {
        setStudents(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Unable to load student data.");
        setLoading(false);
      });
  }, []);

  const handleLogin = (event) => {
    event.preventDefault();

    setError("");

    if (!uid || !password) {
      setError("Please enter both UID and password.");
      return;
    }

    const student = students.find(
      (student) =>
        student.uid === uid && student.password === password
    );

    if (student) {
      // Store logged-in student information
      localStorage.setItem("loggedInStudent", JSON.stringify(student));

      navigate("/dashboard");
    } else {
      setError("Invalid UID or password.");
    }
  };

  if (loading) {
    return (
      <div className="login-page">
        <div className="login-card">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="login-page">

      <div className="login-card">

        <div className="login-logo">
          💗
        </div>

        <h1>Activity Points</h1>

        <p className="login-subtitle">
          Management System
        </p>

        <div className="welcome-text">
          <h2>Welcome Back!</h2>
          <p>Login to manage your activity points.</p>
        </div>

        <form onSubmit={handleLogin}>

          <div className="form-group">
            <label htmlFor="uid">Student UID</label>

            <input
              type="text"
              id="uid"
              placeholder="Enter your UID"
              value={uid}
              onChange={(event) => setUid(event.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>

            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          {error && (
            <div className="error-message">
              ⚠️ {error}
            </div>
          )}

          <button type="submit" className="login-button">
            Login
          </button>

        </form>

        <div className="demo-login">
          <p>Demo Login</p>
          <span>UID: 23CS001</span>
          <span>Password: student123</span>
        </div>

        <p className="login-footer">
          Activity Points Management System
        </p>

      </div>

    </div>
  );
}

export default Login;