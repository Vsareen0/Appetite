import Layout from "../../../components/Layout";
import Link from "next/link";
import { useState } from "react";
import { forgotPassword } from "../../../actions/auth";

const Forgot = () => {
  const [values, setValues] = useState({
    email: "",
    error: "",
    message: "",
    showForm: true,
    buttonText: "Send Password Reset Link",
  });

  const { email, error, message, showForm, buttonText } = values;

  const handleChange = (name) => (e) => {
    setValues({ ...values, message: "", error: "", [name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, message: "", error: "", buttonText: "Sending ..." });
    forgotPassword({ email }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          email: "",
          message: data.message,
          showForm: false,
        });
      }
    });
  };

  const showError = () =>
    error && <div className="alert alert-danger">{error}</div>;

  const showMessage = () =>
    message && <div className="alert alert-success">{message}</div>;

  const forgotPasswordForm = () => {
    return (
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="form-group pt-5">
            <input
              type="email"
              onChange={handleChange("email")}
              placeholder="Enter the email to send password generation link"
              className="form-control"
              value={email}
            />
          </div>
          <div>
            <button type="submit" className="btn btn-primary">
              {buttonText}
            </button>
          </div>
        </form>
      </div>
    );
  };

  return (
    <>
      <Layout>
        <div className="container">
          <h2>Forgot Password</h2>
          <hr />
          {showError()}
          {showMessage()}
          {showForm && forgotPasswordForm()}
        </div>
      </Layout>
    </>
  );
};

export default Forgot;
