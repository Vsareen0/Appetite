import Link from "next/link";
import { useState, useEffect } from "react";
import Router from "next/router";
import dynamic from "next/dynamic";
import { withRouter } from "next/router";
import { getCookie, isAuth } from "../../actions/auth";
import { getCategories } from "../../actions/category";
import { getTags } from "../../actions/tag";
import {create} from '../../actions/blog';
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "../../node_modules/react-quill/dist/quill.snow.css";

const BlogCreate = ({ router }) => {
  const blogFromLS = () => {
    if (typeof window === "undefined") {
      return false;
    }
    if (localStorage.getItem("blog")) {
      return JSON.parse(localStorage.getItem("blog"));
    } else {
      return false;
    }
  };

  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  const [checked, setChecked] = useState([]);
  const [checkedTag, setCheckedTag] = useState([]); 

  const [body, setBody] = useState(blogFromLS());
  const [values, setValues] = useState({
    error: "",
    sizeError: "",
    success: "",
    formData: "",
    title: "",
    hidePublishButton: false,
  });

  const {
    error,
    sizeError,
    success,
    formData,
    title,
    hidePublishButton,
  } = values;

  const token = getCookie('token');

  useEffect(() => {
    setValues({ ...values, formData: new FormData() });
    initCategory();
    initTag();
  }, [router]);

  const initCategory = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setCategories(data);
      }
    });
  };

  const initTag = () => {
    getTags().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setTags(data);
      }
    });
  };

  const publishBlog = (e) => {
    e.preventDefault();
    // console.log("publish blog");
    create(formData, token).then(data=> {
        if (data.error) {
            setValues({ ...values, error: data.error });
          } else {
            setValues({ ...values, error: '', title: '', success: `A new blog titled "${data.title}" has been created.` });
            setBody('');
            setCategories([]);
            setTags([]);
          }
    })
  };

  const handleChange = (name) => (e) => {
    // console.log(e.target.value);
    const value = name == "photo" ? e.target.files[0] : e.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value, formData, error: "" });
  };

  const handleBody = (e) => {
    // console.log(e.target.value);
    setBody(e);
    formData.set("body", e);
    if (typeof window !== "undefined") {
      localStorage.setItem("blog", JSON.stringify(e));
    }
  };

  const handleToggle = c => () => {
    setValues({...values, error: ''});

    const clickedCategory = checked.indexOf(c);
    const all = [...checked];

    if(clickedCategory == -1){
        all.push(c);
    } else {
        all.splice(clickedCategory, 1);
    }
    console.log(all);
    setChecked(all);
    formData.set('categories', all);
  };

  const handleTagToggle = t => () => {
    setValues({...values, error: ''});

    const clickedTag = checkedTag.indexOf(t);
    const all = [...checkedTag];

    if(clickedTag == -1){
        all.push(t);
    } else {
        all.splice(clickedTag, 1);
    }
    console.log(all);
    setCheckedTag(all);
    formData.set('tags', all);
  };

  const showCategories = () => {
    return (
      categories &&
      categories.map((c, i) => (
        <li key={i} className="list-unstyled">
          <input onChange={handleToggle(c._id)} type="checkbox" className="mr-2" />
          <label className="form-check-label">{c.name}</label>
        </li>
      ))
    );
  };

  const showTags = () => {
    return (
      tags &&
      tags.map((t, i) => (
        <li key={i} className="list-unstyled">
          <input onChange={handleTagToggle(t._id)} type="checkbox" className="mr-2" />
          <label className="form-check-label">{t.name}</label>
        </li>
      ))
    );
  };

  const createBlogForm = () => (
    <form onSubmit={publishBlog}>
      <div className="form-group">
        <label className="text-muted">Title</label>
        <input
          type="text"
          className="form-control"
          onChange={handleChange("title")}
          value={title}
        />
      </div>
      <div className="form-group">
        <ReactQuill
          modules={BlogCreate.modules}
          formats={BlogCreate.formats}
          value={body}
          onChange={handleBody}
          placeholder="Write something amazing..."
        />
      </div>
      <div>
        <button type="submit" className="btn btn-primary">
          Publish
        </button>
      </div>
    </form>
  );

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-8">{createBlogForm()}</div>
        <div className="col-md-4">
            <div>
                <div className="form-group pb-2">
                     <h5>Featured Image</h5>
                     <hr/>
                     <small className="text-muted">Max size: 1mb</small>
                     <label className="btn btn-outlne-info">
                        <input onChange={handleChange('photo')} type="file" accept="image/*" hidden />
                     </label>
                </div>
            </div>
          <div>
            <h4>Categories</h4>
            <ul style={{ maxHeight: "200px", overflowY: "scroll" }}>
              {showCategories()}
            </ul>
            <hr />
          </div>
          <div>
            <h4>Tags</h4>
            <ul style={{ maxHeight: "200px", overflowY: "scroll" }}>
              {showTags()}
            </ul>
            <hr />
          </div>
        </div>
      </div>
    </div>
  );
};

BlogCreate.modules = {
  toolbar: [
    [
      { header: "1" },
      { header: "2" },
      { header: ["3", "4", "5", "6"] },
      { font: [] },
    ],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image", "video"],
    ["clean"],
    ["code-block"],
  ],
};

BlogCreate.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "link",
  "image",
  "video",
  "code-block",
];

export default withRouter(BlogCreate);
