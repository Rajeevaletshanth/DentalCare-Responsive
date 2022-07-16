import React, { useState, useEffect, Link } from "react";
import { useHistory } from "react-router-dom";
import axios from 'axios'
import toast, { Toaster } from "react-hot-toast";
import { useCookies } from 'react-cookie';
import configData from '../config.json';
import { useTranslation } from "react-i18next";

import { US, IT, FR, DE } from 'country-flag-icons/react/3x2'


// import { useDispatch, useSelector } from 'react-redux';
// import { setAdmin } from '../Redux/actions/loginActions';


const Login = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['admin-info']);
  const history = useHistory();
  const { t, i18n } = useTranslation();

  const [region, setRegion] = useState("it");

  // const admin = useSelector((state) => state)
  // const dispatch = useDispatch()

  //local storage
  useEffect(() => {
    // if(localStorage.getItem('user-info')){
    //   history.push("/admin/home");
    // }
    if(cookies['admin-info'] && localStorage.getItem('user-info')){
      history.push("/admin/dashboard");
      window.location.reload();
    }
  },[])


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  axios.defaults.withCredentials = true;
  const handleApi = (e) => {
    e.preventDefault();
    axios
        .post(`${configData.SERVER_URL}/admin/login`, {
          email,
          password
        })
        .then((res) => { 
          if(res.data.length > 0)  {
            var admin_info = {
              id:res.data[0].id,
              name:res.data[0].username
            }
            // console.log(res.data[0])
            //local storage
            //setCookie('admin-info', JSON.stringify(res.data[0]), { path: '/', maxAge: 3600 * 5 });
            setCookie('admin-info', JSON.stringify(res.data[0]), { path: '/' });
            localStorage.setItem("user-info",JSON.stringify(res.data[0]));
            localStorage.setItem("lang", region);
            // dispatch(setAdmin(res.data[0]))
            history.push("/admin/dashboard");
            window.location.reload();
          }else{
            toast.error("Wrong password or email!")
          }     
        })
  };

  useEffect(() => {
    i18n.changeLanguage(region);
  },[region])

  return (
    <div className="container-scroller">
      <Toaster/>
      <div className="container-fluid page-body-wrapper full-page-wrapper">
        <div className="content-wrapper d-flex align-items-center auth px-0">
          <div className="row w-100 mx-0">
            <div className="col-lg-4 mx-auto">
              <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                  <img src="../../images/dental-care.png" alt="logo" width="80%" height="80%"/>

                <div class="row">
                  <div class="col-sm-8">
                    <h4>{t("login.welcome_msg")}</h4>
                  </div>
                  <div class="col-sm-4">
                    <div class="dropdown float-right">
                      <button class="btn btn-light dropdown-toggle btn-sm rounded-0" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">                        
                        {region == "it"?
                        <IT title="Italy" style={{width:"20px" , height:"17px"}}/>:
                        region == "en"?
                        <US title="United States" style={{width:"20px" , height:"17px"}}/>:
                        region == "fr"?
                        <FR title="France" style={{width:"20px" , height:"17px"}}/>:
                        <DE title="Germany" style={{width:"20px" , height:"17px"}}/> 
                        }
                      </button>
                      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <a class="btn dropdown-item" value="it" onClick={() => setRegion('it')}><IT title="Italy" style={{width:"23px" , height:"19px", pointerEvents: "none"}}/> &nbsp; Italiana </a>
                        <a class="btn dropdown-item" value="en" onClick={() => setRegion('en')}><US title="United States" style={{width:"23px" , height:"19px", pointerEvents: "none"}}/> &nbsp; English </a>
                        <a class="btn dropdown-item" value="fr" onClick={() => setRegion('fr')}><FR title="France" style={{width:"23px" , height:"19px", pointerEvents: "none"}}/> &nbsp; Français </a>
                        <a class="btn dropdown-item" value="de" onClick={() => setRegion('de')}><DE title="Germany" style={{width:"23px" , height:"19px", pointerEvents: "none"}}/> &nbsp; Deutsch </a>
                      </div>
                    </div>
                  </div>
                </div>

                <h6 className="font-weight-light">{t("login.Sign in to continue")}</h6>
                <form className="pt-3" onSubmit={handleApi}>
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control form-control-lg"
                      onChange={handleEmail}
                      value={email}
                      id="exampleInputEmail1"
                      placeholder={t("login.Email")}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      onChange={handlePassword}
                      value={password}
                      id="exampleInputPassword1"
                      placeholder={t("login.Password")}
                    />
                  </div>
                  <div className="mt-3">
                    <button
                      className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                      
                    >
                      {t("login.SIGN IN")}
                    </button>
                  </div>
                  <div className="my-2 d-flex justify-content-between align-items-center">
                    <div className="form-check">
                      <label className="form-check-label text-muted">
                        <input type="checkbox" className="form-check-input" />
                        {t("login.Keep me signed in")}
                      </label>
                    </div>
                    <a href="#" className="auth-link text-black">
                    {t("login.Forgot Password")}
                    </a>
                  </div>
                  {/* <div className="mb-2">
                    <button
                      type="button"
                      className="btn btn-block btn-facebook auth-form-btn"
                    >
                      <i className="ti-facebook mr-2"></i>Connect using facebook
                    </button>
                  </div> */}
                  {/* <div className="text-center mt-4 font-weight-light">
                    Don't have an account?{" "}
                    <a href="/register" className="text-primary">
                      Create
                    </a>
                  </div> */}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
