import Layout from "../components/Layout";
import SigninComponent from "../components/auth/SigninComponent";
import { withRouter } from "next/router";

const Signin = ({ router }) => {
  const showRedirectMessage = () => {
    if (router.query.message) {
      return <div className="alert alert-danger">{router.query.message}</div>;
    } else {
      return;
    }
  };

  return (
    <Layout>
      <h2 className="text-center pt-4 pb-4">Signin page</h2>
      <div className="col-md-6 offset-md-3">
        {showRedirectMessage()}
      </div>
      <div className="col-md-6 offset-md-3">
        <SigninComponent />
      </div>
    </Layout>
  );
};

export default withRouter(Signin);
