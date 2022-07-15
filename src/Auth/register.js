import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useHistory } from "react-router-dom";
import configData from '../config.json';


const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory()

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  axios.defaults.withCredentials = true;
  const handleAPI = (e) => {
    e.preventDefault();
    
    if (!username) {
      toast.error("Username cannot be empty!");
    } else if (!email) {
      toast.error("Email cannot be empty!");
    } else if (!password) {
      toast.error("Password cannot be empty!");
    } else {
      
      axios
        .post(`${configData.SERVER_URL}/admin/register`, {
          username,
          password,
          email,
        })
        .then((res) => {
          if (res.data == "") {
            toast.error(
              "This email is already registered! Sign In to continue."
            );
          } else {
            // toast.success("Successfully Registered");
            history.push('/admin/login')
          }
        })
    }
  };

  

  return (
    <div className="container-scroller">
      <Toaster />
      <div className="container-fluid page-body-wrapper full-page-wrapper">
        <div className="content-wrapper d-flex align-items-center auth px-0">
          <div className="row w-100 mx-0">
            <div className="col-lg-4 mx-auto">
              <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                <img
                  src="../../images/dental-care.png"
                  alt="logo"
                  width={400}
                  height={225}
                />
                <h4>New here?</h4>
                <h6 className="font-weight-light">
                  Signing up is easy. It only takes a few steps
                </h6>
                <form className="pt-3">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      id="exampleInputUsername1"
                      placeholder="Username"
                      onChange={handleUsername}
                      value={username}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control form-control-lg"
                      id="exampleInputEmail1"
                      placeholder="Email"
                      onChange={handleEmail}
                      value={email}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      id="exampleInputPassword1"
                      placeholder="Password"
                      onChange={handlePassword}
                      value={password}
                    />
                  </div>
                  <div className="mt-3">
                    <a
                      className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                      href="../../index.html"
                      onClick={handleAPI}
                    >
                      SIGN UP
                    </a>
                  </div>
                  <div className="text-center mt-4 font-weight-light">
                    Already have an account?{" "}
                    <a href="login.html" className="text-primary">
                      Login
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Register;
