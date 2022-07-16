import React, { useEffect, useState } from 'react'
import {Link,useHistory} from "react-router-dom";
import {Nav, NavDropdown} from "react-bootstrap"
import configData from '../config.json';
import '../css/header.css'
import { useCookies } from 'react-cookie';
import { useTranslation } from "react-i18next";
import axios from 'axios';

import { useDispatch, useSelector } from 'react-redux';
import { showSidebar, hideSidebar } from '../Redux/actions/sidebarActions';
import Search from './Search';


const Header = () => {
 
//   let user = JSON.parse(localStorage.getItem("user-info"));
  const [cookies, setCookie, removeCookie] = useCookies(['admin-info']);
  const history = useHistory();
  const [appointments , setAppointments] = useState([]);
  const { t, i18n } = useTranslation();

  const username = cookies["admin-info"].username;
  const admin_id = cookies["admin-info"].id;
  const [users, setUsers] = useState([]);

  const [query, setQuery] = useState("")

  const sidebar_view = useSelector((state) => state)
  const dispatch = useDispatch()

const [notifications, setNotifications] = useState(0);
  const logout = () => {
    // removeCookie('admin-info');
    removeCookie("admin-info",[{path:'/'}]);

    localStorage.clear();   
    history.push('/admin/login');
    window.location.reload()
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

  return (
    <nav class="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
      <div class="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
        <a class="navbar-brand brand-logo mr-5" href="index.html"><img src="../../images/ltw-full.svg" class="mr-2" alt="logo"/></a>
        <a class="navbar-brand brand-logo-mini" href="index.html"><img src="../../images/ltw-mini.svg" alt="logo" height="40px"/></a>
      </div>
      <div class="navbar-menu-wrapper d-flex align-items-center justify-content-end">
        <button class="navbar-toggler navbar-toggler align-self-center" type="button" data-toggle="minimize">
          <span class="icon-menu"></span>
        </button>
        <ul class="navbar-nav mr-lg-2">
          <Search/>
        </ul>
        <ul class="navbar-nav navbar-nav-right">
          <li class="nav-item dropdown">
            
            <a class="nav-link count-indicator dropdown-toggle" id="notificationDropdown" data-toggle="dropdown">
              <i class="icon-bell mx-0"></i>
              {notifications > 0 ? <span class="count"></span> : ""}              
            </a>
            <div class="dropdown-menu dropdown-menu-right navbar-dropdown preview-list" aria-labelledby="notificationDropdown">
              <p class="mb-0 font-weight-normal float-left dropdown-header">{notifications} Notifications</p>
              {appointments.map((item,index) =>{
                var booked_patient = item.patient_id;
                if(item.patient_id != "admin"){
                  {users.map((usr) => {
                    if(item.patient_id == usr.id){
                      booked_patient = usr.firstname + " " + usr.surname;
                    }
                  })}
                }
                if(item.notify){
                  return(
                    // <li><a class="dropdown-item" >{t("header.Patient")} : <b>{booked_patient}</b> &nbsp; {t("header.date")} : <b>{item.date}</b> &nbsp; {t("header.time")} : <b>{item.start_time}</b> &nbsp; <button class="btn btn-danger btn-xs"  id={item.id} onClick={setNotified}>&#10006;</button></a></li>
                    <a class="dropdown-item preview-item">
                      <div class="preview-thumbnail">
                        <div class="preview-icon bg-danger">
                          <i class="ti-user mx-0"></i>
                        </div>
                      </div>
                      <div class="preview-item-content btn"  id={item.id} onClick={setNotified} >
                        <h6 class="preview-subject font-weight-bold float-left">{booked_patient}</h6>
                        <p class="font-weight-light small-text mb-0 text-muted float-left">
                          <div className="form-inline">
                          <p class="font-weight-light small-text mb-0 text-muted"> {t("header.date")} : {item.date}</p>
                          <p class="font-weight-light small-text mb-0 text-muted"> {t("header.time")} : {item.start_time}</p>
                          </div>
                        </p>
                      </div>
                    </a>
                  )
                }
              })}
              {/* <a class="dropdown-item preview-item">
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
              </a> */}
            </div>
          </li>
          <li class="nav-item nav-profile dropdown">
            <a class="nav-link dropdown-toggle" href="#" data-toggle="dropdown" id="profileDropdown">             
              <div className="form-inline">
                <img src="../../images/faces/profile.png" alt="profile"/>
                <h5 className='ml-1 mt-2'>{capitalizeFirst(username)}</h5>
              </div>
            </a>
            <div class="dropdown-menu dropdown-menu-right navbar-dropdown" aria-labelledby="profileDropdown">
              <a class="dropdown-item" href="/admin/settings">
                <i class="ti-settings text-primary"></i>
                Settings
              </a>
              <a class="dropdown-item" onClick={logout}>
                <i class="ti-power-off text-primary"></i>
                Logout
              </a>
            </div>
          </li>
          {/* <li class="nav-item nav-settings d-none d-lg-flex">
            <a class="nav-link" href="#">
              <i class="icon-ellipsis"></i>
            </a>
          </li> */}
        </ul>
        <button class="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas">
          <span class="icon-menu"></span>
        </button>
      </div>
    </nav>
  );
}

export default Header;
