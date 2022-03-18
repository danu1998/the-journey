import React, { useState } from "react";
import { Container } from "react-bootstrap";
import AdminNavbar from "../../components/Navbar/AdminNavbar";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useNavigate } from "react-router-dom";
import { CgAttachment } from "react-icons/cg";
import { API } from "../../config/api";

const AddJourney = () => {
  const [preview, setPreview] = useState(null);
  let navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });
    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };

  // let editorState = EditorState.createEmpty();
  const [editorState, setDescription] = useState(EditorState.createEmpty());
  const onEditorStateChange = (editorState) => {
    setDescription(editorState);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      const rawContentState = draftToHtml(
        convertToRaw(editorState.getCurrentContent())
      );
      const formData = new FormData();
      formData.set("title", form.title);
      formData.set("description", rawContentState);
      formData.set("image", form.image[0], form.image[0].name);
      const response = await API.post("/journey", formData, config);
      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <AdminNavbar />
      <Container>
        <h1 className="fs-1 fw-bold">New Journey</h1>
        <form className="mt-5" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label for="title" class="form-label fs-4 fw-bold">
              Title
            </label>
            <input
              type="text"
              className="form-control border-1 border-secondary"
              id="title"
              name="title"
              onChange={handleChange}
            />
          </div>
          <div className="border border-secondary" style={{ height: "200px" }}>
            <Editor
              editorState={editorState}
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              onEditorStateChange={onEditorStateChange}
            />
            <textarea
              style={{ display: "none" }}
              ref={(val) => (form.description = val)}
              value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
            />
          </div>

          <div className="card p-2 border-secondary border-1 mt-3">
            <label className="text-center" for="file-input">
              <input
                style={{ display: "none" }}
                id="file-input"
                type="file"
                onChange={handleChange}
                name="image"
              />
              <div className="d-flex justify-content-between align-items-center">
                <h6 className=" mt-1 text-primary">Photo Journey</h6>
                <CgAttachment />
              </div>
            </label>
          </div>

          <div className="col-md-4">
            {preview && (
              <div>
                <img src={preview} alt="img-product" width={400} height={500} />
              </div>
            )}
          </div>

          <button type="submit" class="btn btn-primary mt-3">
            Submit
          </button>
        </form>
      </Container>
    </div>
  );
};

export default AddJourney;
