import Link from "next/link";
import renderHTML from "react-render-html";
import Layout from "../../components/Layout";
import { singleBlog } from "../../actions/blog";
import { DOMAIN, APP_NAME, FB_APP_ID } from "../../config";
import moment from "moment";
import { API } from "../../config";

const SingleBlog = ({ blog }) => {
  const head = () => (
    <Head>
      <title>{blog.title} | {APP_NAME}</title>
      <meta
        name="description"
        content={blog.mdesc}
      />
      <link rel="canonical" href={`${DOMAIN}${router.pathname}`} />
      <meta
        property="og:title"
        content={`${blog.title} | ${APP_NAME}`}
      />
      <meta
        property="og:description"
        content={blog.mdesc}
      />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${DOMAIN}/blogs/${router.pathname}`} />
      <meta property="og:site_name" content={`${APP_NAME}`} />

      <meta
        property="og:image"
        content={`${API}/static/images/appetite.jfif`}
      />
      <meta
        property="og:image:secure_url"
        content={`${API}/static/images/appetite.jfif`}
      />
      <meta property="og:image:type" content="image/jfif" />
      <meta property="fb:app_id" content={`${FB_APP_ID}`} />
    </Head>
  );

  const showBlogCategories = (blog) =>
    blog.categories.map((c, i) => (
      <Link key={i} href={`/categories/${c.slug}`}>
        <a className="btn btn-primary mr-1 ml-1 mt-3">{c.name}</a>
      </Link>
    ));

  const showBlogTags = (blog) =>
    blog.tags.map((t, i) => (
      <Link key={i} href={`/tags/${t.slug}`}>
        <a className="btn btn-outline-primary mr-1 ml-1 mt-3">{t.name}</a>
      </Link>
    ));

  return (
    <>
      <Layout>
        <main>
          <article>
            <div className="container-fluid">
              <section>
                <div className="row" style={{ marginTop: "-30px" }}>
                  <img
                    src={`${API}/blog/photo/${blog.slug}`}
                    alt={blog.title}
                    className="img img-fluid featured-image"
                  />
                </div>
              </section>
              <section>
                <h1 className="display-2 pb-3 pt-3 text-center font-weight-bold">
                  {blog.title}
                </h1>
                <p className="lead pt-1 pb-1 mark">
                  Written By {blog.postedBy.name} | Published{" "}
                  {moment(blog.updatedAt).fromNow()}
                </p>
                <div className="pb-3">
                  {showBlogCategories(blog)}
                  {showBlogTags(blog)}
                  <br />
                  <br />
                </div>
              </section>
            </div>
            <div className="container">
              <section>
                <div className="col-md-12 lead">{renderHTML(blog.body)}</div>
              </section>
            </div>
            <div className="container pb-5">
              <h4 className="text-center pt-5 pb-5 h2">Related blogs</h4>
              <hr />
              <p>Show related blogs</p>
            </div>
            <div className="container pb-5">
              <p>Show Comments</p>
            </div>
          </article>
        </main>
      </Layout>
    </>
  );
};

SingleBlog.getInitialProps = ({ query }) => {
  return singleBlog(query.slug).then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      return { blog: data };
    }
  });
};

export default SingleBlog;
