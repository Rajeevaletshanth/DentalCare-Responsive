import React, { useEffect, useState } from 'react'
import {Link,useHistory} from "react-router-dom";
// import {Nav, NavDropdown} from "react-bootstrap"
// import configData from '../config.json';
// import '../css/header.css'
// import { useCookies } from 'react-cookie';
// import { useTranslation } from "react-i18next";
// import axios from 'axios';

// import { useDispatch, useSelector } from 'react-redux';
// import { showSidebar, hideSidebar } from '../Redux/actions/sidebarActions';

const Header = () => {
  {/** 
//   let user = JSON.parse(localStorage.getItem("user-info"));
  const [cookies, setCookie, removeCookie] = useCookies(['admin-info']);
  const history = useHistory();
  const [appointments , setAppointments] = useState([]);
  const { t, i18n } = useTranslation();

  const username = cookies["admin-info"].username;
  const admin_id = cookies["admin-info"].id;
  const [users, setUsers] = useState([]);

  const sidebar_view = useSelector((state) => state)
  const dispatch = useDispatch()

const [notifications, setNotifications] = useState(0);
  const logout = () => {
    // removeCookie('admin-info');
    removeCookie("admin-info",[{path:'/'}]);

    localStorage.clear();   
    history.push('/admin/login');
  }

  const handleSettings = () => {
    history.push('/admin/settings');
  }

  useEffect(async() => {
    await axios.get(`${configData.SERVER_URL}/admin/user/get/${admin_id}`).then((res) => {
      setUsers(res.data)
    })
    getAppointments();
  },[])

  const getAppointments = async() => {
    await axios.get(`${configData.SERVER_URL}/admin/appointment/get/${admin_id}`).then((res) => {
      setAppointments(res.data);
      // console.log(res.data);
      var notification = 0;
      res.data.map((item) => {
        if(item.notify)
          notification++;     
      })
      setNotifications(notification);
    });
  }

  const setNotified = async(e) => {
    await axios.put(`${configData.SERVER_URL}/admin/appointment/notify/${e.target.id}/${admin_id}`).then(() =>{
      getAppointments();
    })
  }

  const capitalizeFirst = str => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  
  useEffect(() => {
    const intervalId = setInterval(async() => {
      getAppointments();
    }, 5000);
    return () => clearInterval(intervalId)
  },[notifications])

  const [menuCollapse, setMenuCollapse] = useState(false);

  const menuIconClick = () => {
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
    menuCollapse ? dispatch(showSidebar("show")) : dispatch(hideSidebar("hide"));
  };
*/}
  return (
    <nav class="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
      <div class="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
        <a class="navbar-brand brand-logo mr-5" href="index.html"><img src="images/logo.svg" class="mr-2" alt="logo"/></a>
        <a class="navbar-brand brand-logo-mini" href="index.html"><img src="images/logo-mini.svg" alt="logo"/></a>
      </div>
      <div class="navbar-menu-wrapper d-flex align-items-center justify-content-end">
        <button class="navbar-toggler navbar-toggler align-self-center" type="button" data-toggle="minimize">
          <span class="icon-menu"></span>
        </button>
        <ul class="navbar-nav mr-lg-2">
          <li class="nav-item nav-search d-none d-lg-block">
            <div class="input-group">
              <div class="input-group-prepend hover-cursor" id="navbar-search-icon">
                <span class="input-group-text" id="search">
                  <i class="icon-search"></i>
                </span>
              </div>
              <input type="text" class="form-control" id="navbar-search-input" placeholder="Search now" aria-label="search" aria-describedby="search"/>
            </div>
          </li>
        </ul>
        <ul class="navbar-nav navbar-nav-right">
          <li class="nav-item dropdown">
            <a class="nav-link count-indicator dropdown-toggle" id="notificationDropdown" href="#" data-toggle="dropdown">
              <i class="icon-bell mx-0"></i>
              <span class="count"></span>
            </a>
            <div class="dropdown-menu dropdown-menu-right navbar-dropdown preview-list" aria-labelledby="notificationDropdown">
              <p class="mb-0 font-weight-normal float-left dropdown-header">Notifications</p>
              <a class="dropdown-item preview-item">
                <div class="preview-thumbnail">
                  <div class="preview-icon bg-success">
                    <i class="ti-info-alt mx-0"></i>
                  </div>
                </div>
                <div class="preview-item-content">
                  <h6 class="preview-subject font-weight-normal">Application Error</h6>
                  <p class="font-weight-light small-text mb-0 text-muted">
                    Just now
                  </p>
                </div>
              </a>
              <a class="dropdown-item preview-item">
                <div class="preview-thumbnail">
                  <div class="preview-icon bg-warning">
                    <i class="ti-settings mx-0"></i>
                  </div>
                </div>
                <div class="preview-item-content">
                  <h6 class="preview-subject font-weight-normal">Settings</h6>
                  <p class="font-weight-light small-text mb-0 text-muted">
                    Private message
                  </p>
                </div>
              </a>
              <a class="dropdown-item preview-item">
                <div class="preview-thumbnail">
                  <div class="preview-icon bg-info">
                    <i class="ti-user mx-0"></i>
                  </div>
                </div>
                <div class="preview-item-content">
                  <h6 class="preview-subject font-weight-normal">New user registration</h6>
                  <p class="font-weight-light small-text mb-0 text-muted">
                    2 days ago
                  </p>
                </div>
              </a>
            </div>
          </li>
          <li class="nav-item nav-profile dropdown">
            <a class="nav-link dropdown-toggle" href="#" data-toggle="dropdown" id="profileDropdown">
              <img src="images/faces/face28.jpg" alt="profile"/>
            </a>
            <div class="dropdown-menu dropdown-menu-right navbar-dropdown" aria-labelledby="profileDropdown">
              <a class="dropdown-item">
                <i class="ti-settings text-primary"></i>
                Settings
              </a>
              <a class="dropdown-item">
                <i class="ti-power-off text-primary"></i>
                Logout
              </a>
            </div>
          </li>
          <li class="nav-item nav-settings d-none d-lg-flex">
            <a class="nav-link" href="#">
              <i class="icon-ellipsis"></i>
            </a>
          </li>
        </ul>
        <button class="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas">
          <span class="icon-menu"></span>
        </button>
      </div>
    </nav>
  );
}

export default Header;
