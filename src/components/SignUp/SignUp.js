import { useContext, useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { ThemeContext } from "../../context/ThemeContext";
import "./SignUp.css";

const SignUp = ({ onAddUser }) => {
  const { contextTheme } = useContext(ThemeContext);
  const [user, setUser] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState();

  const { signUp, isAuthenticated, apiError } = useAuth();

  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const nameInputRef = useRef();
  const surnameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  if (isAuthenticated) {
    return <Navigate to='/events' replace />
  }
  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    if (!nameInputRef.current.value) {
      setError("Introduzca un nombre")
      return
    }
    if (!surnameInputRef.current.value) {
      setError("Introduzca un apellido");
      return
    }
    if (!emailInputRef.current.value) {
      setError("Introduzca un mail");
      return
    }
    if (!passwordInputRef.current.value) {
      setError("Introduzca una contraseña");
    }
    try {
      await signUp(user.email, user.password);

      const enteredName = nameInputRef.current.value;
      const enteredSurname = surnameInputRef.current.value;
      const enteredEmail = emailInputRef.current.value;
      if (!error && !apiError) {
        onAddUser({
          role: "user",
          name: enteredName,
          surname: enteredSurname,
          email: enteredEmail,
        });
      }
    } catch (error) {
    }
  }

  return (
    <section id={contextTheme} className={ThemeContext}>
      <section className="vh-100 ">
        <div className="px-4 py-5 px-md-5 text-center text-lg-start">
          <div className="container">
            <div className="row gx-lg-5 align-items-center">
              <div className="col-lg-6 mb-5 mb-lg-0">
                <div className="card bg-dark text-white">
                  <div className="card-body py-5 px-md-5">
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                            <input
                              type="text"
                              id="name"
                              name="name"
                              className="form-control"
                              ref={nameInputRef}
                            />
                            <label className="form-label" htmlFor="name">
                              Nombre
                            </label>
                          </div>
                        </div>
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                            <input
                              type="text"
                              id="surname"
                              name="surname"
                              className="form-control"
                              ref={surnameInputRef}
                            />
                            <label className="form-label" htmlFor="surname">
                              Apellido
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="email"
                          name="email"
                          id="email"
                          className="form-control"
                          onChange={handleChange}
                          ref={emailInputRef}
                          placeholder="example@gmail.com"
                        />
                        <label className="form-label" htmlFor="email">
                          Email
                        </label>
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          id="password"
                          name="password"
                          className="form-control"
                          ref={passwordInputRef}
                          onChange={handleChange}
                          placeholder="******"
                        />
                        <label className="form-label" htmlFor="password">
                          Contraseña
                        </label>
                      </div>
                      <div className="form-check d-flex justify-content-center mb-4">
                        <button
                          type="submit"
                          className="btn btn-outline-light btn-lg px-5"
                        >
                          Crear cuenta
                        </button>
                      </div>
                      <div className="form-check d-flex justify-content-center mb-4">
                        {error && <p>{error}</p>}
                        {apiError && <p>{apiError}</p>}
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default SignUp;
