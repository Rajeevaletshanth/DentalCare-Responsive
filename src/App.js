import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Root from './root';
import Notfound from './Dashboard/notFound';
import { useTranslation } from "react-i18next";
import configData from './config.json';

import Login from './Auth/login'
import Register from './Auth/register'
import axios from 'axios';
import Base from './Auth/base';


const App = () => {
  const [user, setUser] = useState();
  const [isAuth, setAuth] = useState(false);
  axios.defaults.withCredentials = true;

  const [cookies, setCookie, removeCookie] = useCookies(['admin-info']);
  // const admin_id = cookies["admin-info"].id;

  useEffect( async() => {
     await axios.get(`${configData.SERVER_URL}/admin/login`).then((response) => {
      if(response.data.loggedIn == true){
        const username = response.data.user[0].username;       
        setUser(username);
        setAuth(true);        
      } 
      if(cookies["admin-info"]) {
        const admin_id = cookies["admin-info"].id;
        // getLang(admin_id); 
      }
        
    })
  },[]);

  // const { t, i18n } = useTranslation();
  // const handleLang = (lang) => {
  //     i18n.changeLanguage(lang);
  // }

  // const getLang = async(admin_id) => {
  //   await axios.get(`${configData.SERVER_URL}/admin/settings/get/${admin_id}`).then((res) => {
  //       if(res.data.length > 0){
  //           handleLang(res.data[0].language);
  //       }
  //   })
  // }

  return (
  <Router>
   <Switch>
      <Route path="/" exact component={Base}/>
      <Route path="/admin/login" exact component={Login}/>
      <Route path="/admin/register" exact component={Register}/>
      <Route component={Root}/>
      {/* <Route component={Notfound} />  */}
   </Switch>
  </Router>
  );
}

export default App;
