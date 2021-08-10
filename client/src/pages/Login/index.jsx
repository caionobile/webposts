import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import * as Yup from "yup";
import styles from "./Login.module.css";
import { useHistory } from "react-router-dom";

function Login() {
  const history = useHistory();
  const initialValues = {
    username: "",
    password: "",
  };
  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(15).required("Username is required"),
    password: Yup.string().min(3).max(20).required("Password is required"),
  });
  const onSubmit = (data, { resetForm }) => {
    axios
      .post("http://localhost:3001/auth/login", data)
      .then((res) => {
        sessionStorage.setItem("accessToken", res.data.accessToken);
        history.push("/");
      })
      .catch(() => resetForm());
  };
  return (
    <div className={styles.wrapper}>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className={styles.formContainer}>
          <label>Username: </label>
          <ErrorMessage name="username" component="span" />
          <Field
            className={styles.input}
            name="username"
            placeholder=""
            autoComplete="off"
          />
          <label>Password: </label>
          <ErrorMessage name="password" component="span" />
          <Field
            type="password"
            className={styles.input}
            name="password"
            placeholder=""
            autoComplete="off"
          />
          <button className={styles.button} type="submit">
            Login
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default Login;
