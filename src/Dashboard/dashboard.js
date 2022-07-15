import React, { useEffect, useState, useMemo } from 'react'
import '../css/content.css'
import { useCookies } from 'react-cookie';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import configData from '../config.json';
import { useTranslation } from "react-i18next";

import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from 'recharts';


// import { FaBell } from "react-icons/fa";
const moment = require('moment');


const Dashboard = () => {
const [cookies, setCookie, removeCookie] = useCookies(['admin-info']);
const username = cookies["admin-info"].username;
const admin_id = cookies["admin-info"].id;
const { t, i18n } = useTranslation();

const history = useHistory();

const monthArr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec'];
const today = Date().toLocaleString();

const [booking_data, setBookingData] = useState([]);
const [totalBooking, setTotalBooking] = useState(0);
const [totalOnlineBooking, setTotalOnlineBooking] = useState(0);
const [todayBooking, setTodayBookings] = useState(0);
const [todayOnlineBooking, setTodayOnlineBookings] = useState();
const [monthlyBooking, setMonthlyBookings] = useState(0);
const [monthlyOnlineBooking, setMonthlyOnlineBookings] = useState(0);

const [patients , setPatients] = useState([]);
const [users, setUsers] = useState([]);
const [appointments , setAppointments] = useState([]);

const [layoutprogress, setLayoutprogress] = useState(0);

const [notifications, setNotifications] = useState(0);

const [spinnerHide, setSpinnerHide] = useState("")
const [contentHide, setcontentHide] = useState("hidden")

setTimeout(() => {
  setSpinnerHide("hidden");
  setcontentHide("");
},1000)

useEffect(async() => {
  // const intervalId = setInterval(async() => {
    await axios.get(`${configData.SERVER_URL}/admin/user/get/${admin_id}`).then((res) => {
      setUsers(res.data)
    })

    getBooking();
    getPatient();
    

    getAppointments();
    getLayoutProgress()
  // }, 1000);
  // return () => clearInterval(intervalId)
},[]);

useEffect(() => {
  const intervalId = setInterval(async() => {
    getBooking();
    getPatient();
    }, 5000);
  return () => clearInterval(intervalId)
},[])

const getPatient = async() => {
  await axios.get(`${configData.SERVER_URL}/admin/user/get/${admin_id}`).then((res) => {
    setPatients(res.data);
  });
}

const getBooking = async() => {
  await axios.get(`${configData.SERVER_URL}/admin/booking/get/${admin_id}`).then((res) => {
    if(res.data.length > 0){
      var total_count = 0;
      var online_bookings = 0;
      var today_bookings = 0;
      var today_online_bookings = 0;
      var monthly_bookings = 0;
      var monthly_online_bookings = 0;

      setBookingData(res.data);
      
      res.data.map((item, index) => {
        if(dateParsing(moment(today).format('DD-MM-YYYY')) <= dateParsing(item.date)){
          if(moment(today).format('HH:mm') <= item.start_time || dateParsing(moment(today).format('DD-MM-YYYY')) < dateParsing(item.date)){
            total_count++;
            if(item.is_onlinebook){
              online_bookings++;         
            }
            if(moment(today).format('DD-MM-YYYY') == item.date){
              today_bookings++;
              if(item.is_onlinebook){
                today_online_bookings++;         
              }         
            }
            if(moment(today).format('MM-YYYY') == item.date.substring(3)){
              monthly_bookings++;
              if(item.is_onlinebook){
                monthly_online_bookings++;         
              }         
            }
          }
        }
      })
      
      setTotalBooking(total_count);
      setTotalOnlineBooking(online_bookings);
      setTodayBookings(today_bookings);
      setTodayOnlineBookings(today_online_bookings);
      setMonthlyBookings(monthly_bookings);
      setMonthlyOnlineBookings(monthly_online_bookings);
    }   
  })
}


//Layout progress
const getLayoutProgress = async() => {
  var progress = 0;
  await axios.get(`${configData.SERVER_URL}/admin/aboutusui/get/${admin_id}`).then((res) => {
    if(res.data.length > 0){
      progress++;
    }      
  })
  await axios.get(`${configData.SERVER_URL}/admin/contactui/get/${admin_id}`).then((res) => {
    if(res.data.length > 0){
      progress++;
    }      
  })
  // await axios.get(`${configData.SERVER_URL}/admin/wxtraui/get/${admin_id}`).then((res) => {
  //   if(res.data.length > 0){
  //     progress++;
  //   }      
  // })
  await axios.get(`${configData.SERVER_URL}/admin/generalui/get/${admin_id}`).then((res) => {
    if(res.data.length > 0){
      progress++;
    }      
  })
  await axios.get(`${configData.SERVER_URL}/admin/homeui/get/${admin_id}`).then((res) => {
    if(res.data.length > 0){
      progress++;
    }      
  })
  await axios.get(`${configData.SERVER_URL}/admin/serviceui/get/${admin_id}`).then((res) => {
    if(res.data.length > 0){
      progress++;
    }      
  })
  await axios.get(`${configData.SERVER_URL}/admin/teamui/get/${admin_id}`).then((res) => {
    if(res.data.length > 0){
      progress++;
    }      
  })
  setLayoutprogress(Math.round((progress/7) * 100) + "%");
}

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

const dateParsing = (date) =>{
  var parts = date.split("-");
  return new Date(parts[2], parts[1] - 1, parts[0]);
}


const capitalizeFirst = str => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};


//Charts
const renderCustomBarLabel = ({ payload, x, y, width, height, value }) => {
  return <text x={x + width / 2} y={y} fill="white" textAnchor="middle" dy={-6}>{value}</text>; //fontWeight={900}
};


const getMonth = (month) => {
  var currentMnth = moment().month() - month;
  if(currentMnth < 0){
    currentMnth = 12 + currentMnth;
  }
  return currentMnth;
}

const getMonthlyAppointment = (month) => {
  var app_count = 0;
  booking_data.map((item, index) => {
    let parts = item.date.split("-");
    if(parts[2] == moment().year() || parts[2] == moment().year()-1){
      if(parseInt(parts[1])-1 == month){
        app_count++;
      }
    }
  })
  return app_count;
}

const chartData = [
  {name: monthArr[getMonth(11)], Appuntamenti: getMonthlyAppointment(getMonth(11))},
  {name: monthArr[getMonth(10)], Appuntamenti: getMonthlyAppointment(getMonth(10))},
  {name: monthArr[getMonth(9)], Appuntamenti: getMonthlyAppointment(getMonth(9))},
  {name: monthArr[getMonth(8)], Appuntamenti: getMonthlyAppointment(getMonth(8))},
  {name: monthArr[getMonth(7)], Appuntamenti: getMonthlyAppointment(getMonth(7))},
  {name: monthArr[getMonth(6)], Appuntamenti: getMonthlyAppointment(getMonth(6))},
  {name: monthArr[getMonth(5)], Appuntamenti: getMonthlyAppointment(getMonth(5))},
  {name: monthArr[getMonth(4)], Appuntamenti: getMonthlyAppointment(getMonth(4))},
  {name: monthArr[getMonth(3)], Appuntamenti: getMonthlyAppointment(getMonth(3))},
  {name: monthArr[getMonth(2)], Appuntamenti: getMonthlyAppointment(getMonth(2))},
  {name: monthArr[getMonth(1)], Appuntamenti: getMonthlyAppointment(getMonth(1))},
  {name: monthArr[getMonth(0)], Appuntamenti: getMonthlyAppointment(getMonth(0))},
];

var eventCount = 0;

const formatDate = (date) => {
  var part = date.split("-");
  return part[2] + "-" + part[1] + "-" + part[0];
}




  return (
    <div className="content-wrapper mx-auto" >
      <div className="">
        <div className="spinner-container" style={{ textAlign: "center"}} hidden={spinnerHide}>
          <div className="row">
              <div class="spinner-grow  text-primary " role="status">
              <span class="sr-only">Loading...</span>
            </div>
            <div class="spinner-grow text-primary ml-5" role="status">
              <span class="sr-only">Loading...</span>
            </div>
            <div class="spinner-grow text-primary ml-5" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      <div classname="content-container" hidden={contentHide}>
          <div className="row">
            <div className="col-md-12 grid-margin">
              <div className="row">
                <div className="col-12 col-xl-8 mb-4 mb-xl-0">
                  <h3 className="font-weight-bold">{t("dashboard.Welcome")} {capitalizeFirst(username)}</h3>
                  <h6 className="font-weight-normal mb-0">{t("dashboard.All systems are running smoothly")} {t("dashboard.You have")} <span className="text-primary">{notifications} {t("dashboard.unread alerts")}</span></h6>
                </div>
                <div className="col-12 col-xl-4">
                 <div className="justify-content-end d-flex">
                  <div className="dropdown flex-md-grow-1 flex-xl-grow-0">
                  </div>
                 </div>
                </div>
              </div>
            </div>
          </div>
        
          
            <div className="row">
            <div className="col-md-6 grid-margin transparent">
              <div className="row">
                <div className="col-md-6 mb-4 stretch-card transparent">
                  <div className="card card-tale" style={{cursor:"pointer"}} onClick={() => history.push('./bookings')}>
                    <div className="card-body">
                      <h6 className="mb-4">{t("dashboard.Today's Appointments")}</h6>
                      <p className="fs-30 mb-2">{todayBooking}</p>
                      <p>{t("dashboard.Online Appointments")} : {todayOnlineBooking}</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mb-4 stretch-card transparent">
                  <div className="card card-dark-blue" style={{cursor:"pointer"}} onClick={() => history.push('./bookings')}>
                    <div className="card-body">
                      <h6 className="mb-4">{t("dashboard.This Month Appointments")}</h6>
                      <p className="fs-30 mb-2">{monthlyBooking}</p>
                      <p>{t("dashboard.Online Appointments")} : {monthlyOnlineBooking}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 grid-margin transparent">
              <div className="row">
                <div className="col-md-6 mb-4 mb-lg-0 stretch-card transparent">
                  <div className="card card-light-blue" style={{cursor:"pointer"}} onClick={() => history.push('./bookings')}>
                    <div className="card-body">
                      <h6 className="mb-4">{t("dashboard.Total Appointments")}</h6>
                      <p className="fs-30 mb-2">{totalBooking}</p>
                      <p>{t("dashboard.Online Appointments")} : {totalOnlineBooking}</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 stretch-card transparent">
                  <div className="card card-light-danger"  style={{cursor:"pointer"}} onClick={() => history.push('./patients')}>
                    <div className="card-body">
                      <h6 className="mb-4">{t("dashboard.Number of Patients")}</h6>
                      <p className="fs-30 mb-2">{patients.length}</p>
                      <p></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 grid-margin stretch-card" style={{maxHeight: "600px"}}>
              <div className="card"  style={{backgroundImage:"linear-gradient( #7978E9 , #4747A1)"}}> 
                <div className="card-body">
                  
                  <div className="d-flex justify-content-between">
                    <p className="card-title text-white">{t("dashboard.Appointments")}</p>
                    <a href="/admin/appointments" className="text-white">{t("dashboard.View all")}</a>
                 </div>
                  {/* <p className="font-weight-500">The total number of sessions within the date range. It is the period time a user is actively engaged with your website, page or app, etc</p> */}
                  <div className="d-flex flex-wrap mb-3">
                    <div className="mr-5 mt-3">
                      <p class="text-white">{t("dashboard.Total Appointments")}. ({t("dashboard.All time")})</p>
                      <h3 className="text-white fs-30 font-weight-medium">{booking_data.length}</h3>
                    </div>
                  </div>
                  
                  {/* <canvas id="order-chart" class="chartjs-render-monitor"></canvas> */}
                  {/* <div style={{width: '100%',height: '60%'}}>
                    <Chart data={chartData} axes={axes} />
                  </div> */}
                  <ResponsiveContainer width="95%" height="65%" class="card ml-0 mr-5">
                    <BarChart data={chartData}>
                      <XAxis dataKey="name" stroke="white" fontWeight={900} />
                      <YAxis tick={true} stroke="white"/>
                      {/* <Tooltip wrapperStyle={{ width: 100,  backgroundColor: '#7978E9', color:'#7978E9' }} /> */}
                      <Legend width={0} wrapperStyle={{ top: -40, right: -40, color:"black", borderRadius: 5, lineHeight: '0px' }} />
                      <CartesianGrid stroke="#ccc" strokeDasharray="0.3 0.3" />
                      <Bar dataKey="Appuntamenti" fill="white" barSize={100} /> {/*label={renderCustomBarLabel} */}
                    </BarChart>
                  </ResponsiveContainer>

                </div>
              </div>
            </div>

            {/* <div className="col-md-6 grid-margin stretch-card">
              <div className="card" style={{maxHeight: "600px", overflowY: "auto", paddingBottom: "15px", backgroundColor:"#F3797E"}}>
                <div className="card-body"   >
                 <div className="d-flex justify-content-between">
                  <p className="card-title text-white">{t("dashboard.Today's Appointments")}</p>
                  <a href="/admin/appointments" className="text-white">{t("dashboard.View all")}</a>
                 </div>
                  <span class="span text-white rounded border border-white mr-2" style={{ backgroundColor: "#7978E9", padding: "5px"}}>{t("dashboard.Active")}</span>
                  <span class="span text-white rounded border border-white" style={{ backgroundColor: "#F3797E", padding: "5px"}}>{t("dashboard.Expired")}</span>
                  <div className=" mt-3" style={{height:"340px", backgroundImage:"linear-gradient(#ffcccc, white)", overflowY: "scroll", overflowX: "hidden"}}>
                  <div class="row ml-1 mt-4" >
                  {booking_data.map((item, index) => {
                    var upcoming = "#7978E9";
                    var booked_patient = item.patient_id
                    if(moment(today).format("YYYY-MM-DD") == formatDate(item.date)){
                      if(moment(today).format("HH:mm") >= item.start_time){
                        upcoming = "#F3797E"
                      }
                      eventCount++;
                      // if(eventCount < 20){
                        if(item.patient_id != "admin"){
                          {users.map((usr) => {
                            if(item.patient_id == usr.id){
                              booked_patient = usr.firstname + " " + usr.surname;
                            }
                          })}
                        }
                        return(
                          <a className="col-md-5 ml-4 mr-2 mb-1 text-white text-center " href="/admin/bookings" style={{backgroundColor: upcoming, cursor: "pointer"}}>                 
                            <h6 className="text-center" style={{paddingTop : "7px"}}> {t("dashboard.Name")} : {capitalizeFirst(booked_patient)}</h6>
                            <h5 className="text-center" >{t("header.time")} : {item.start_time} - {item.end_time}</h5>
                          </a>                    
                        )
                      // }
                    }                   
                  })}
                  {eventCount == 0?
                    <a className="col ml-4 mr-5 mb-1 text-white text-center" href="/admin/bookings" style={{backgroundColor: "#4747A1", cursor: "pointer"}}>                 
                    <h5 className="text-center" style={{padding : "7px"}}>{t("dashboard.No Appointments Today")}</h5>
                    </a>  : ""
                  }
                  </div>
                  </div>
                </div>
              </div>
            </div> */}

            <div class="col-md-6 grid-margin stretch-card">
              <div class="card" style={{border:"1px solid #d4d4d4", maxHeight: "500px",  padding:"20px"}}>
                <div class="card-body" style={{overflowY:"scroll"}}>
                  <p class="card-title mb-4">{t("dashboard.Today's Appointments")}</p>
                  <div class="table-responsive">
                    <table class="table table-striped table-borderless">
                      <thead>
                        <tr>
                          <th class="text-center">{t("dashboard.Name")}</th>
                          <th class="text-center">{t("dashboard.Time")}</th>
                          <th class="text-center">{t("dashboard.Status")}</th>
                        </tr>  
                      </thead>
                      <tbody>
                      {booking_data.map((item, index) => {
                        var isActive = true
                        var booked_patient = item.patient_id
                        if(moment(today).format("YYYY-MM-DD") == formatDate(item.date)){
                          if(moment(today).format("HH:mm") >= item.start_time){
                            isActive = false
                          }
                          eventCount++;
                            if(item.patient_id != "admin"){
                              {users.map((usr) => {
                                if(item.patient_id == usr.id){
                                  booked_patient = usr.firstname + " " + usr.surname;
                                }
                              })}
                            }
                            return(
                              // <a className="col-md-5 ml-4 mr-2 mb-1 text-white text-center " href="/admin/bookings" style={{backgroundColor: upcoming, cursor: "pointer"}}>                 
                              //   <h6 className="text-center" style={{paddingTop : "7px"}}> {t("dashboard.Name")} : {capitalizeFirst(booked_patient)}</h6>
                              //   <h5 className="text-center" >{t("header.time")} : {item.start_time} - {item.end_time}</h5>
                              // </a>  
                              <tr>
                              <td class="text-center">{capitalizeFirst(booked_patient)}</td>
                              <td class="text-center font-weight-bold">{item.start_time} - {item.end_time}</td>
                              <td class=" text-center font-weight-medium"><div class={isActive? "badge badge-success" : "badge badge-danger"}>{isActive? t("dashboard.Active") : t("dashboard.Expired")}</div></td>
                            </tr>                  
                            )
                        }                   
                      })}
                      </tbody>
                    </table>
                    {eventCount == 0?              
                      <h5 className="text-center" style={{padding : "7px"}}>{t("dashboard.No Appointments Today")}</h5>
                       : ""
                    }
                  </div>
                </div>
              </div>
            </div>
            

          </div>
          <p className="text-muted">{t("dashboard.Layout progress")}</p>
          <div class="progress"  style={{ height: "25px"}}>
            <div class="progress-bar" role="progressbar" style={{width:layoutprogress, backgroundColor: "#7DA0FA"}} aria-valuenow={layoutprogress} aria-valuemin="0" aria-valuemax="100">{layoutprogress}</div>
          </div>
          </div>
          </div>
        </div>
  );
}

export default Dashboard;