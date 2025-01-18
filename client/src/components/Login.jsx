import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";

export default function Login() {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/main";
  const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");

  const [pwd, setPwd] = useState("");

  const [errMsg, setErrMsg] = useState("");

  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd]);

  function handleLogin(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const userEmail = formData.get("email");
    const userPassword = formData.get("password");
    try {
      fetch("http://localhost:5000/api/users/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: userEmail, password: userPassword }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          const authToken = data.accessToken;
          console.log(`Got the accessToken: ${authToken}`);
          setAuth({ authToken });
          console.log("Login successful:", data);
          setSuccess(true);
          navigate(from, { replace: true });
          return authToken;
        });
    } catch (error) {
      console.log("Error logging in: ", error);
      if (!error?.response) {
        setErrMsg("No server response.");
      } else if (error.response?.status === 400) {
        setErrMsg("All fields are mandatory");
      } else if (error.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login failed");
      }
    }
  }
  return (
    <div className="loginpage">
      <div className="loginbox">
        {success ? (
          <section>
            <h1>You are logged in!</h1>
            <br />
            <p>
              <Link to="/main">Go to home</Link>
            </p>
          </section>
        ) : (
          <>
            <p
              ref={errRef}
              className={errMsg ? "errmsg" : "offscreen"}
              aria-live="assertive"
            >
              {errMsg}
            </p>
            <h1>Sign In</h1>
            <form className="loginform" onSubmit={handleLogin}>
              <label>
                Enter your email:
                <input
                  id="email"
                  ref={userRef}
                  autoComplete="off"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="text"
                  placeholder="johndoe@gmail.com"
                  aria-label="Enter the email"
                  name="email"
                  required
                />
              </label>

              <label>
                Enter your password:
                <input
                  type="password"
                  id="password"
                  onChange={(e) => setPwd(e.target.value)}
                  value={pwd}
                  placeholder="123456"
                  aria-label="Enter the password"
                  name="password"
                  required
                />
              </label>

              <button id="loginbtn" type="submit">
                Sign in
              </button>
              <p>
                Need an Account?
                <br />
                <span className="line">
                  <Link to="/">Sign Up</Link>
                </span>
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
