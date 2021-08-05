import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import * as Yup from "yup";
function SignUp() {
  const initialValues = {
    username: "",
    password: "",
  };
  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(15).required("Username is required"),
    password: Yup.string().min(3).max(20).required("Password is required"),
  });
  const onSubmit = (data) => {
    axios.post("http://localhost:3001/auth", data).then((res) => {
      console.log(res);
    });
  };
  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label>Username: </label>
          <ErrorMessage name="username" component="span" />
          <Field
            className="userInput"
            name="username"
            placeholder=""
            autoComplete="off"
          />
          <label>Password: </label>
          <ErrorMessage name="password" component="span" />
          <Field
          type="password"
            className="pwdInput"
            name="password"
            placeholder=""
            autoComplete="off"
          />
          <button type="submit">Sign Up</button>
        </Form>
      </Formik>
    </div>
  );
}

export default SignUp;
