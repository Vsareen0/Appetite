import Layout from "../../../../components/Layout";
import Link from "next/link";
import { useState, useEffect } from "react";
import { resetPassword } from "../../../../actions/auth";
import { withRouter } from "next/router";

const Reset = ({ router }) => {
  const [values, setValues] = useState({
    name: "",
    error: "",
    message: "",
    showForm: true,
    buttonText: "Change Password",
    newPassword: "",
  });

  const { error, message, showForm, buttonText, name, newPassword } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, message: "", error: "", buttonText: "Sending ..." });
    resetPassword({
      newPassword,
      resetPasswordLink: router.query.id,
    }).then((data) => {
      if (data.error) {
        setValues({
          ...values,
          error: data.error,
          showForm: false,
          newPassword: "",
        });
      } else {
        setValues({
          ...values,
          error: false,
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

  const passwordResetForm = () => {
    return (
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="form-group pt-5">
            <input
              type="password"
              onChange={e => setValues({...values, newPassword: e.target.value})}
              placeholder="Type New Password"
              className="form-control"
              value={newPassword}
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
          <h2>Reset Password</h2>
          <hr />
          {showError()}
          {showMessage()}
          {showForm && passwordResetForm()}
        </div>
      </Layout>
    </>
  );
};

export default withRouter(Reset);
