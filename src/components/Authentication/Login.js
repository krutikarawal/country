// components/Login.js

import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import './Login.css'

const LoginSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
});

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (values) => {
    // Simulate authentication with JSON Server
    fetch('http://localhost:3000/users', {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => {
        const user = data.find( (u) =>
            u.username === values.username && u.password === values.password
        );

        if (user) {
          navigate('/dashboard'); // Redirect to dashboard on successful login
        } else {
          alert('Invalid credentials');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <h2>Login</h2>
          <Formik
            initialValues={{
              username: '',
              password: '',
            }}
            validationSchema={LoginSchema}
            onSubmit={handleLogin}
          >
            <Form>
              <div className="form-group">
                <label className = "login" htmlFor="username">Username</label>
                <Field
                  type="text"
                  name="username"
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className = "login" htmlFor="password">Password</label>
                <Field
                  type="password"
                  name="password"
                  className="form-control"
                />
              </div>
              <button type="submit" className="btn btn-primary" id='btnLogin'>
                Login
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;
