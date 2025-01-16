import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../../api/axios";

const REGISTER_URL = "/users/register";
const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
export default function Register() {
  const userRef = useRef();
  const errorRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState("false");
  const [userFocus, setUserFocus] = useState("false");

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState("false");
  const [emailFocus, setEmailFocus] = useState("false");

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState("false");
  const [pwdFocus, setPwdFocus] = useState("false");

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState("false");
  const [matchFocus, setMatchFocus] = useState("false");

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(user);
    console.log(result);
    console.log(user);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    console.log(result);
    console.log(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    console.log(result);
    console.log(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd, email]);

  function handleRegister(event) {
    event.preventDefault();
    const v1 = USER_REGEX.test(user);
    const v3 = EMAIL_REGEX.test(email);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2 || !v3) {
      setErrMsg("Invalid Entry");
      return;
    }
    const response = async () => {
      try {
        await axios.post(
          REGISTER_URL,
          JSON.stringify({ username: user, email, password: pwd }),
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          },
        );
        setSuccess(true);
        return response;
      } catch (err) {
        if (!err?.response) {
          setErrMsg("No Server Response");
        } else if (err.response?.status === 400) {
          setErrMsg("Username taken");
        } else {
          setErrMsg("Registration Failed");
        }
        errorRef.current.focus();
      }
    };
    response();
  }

  return (
    <>
      {success ? (
        <section>
          <div className="loginpage">
            <div className="loginbox">
              <h1>Success!</h1>
              <Link to="/login">login</Link>
            </div>
          </div>
        </section>
      ) : (
        <section>
          <div className="loginpage">
            <h1>Register</h1>
            <div className="loginbox">
              <p
                ref={errorRef}
                className={errMsg ? "errmsg" : "offscreen"}
                aria-live="assertive"
              >
                {errMsg}
              </p>

              <form className="loginform" onSubmit={handleRegister}>
                <label>
                  <div className="checker">
                    Enter your username:
                    <span className={validName ? "valid" : "hide"}>
                      <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span className={!validName && user ? "invalid" : "hide"}>
                      <FontAwesomeIcon icon={faTimes} />
                    </span>
                  </div>
                  <input
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    placeholder="john doe"
                    aria-label="Enter name"
                    aria-invalid={validName ? "false" : "true"}
                    aria-describedby="uidnote"
                    onFocus={() => setUserFocus(true)}
                    onBlur={() => setUserFocus(false)}
                    name="username"
                    required
                  />
                  <p
                    id="uidnote"
                    className={
                      userFocus && !validName && user
                        ? "instructions"
                        : "offscreen"
                    }
                  >
                    <FontAwesomeIcon icon={faInfoCircle} /> 4 to 24 characters.
                    <br />
                    Must begin with a letter
                    <br />
                    Letters,numbers,underscores,hyphens allowed.
                  </p>
                </label>

                <label>
                  <div className="checker">
                    Enter your email:
                    <span className={validEmail && email ? "valid" : "hide"}>
                      <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span className={!validEmail && email ? "invalid" : "hide"}>
                      <FontAwesomeIcon icon={faTimes} />
                    </span>
                  </div>

                  <input
                    type="text"
                    id="email"
                    autoComplete="off"
                    onChange={(e) => setEmail(e.target.value)}
                    aria-invalid={validEmail ? "false" : "true"}
                    placeholder="johndoe@gmail.com"
                    aria-label="Enter the email"
                    aria-describedby="eid"
                    onFocus={() => setEmailFocus(true)}
                    onBlur={() => setEmailFocus(false)}
                    name="email"
                    required
                  />
                  <p
                    id="eid"
                    className={
                      emailFocus && !validEmail && email
                        ? "instructions"
                        : "offscreen"
                    }
                  >
                    <FontAwesomeIcon icon={faInfoCircle} /> 4 to 24 characters.
                    <br />
                    Must begin with a letter
                    <br />
                    Must contain the @ .
                    <br />
                    TLD section must contain atleast 2 letters.
                    <br />
                    Letters,numbers,underscores,hyphens allowed.
                  </p>
                </label>

                <label>
                  <div className="checker">
                    Enter your password:
                    <span className={validPwd ? "valid" : "hide"}>
                      <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span className={!validPwd && pwd ? "invalid" : "hide"}>
                      <FontAwesomeIcon icon={faTimes} />
                    </span>
                  </div>
                  <input
                    type="password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    aria-invalid={validPwd ? "false" : "true"}
                    placeholder="123456"
                    name="password"
                    aria-describedby="pwdnote"
                    onFocus={() => setPwdFocus(true)}
                    onBlur={() => setPwdFocus(false)}
                    required
                  />
                  <p
                    id="pwdnote"
                    className={
                      pwdFocus && !validPwd && pwd
                        ? "instructions"
                        : "offscreen"
                    }
                  >
                    <FontAwesomeIcon icon={faInfoCircle} /> 8 to 24 characters.
                    <br />
                    Must include uppercase and lowercase letters,a number and a
                    special character.
                    <br />
                    Allowed special characters: !@#$%
                  </p>
                </label>

                <label>
                  <div className="checker">
                    Confirm password:
                    <span className={validMatch && matchPwd ? "valid" : "hide"}>
                      <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span
                      className={!validMatch && matchPwd ? "invalid" : "hide"}
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </span>
                  </div>
                  <input
                    type="password"
                    id="confirm_pwd"
                    onChange={(e) => setMatchPwd(e.target.value)}
                    aria-invalid={validMatch ? "false" : "true"}
                    placeholder="123456"
                    name="confirmpassword"
                    aria-describedby="confirmnote"
                    onFocus={() => setMatchFocus(true)}
                    onBlur={() => setMatchFocus(false)}
                    required
                  />
                  <p
                    id="confirmnote"
                    className={
                      matchFocus && !validMatch && matchPwd
                        ? "instructions"
                        : "offscreen"
                    }
                  >
                    <FontAwesomeIcon icon={faInfoCircle} /> Must match the
                    password given in the input before.
                  </p>
                </label>
                <div className="btnspace">
                  <button
                    id="registerbtn"
                    disabled={
                      !validName || !validEmail || !validPwd || !validMatch
                        ? true
                        : false
                    }
                  >
                    {" "}
                    register
                  </button>
                  <p>
                    {" "}
                    Already registered?
                    <br />
                  </p>
                  <span className="line">
                    <Link to="/login">Sign in</Link>
                  </span>
                </div>
              </form>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
