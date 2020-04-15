import { useState, useEffect } from "react";
import { signin, authenticate, isAuth } from "../../actions/auth";
import Router from 'next/router';

const SigninComponent = () => {
  const [values, setValues] = useState({
    email: "vsareen24@gmail.com",
    password: "ohiforgot",
    error: "",
    loading: false,
    message: "",
    showForm: true,
  });

  useEffect(() => {
    isAuth() && Router.push(`/`);
  }, []);

  const { email, password, error, loading, message, showForm } = values;

  const showLoading = () =>
    loading ? <div className="alert alert-info">Loading...</div> : "";

  const showError = () =>
    error ? <div className="alert alert-danger">{error}</div> : "";

  const showMessage = () =>
    message ? <div className="alert alert-info">{message}</div> : "";

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.table({ name, email, password, error, loading, message, showForm });

    setValues({ ...values, loading: true, error: false });
    const user = { email, password };

    signin(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        // save user tokent to cookie
        // save user info to localstorage
        // authenticate user
        authenticate(data, () => {
            Router.push(`/`);
        });
      }
    });
  };

  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  const signinForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            value={email}
            onChange={handleChange("email")}
            type="email"
            className="form-control"
            placeholder="Type a email"
          />
        </div>
        <div className="form-group">
          <input
            value={password}
            onChange={handleChange("password")}
            type="password"
            className="form-control"
            placeholder="Type a password"
          />
        </div>
        <div>
          <button className="btn btn-primary">Signin</button>
        </div>
      </form>
    );
  };

  return (
    <>
      {showError()}
      {showLoading()}
      {showMessage()}
      {showForm && signinForm()}
    </>
  )
};

export default SigninComponent;
