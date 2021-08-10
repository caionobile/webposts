import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useHistory } from "react-router-dom";
import axios from "axios";
import * as Yup from "yup";
import styles from "./CreatePost.module.css";

function CreatePost() {
  const initialValues = {
    title: "",
    postText: "",
    username: "",
  };

  const history = useHistory();

  const onSubmit = (data) => {
    axios
      .post("http://localhost:3001/posts", data, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then(() => {
        history.push("/");
      })
      .catch(() => alert("User must be logged in"));
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    postText: Yup.string().required("Message is required"),
  });
  return (
    <div className={styles.createPostPage}>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className={styles.formContainer}>
          <label>Title: </label>
          <ErrorMessage name="title" component="span" />
          <Field
            id={styles.inputCreatePost}
            name="title"
            placeholder=""
            autoComplete="off"
          />
          <label>Message: </label>
          <ErrorMessage name="postText" component="span" />
          <Field
            id={styles.inputCreatePost}
            name="postText"
            placeholder=""
            autoComplete="off"
          />
          <button type="submit">Create Post</button>
        </Form>
      </Formik>
    </div>
  );
}

export default CreatePost;
