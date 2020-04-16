import { useState, useEffect } from "react";
import { getCookie } from "../../actions/auth";
import { create, getTags, removeTag, singleTag } from "../../actions/tag";

const Tag = () => {
  const [values, setValues] = useState({
    name: "",
    error: "",
    success: "",
    tags: [],
    removed: false,
    reload: false,
  });

  const { name, error, success, tags, removed, reload } = values;
  const token = getCookie("token");

  useEffect(() => {
    loadTags();
  }, [success, reload]);

  const loadTags = () => {
    getTags().then((data) => {
      if (data.error) {
        console.log(data);
      } else {
        setValues({ ...values, tags: data });
      }
    });
  };

  const showTags = () => {
    return tags.map((c, i) => {
      return (
        <button
          onDoubleClick={() => deleteConfirm(c.slug)}
          title="Double click to delete"
          key={i}
          className="btn btn-outline-primary mr-1 ml-1 mt-3"
        >
          {c.name}
        </button>
      );
    });
  };

  const deleteConfirm = (slug) => {
    let answer = window.confirm("Are you sure you want to delete the tag ?");
    if (answer) {
      deleteTag(slug);
    }
  };

  const deleteTag = (slug) => {
    removeTag(slug, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          error: false,
          success: false,
          name: "",
          removed: !removed,
          reload: !reload,
        });
      }
    });
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    create({ name }, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          ...values,
          error: false,
          success: true,
          name: "",
        });
      }
    });
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      name: e.target.value,
      error: false,
      success: false,
      removed: "",
    });
  };

  const showSuccess = () => {
    if (success) {
      return <p className="text-success">Tag is created</p>;
    }
  };

  const showError = () => {
    if (error) {
      return <p className="text-danger">Tag already exists</p>;
    }
  };

  const showRemoved = () => {
    if (removed) {
      return <p className="text-danger">Tag is deleted</p>;
    }
  };

  const mouseMoveHandler = () => {
    setValues({ ...values, removed: "", error: false, success: false });
  };

  const newTagForm = () => (
    <form onSubmit={clickSubmit}>
      <div className="form-group">
        <label className="text-muted"> Name </label>
        <input
          type="text"
          className="form-control"
          onChange={handleChange}
          value={name}
          required
        />
      </div>
      <div>
        <button type="submit" className="btn btn-primary">
          Create
        </button>
      </div>
    </form>
  );

  return (
    <>
      {showSuccess()}
      {showError()}
      {showRemoved()}
      <div onMouseMove={mouseMoveHandler}>
        {newTagForm()}
        {showTags()}
      </div>
    </>
  );
};

export default Tag;
