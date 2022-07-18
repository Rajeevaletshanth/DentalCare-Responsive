import React, { useEffect, useState } from 'react'
import '../css/bookings.css'
import { useCookies } from 'react-cookie';
import axios from 'axios';
import toast, { Toaster } from "react-hot-toast";
import configData from '../config.json';
import { useTranslation } from "react-i18next";

import { FiRefreshCcw } from "react-icons/fi";

var Tooltip = require('rc-tooltip');


const moment = require('moment');

const Booking = () => {
  const date = new Date();
  const today_date = new Date();

  const today = date.getDay();

  const [cookies, setCookie, removeCookie] = useCookies(['admin-info']);
  const username = cookies["admin-info"].username;
  const admin_id = cookies["admin-info"].id;

  const { t, i18n } = useTranslation();

  const [timeIntArr, setTimeIntArr] = useState([]);
  const [gen_offHours, setgenOffHours] = useState([]);

  const [spcDayArr, setSpclDayArr] = useState([]);

  const [bookingDet, setbookingDet] = useState([]);
  const [isBooked, setBooked] = useState(0);


  const dayArr = ['monday','tuesday','wednesday','thursday','friday','saturday','sunday'];
  const monthArr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec'];
  const [monday , setMonday] = useState();
  const [tuesday , setTuesday] = useState();
  const [wednesday , setWednesday] = useState();
  const [thursday , setThursday] = useState();
  const [friday , setFriday] = useState();
  const [saturday , setSaturday] = useState();
  const [sunday , setSunday] = useState();
  const [firstday, setFirstday] = useState();

  const [weekCount, setWeekCount] = useState(0);
  const [current_Week,setcurrentWeek] = useState(false);
  const [lastweek,setlastweek] = useState("");
  const [todayDate, settodayDate] = useState();

  const [userArr, setUserArr] = useState([])

  const [spinnerHide, setSpinnerHide] = useState("")
  const [contentHide, setcontentHide] = useState("hidden")

  setTimeout(() => {
    setSpinnerHide("hidden");
    setcontentHide("");
  },1000)


  useEffect(() => {
        settodayDate(dateConvert(today_date, 0, 0));
        if(today == 0){
            date.setDate(date.getDate()-6);
        }else if(today == 6){
            date.setDate(date.getDate()-5);
        }else if(today == 5){
            date.setDate(date.getDate()-4);
        }else if(today == 4){
            date.setDate(date.getDate()-3);
        }else if(today == 3){
            date.setDate(date.getDate()-2);
        }else if(today == 2){
            date.setDate(date.getDate()-1);
        }else if(today == 1){
            date.setDate(date.getDate());
        }
        setFirstday(date);

        setMonday(setweekday(date,"monday"));
        setTuesday(setweekday(date,"tuesday"));
        setWednesday(setweekday(date,"wednesday"));
        setThursday(setweekday(date,"thursday"));
        setFriday(setweekday(date,"friday"));
        setSaturday(setweekday(date,"saturday"));
        setSunday(setweekday(date,"sunday"));

  },[])

  const setWeekDays = () => {
    setMonday(setweekday(firstday,"monday",weekCount));
    setTuesday(setweekday(firstday,"tuesday",weekCount));
    setWednesday(setweekday(firstday,"wednesday",weekCount));
    setThursday(setweekday(firstday,"thursday",weekCount));
    setFriday(setweekday(firstday,"friday",weekCount));
    setSaturday(setweekday(firstday,"saturday",weekCount));
    setSunday(setweekday(firstday,"sunday",weekCount));
  }

  const setweekday = (firstday , day, week = 0) => {
    if(day == "monday"){
        return dateConvert(firstday, week, 0)
    }else if(day == "tuesday"){
        return dateConvert(firstday, week, 1)
    }else if(day == "wednesday"){
        return dateConvert(firstday, week, 2)
    }else if(day == "thursday"){
        return dateConvert(firstday, week, 3)
    }else if(day == "friday"){
        return dateConvert(firstday, week, 4)
    }else if(day == "saturday"){
        return dateConvert(firstday, week, 5)
    }else if(day == "sunday"){
        return dateConvert(firstday, week, 6)
    }
  }

  const dateConvert = (firstday, week, addDay) => {
    var currentdate = new Date(firstday);
    currentdate.setDate(firstday.getDate() + week + addDay);
    currentdate.toLocaleDateString();
    return moment(currentdate).format("DD-MM-YYYY")
  }

  const nextWeek = (e) => {
      e.preventDefault();
      setWeekCount(weekCount + 7);
      setWeekDays();
  }

  const lastWeek = (e) => {
    e.preventDefault();
    setWeekCount(weekCount - 7);
    setcurrentWeek(true);
    setWeekDays();
  }

  useEffect(() => {
    setWeekCount(weekCount);
    if(weekCount > 0 || current_Week){
        setWeekDays();        
    }   
    if(weekCount == 0){
        setlastweek("disabled")
    }else{
        setlastweek("")
    }
  },[weekCount])


  useEffect(async () => {
    if(admin_id){
     await axios
        .get(`${configData.SERVER_URL}/admin/schedule/general/get/${admin_id}`)
        .then((resp) => {
          if(resp.data.length > 0){
            setgenOffHours(JSON.parse(resp.data[0].off_hours));
            const startTime = new moment({hour: splitTime(resp.data[0].opening_time, "hour") ,minute: splitTime(resp.data[0].opening_time, "","minutes")});
            const endTime = new moment({hour: splitTime(resp.data[0].closing_time, "hour") ,minute: splitTime(resp.data[0].closing_time, "","minutes")});
            setTimeIntArr(getInterval(startTime,endTime,resp.data[0].appointment_time_interval))  

          }
        });

        await axios.get(`${configData.SERVER_URL}/admin/schedule/special/get/${admin_id}`).then((res) =>{  
            if(res.data.length > 0){   
                res.data.map((item, index) => {
                    if(item.off_hours){
                        setSpclDayArr(s => {
                            return[
                                ...s,
                                {
                                    id : item.id,
                                    day : item.day,
                                    is_dayoff : item.is_dayoff,
                                    opening_time : item.opening_time,
                                    closing_time : item.closing_time,
                                    off_hours : JSON.parse(item.off_hours)
                                }
                            ]
                        })
                    }else{
                        setSpclDayArr(s => {
                            return[
                                ...s,
                                {
                                    id : item.id,
                                    day : item.day,
                                    is_dayoff : item.is_dayoff,
                                    opening_time : item.opening_time,
                                    closing_time : item.closing_time,
                                    off_hours : []
                                }
                            ]
                        })
                    }
                })             
            } 
        })
    }
  }, []); 


  const splitTime = (value, hour = "", minute = "") => {
    var time = String(value)
    let [hours, minutes] = time.split(":");
    if(hour == "hour"){
        return hours
    }else if(minute == "minutes"){
        return minutes
    }else{
        return (hours + ':' + minutes)
    }
  } 

  const getInterval = (startTime, endTime, interval) =>{
    const result = [startTime.toString()];
    let time = startTime.add(interval,'m');
    while(time.isBetween(startTime,endTime,undefined,[])){
        result.push(time.toString());
        time = time.add(interval,'m');
    }
    return result;
  }

  const [selectedDay, setselectedDay] = useState();
  const [selectedDate, setselectedDate] = useState();
  const [selectedStartTime, setselectedStartTime] = useState();
  const [selectedEndTime, setselectedEndTime] = useState();

  const [selectedUser, setSelectedUser] = useState();

  const [booking_id, setBookingId] = useState("");

  const setDayData = (e) => {
    e.preventDefault();
    setselectedDay(e.target.getAttribute("data-day"))
    setselectedDate(e.target.getAttribute("data-date"))
    setselectedStartTime(e.target.getAttribute("data-startTime"))
    setselectedEndTime(e.target.getAttribute("data-endTime"))
    setBooked(e.target.getAttribute("data-isBooked"))
    setSelectedUser(e.target.getAttribute("data-user"))
    setBookingId(e.target.id);

  }
  const [dataUpdated, setDataUpdated] = useState(0)
  const [needRefresh, setRefresh] = useState(false)

  const saveDetails = async() => {
      if(isBooked == "booked"){
        await axios.delete(`${configData.SERVER_URL}/admin/booking/delete/${booking_id}`)
            toast.success(t("booking.Slot set to free"))
            setRefresh(true)
            getBooking();
            // window.location.reload()
            // setTimeout(() => window.location.reload(), 200)
      }else{
        await axios.post(`${configData.SERVER_URL}/admin/booking/add`, {
                selectedDate, selectedDay, admin_id, selectedStartTime, selectedEndTime
            }).then((err,res) => {
                toast.success(t("booking.Slot booked successfully"))
                setDataUpdated(dataUpdated + 1)
                // setTimeout(() => window.location.reload(), 200)
            })
      }
  }

  useEffect(() => {
        getBooking();
        getPatient();
  },[dataUpdated]) 

  useEffect(() => {
    const intervalId = setInterval(async() => {
        getBooking();
        getPatient();
    }, 5000);
    return () => clearInterval(intervalId)
  },[])

  const getBooking = async() => {
    await axios.get(`${configData.SERVER_URL}/admin/booking/get/${admin_id}`).then((res) => {
        if(res.data.length > 0){
            setbookingDet(res.data);
        }
    })
  }


 const dateParsing = (date) =>{
    var parts = date.split("-");
    return new Date(parts[2], parts[1] - 1, parts[0]);
 }

 const timeParsing = (date) =>{
    var parts = date.split(" ");
    parts = parts[4].split(':');
    var time = parts[0] + ':' + parts[1] ;
    return time;
 }

 const checkCurrentTime = (time_start) =>{
    if(timeParsing(Date().toLocaleString()) > time_start)
        return true;
    else
        return false;
 }

  const refrshData = async() => {
    await axios.get(`${configData.SERVER_URL}/admin/booking/get/${admin_id}`).then((res) => {
        setRefresh(false)
        if(res.data.length >= 1){            
            setbookingDet(res.data);
        }else{
            setbookingDet([]);
        }
    })
  }

  const getDDMonthYYYY = (date) => {
    var parts = date.split("-");
    var month = parseInt(parts[1]);
    var fullDate = parts[0] + ' ' + monthArr[month] + ' ' + parts[2];
    return fullDate;
  }

  const getPatient = async() => {
    await axios.get(`${configData.SERVER_URL}/admin/user/get/${admin_id}`).then((res) => {
        if(res.data.length > 0){     
            setUserArr(res.data);       
            // return res.data[0].firstname + " " + res.data[0].surname;
        }
    })
  }

  return (
    <div class="content-wrapper">
        {/* <div className="card"> */}
    {/* <div class="container "> */}
        <Toaster />
        
                
                {/* <div className="form-inline mb-3"> */}
                    
                    
                    {/* <h3 className='text-center'>Bookings</h3> */}
                    {/* <input type="text" className='form-control pro text-center mr-3' value={monday} disabled /> To
                    <input type="text" className='form-control pro text-center ml-3' value={sunday} disabled /> */}
                    <div>
                        <h3 className='float-left mr-3'>{t("booking.Booking")}</h3>
                        <button className='btn btn-primary btn-sm mb-2 ml-2 bg-dark float-right' onClick={nextWeek}>{t("booking.Next")}</button>
                        <button className='btn bg-orange btn-sm mb-2 ml-2 float-right'  onClick={refrshData} hidden={needRefresh? "" : "hidden"}><FiRefreshCcw /> {t("booking.Refresh")}</button>  
                        <button className='btn btn-primary btn-sm mb-2 bg-dark float-right' onClick={lastWeek} disabled={lastweek}>{t("booking.Previous")}</button>     
                    </div>           
                {/* </div> */}
                {/* <div className='text-center mb-2 mt-1'>
                    <button className='btn bg-orange btn-sm mt-2 mb-1'  onClick={refrshData} hidden={needRefresh? "" : "hidden"}>Refresh Table</button> 
                </div> */} 
                
        <div className="card bg-dark  w-100">   
        <div className="spinner-container mx-auto pt-5 pb-5" hidden={spinnerHide}>
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
        <div  classname="content-container" hidden={contentHide}>    
                <div class="timetable-img text-center">
                    <img src="img/content/timetable.png" alt="" />
                </div>
                <div class="table-responsive mb-4">
                    <table class="table table-dark text-center" style={{backgroundColor:"#282f3a"}}>
                        <thead>
                            <tr>
                                <th class="text-uppercase"><h5><b>{t("booking.Time")}</b></h5></th>
                                <th class="text-uppercase"><h5><b>{t("booking.Monday")}</b></h5><br/>({monday})</th>
                                <th class="text-uppercase"><h5><b>{t("booking.Tuesday")}</b></h5><br/>({tuesday})</th>
                                <th class="text-uppercase"><h5><b>{t("booking.Wednesday")}</b></h5><br/>({wednesday})</th>
                                <th class="text-uppercase"><h5><b>{t("booking.Thursday")}</b></h5><br/>({thursday})</th>
                                <th class="text-uppercase"><h5><b>{t("booking.Friday")}</b></h5><br/>({friday})</th>
                                <th class="text-uppercase"><h5><b>{t("booking.Saturday")}</b></h5><br/>({saturday})</th>
                                <th class="text-uppercase"><h5><b>{t("booking.Sunday")}</b></h5><br/>({sunday})</th>
                            </tr>
                        </thead>
                        <tbody>
                            {timeIntArr.map((item, index) => {
                                var time_start = moment(item).format('HH:mm');
                                var time_end = moment(timeIntArr[index+1]).format('HH:mm');


                                var isOff = false                               
                                gen_offHours.map((offhr, offhr_ind) =>{
                                    if(time_start >= offhr.start && time_start <= offhr.end && time_end >= offhr.start && time_end <= offhr.end){
                                        isOff = true
                                    }
                                })

                                

                                var book_time = "";                              
                                var {mon_book_date, tue_book_date, wed_book_date, thur_book_date, fri_book_date, sat_book_date, sun_book_date} = false;
                                var {mon_bookId, tue_bookId, wed_bookId, thur_bookId, fri_bookId, sat_bookId, sun_bookId} = "";
                                var {mon_user, tue_user, wed_user, thur_user, fri_user, sat_user, sun_user} = "";
                                var {mon_isOnline, tue_isOnline, wed_isOnline, thur_isOnline, fri_isOnline, sat_isOnline, sun_isOnline} = 0;
                                bookingDet.map((bookdet, bookind) => {
                                    if(time_start >= bookdet.start_time && time_start <= bookdet.end_time && time_end >= bookdet.start_time && time_end <= bookdet.end_time){
                                            book_time = time_start
                                        if(bookdet.date == monday){
                                            mon_book_date = true  
                                            mon_bookId =  bookdet.id;  
                                            mon_isOnline = bookdet.is_onlinebook;
                                            mon_user = bookdet.patient_id                                                                   
                                        }
                                        if(bookdet.date == tuesday){
                                            tue_book_date = true
                                            tue_bookId =  bookdet.id;  
                                            tue_isOnline = bookdet.is_onlinebook; 
                                            tue_user = bookdet.patient_id;
                                        }
                                        if(bookdet.date == wednesday){
                                            wed_book_date = true
                                            wed_bookId =  bookdet.id;  
                                            wed_isOnline = bookdet.is_onlinebook; 
                                            wed_user = bookdet.patient_id;
                                        }
                                        if(bookdet.date == thursday){
                                            thur_book_date = true
                                            thur_bookId =  bookdet.id; 
                                            thur_isOnline = bookdet.is_onlinebook; 
                                            thur_user = bookdet.patient_id;
                                        }
                                        if(bookdet.date == friday){
                                            fri_book_date = true
                                            fri_bookId =  bookdet.id;  
                                            fri_isOnline = bookdet.is_onlinebook; 
                                            fri_user = bookdet.patient_id;
                                        }
                                        if(bookdet.date == saturday){
                                            sat_book_date = true
                                            sat_bookId =  bookdet.id; 
                                            sat_isOnline = bookdet.is_onlinebook;  
                                            sat_user = bookdet.patient_id;
                                        }
                                        if(bookdet.date == sunday){
                                            sun_book_date = true
                                            sun_bookId =  bookdet.id;  
                                            sun_isOnline = bookdet.is_onlinebook; 
                                            sun_user = bookdet.patient_id;
                                        }
                                    }
                                })

                                var { monOff, tueOff, wedOff, thurOff, friOff, satOff, sunOff } = false
                                //Disable finished day
                                if(dateParsing(todayDate) > dateParsing(monday)){
                                    monOff = true;
                                }if(dateParsing(todayDate) > dateParsing(tuesday)){
                                    tueOff = true;
                                }if(dateParsing(todayDate) > dateParsing(wednesday)){
                                    wedOff = true;
                                }if(dateParsing(todayDate) > dateParsing(thursday)){
                                    thurOff = true;
                                }if(dateParsing(todayDate) > dateParsing(friday)){
                                    friOff = true;
                                }if(dateParsing(todayDate) > dateParsing(saturday)){
                                    satOff = true;
                                }if(dateParsing(todayDate) > dateParsing(sunday)){
                                    sunOff = true;
                                }

                                //Disable finish time
                                if(String(dateParsing(todayDate)) == String(dateParsing(monday))){
                                    monOff = checkCurrentTime(time_start)
                                }else if(String(dateParsing(todayDate)) == String(dateParsing(tuesday))){
                                    tueOff = checkCurrentTime(time_start)
                                }else if(String(dateParsing(todayDate)) == String(dateParsing(wednesday))){
                                    wedOff = checkCurrentTime(time_start)
                                }else if(String(dateParsing(todayDate)) == String(dateParsing(thursday))){
                                    thurOff = checkCurrentTime(time_start)
                                }else if(String(dateParsing(todayDate)) == String(dateParsing(friday))){
                                    friOff = checkCurrentTime(time_start)
                                }else if(String(dateParsing(todayDate)) == String(dateParsing(saturday))){
                                    satOff = checkCurrentTime(time_start)
                                }else if(String(dateParsing(todayDate)) == String(dateParsing(sunday))){
                                    sunOff = checkCurrentTime(time_start)
                                }

                                spcDayArr.map((spclItem, spclIndex) => {
                                    if(spclItem.is_dayoff){
                                        if(spclItem.day == "Monday"){
                                            monOff = true;
                                        }else if(spclItem.day == "Tuesday"){
                                            tueOff = true
                                        }else if(spclItem.day == "Wednesday"){
                                            wedOff = true
                                        }else if(spclItem.day == "Thursday"){
                                            thurOff = true
                                        }else if(spclItem.day == "Friday"){
                                            friOff = true
                                        }else if(spclItem.day == "Saturday"){
                                            satOff = true
                                        }else if(spclItem.day == "Sunday"){
                                            sunOff = true
                                        }
                                    }
                                    if(spclItem.opening_time > time_start || spclItem.closing_time < time_end){
                                        if(spclItem.day == "Monday"){
                                            monOff = true;
                                        }else if(spclItem.day == "Tuesday"){
                                            tueOff = true
                                        }else if(spclItem.day == "Wednesday"){
                                            wedOff = true
                                        }else if(spclItem.day == "Thursday"){
                                            thurOff = true
                                        }else if(spclItem.day == "Friday"){
                                            friOff = true
                                        }else if(spclItem.day == "Saturday"){
                                            satOff = true
                                        }else if(spclItem.day == "Sunday"){
                                            sunOff = true
                                        }
                                    }
                                    spclItem.off_hours.map((spcloffhr, spcloffhr_ind) => {
                                        if(time_start >= spcloffhr.start && time_start <= spcloffhr.end && time_end >= spcloffhr.start && time_end <= spcloffhr.end){
                                            if(spclItem.day == "Monday"){
                                                monOff = true;
                                            }else if(spclItem.day == "Tuesday"){
                                                tueOff = true
                                            }else if(spclItem.day == "Wednesday"){
                                                wedOff = true
                                            }else if(spclItem.day == "Thursday"){
                                                thurOff = true
                                            }else if(spclItem.day == "Friday"){
                                                friOff = true
                                            }else if(spclItem.day == "Saturday"){
                                                satOff = true
                                            }else if(spclItem.day == "Sunday"){
                                                sunOff = true
                                            }
                                        }
                                    })
                                })  


                                if(index + 1 < timeIntArr.length){
                                    return(
                                        <tr>
                                            <td class="align-middle"><b>{time_start} - {time_end}</b></td>
                                            <td className={isOff || monOff ? "slot  bg-offday" : "slot  bg-light-gray"} >
                                                {isOff || monOff ?  <button className='btn btn-sm bg-notavailable box-shadow' disabled>{t("booking.Not Available")}</button> : <button id={mon_bookId} className={mon_book_date  && time_start == book_time? mon_isOnline? 'btn btn-sm bg-lightred box-shadow' : 'btn btn-sm bg-yellow box-shadow' : 'btn btn-sm bg-green box-shadow'} data-user={mon_user}  data-isBooked={mon_book_date && time_start == book_time? 'booked' : ''} data-toggle={isOff || monOff ? "" : "modal"} data-target={mon_isOnline? "#onlineModal" : "#specialModal"} data-date={monday} data-day="Monday"  data-startTime={time_start} data-endTime={time_end} onClick={setDayData}>{mon_book_date && time_start == book_time? mon_isOnline? t("booking.Online Booked") : t("booking.Booked") : t("booking.Available")}</button> } 
                                                {/* <div className={isOff || monOff ? "time-light" : "time-dark"}>{mon_user}</div> */}
                                                {/* <div className={isOff || monOff ? "date-light" : "date-dark"}>({monday})</div> */}
                                            </td> 
                                            <td className={isOff || tueOff ? "slot  bg-offday" : "slot  bg-light-gray"}>
                                                {isOff || tueOff ?  <button className='btn btn-sm bg-notavailable box-shadow' disabled>{t("booking.Not Available")}</button> : <button id={tue_bookId} className={tue_book_date && time_start == book_time? tue_isOnline? 'btn btn-sm bg-lightred box-shadow' : 'btn btn-sm bg-yellow box-shadow' : 'btn btn-sm bg-green box-shadow'} data-user={tue_user} data-isBooked={tue_book_date && time_start == book_time? 'booked' : ''} data-toggle={isOff || tueOff ? "" : "modal"} data-target={tue_isOnline? "#onlineModal" : "#specialModal"} data-date={tuesday} data-day="Tuesday"  data-startTime={time_start} data-endTime={time_end} onClick={setDayData}>{tue_book_date && time_start == book_time? tue_isOnline? t("booking.Online Booked") : t("booking.Booked") : t("booking.Available")}</button> }
                                                {/* <div className={isOff || tueOff ? "time-light" : "time-dark"}>{tue_user}</div> */}
                                                {/* <div className={isOff || tueOff ? "date-light" : "date-dark"}>({tuesday})</div> */}
                                            </td>
                                            <td className={isOff || wedOff ? "slot  bg-offday" : "slot  bg-light-gray"}>
                                                {isOff || wedOff ?  <button className='btn btn-sm bg-notavailable box-shadow' disabled>{t("booking.Not Available")}</button> : <button id={wed_bookId} className={wed_book_date && time_start == book_time? wed_isOnline? 'btn btn-sm bg-lightred box-shadow' : 'btn btn-sm bg-yellow box-shadow' : 'btn btn-sm bg-green box-shadow'} data-user={wed_user} data-isBooked={wed_book_date && time_start == book_time? 'booked' : ''} data-toggle={isOff || wedOff ? "" : "modal"} data-target={wed_isOnline? "#onlineModal" : "#specialModal"} data-date={wednesday} data-day="Wednesday"  data-startTime={time_start} data-endTime={time_end} onClick={setDayData}>{wed_book_date && time_start == book_time? wed_isOnline? t("booking.Online Booked") : t("booking.Booked") : t("booking.Available")}</button> }
                                                {/* <div className={isOff || wedOff ? "time-light" : "time-dark"}>{wed_user}</div> */}
                                                {/* <div className={isOff || wedOff ? "date-light" : "date-dark"}>({wednesday})</div> */}
                                            </td>
                                            <td className={isOff || thurOff ? "slot  bg-offday" : "slot  bg-light-gray"}>
                                                {isOff || thurOff ?  <button className='btn btn-sm bg-notavailable box-shadow' disabled>{t("booking.Not Available")}</button> : <button id={thur_bookId} className={thur_book_date && time_start == book_time? thur_isOnline? 'btn btn-sm bg-lightred box-shadow' : 'btn btn-sm bg-yellow box-shadow' : 'btn btn-sm bg-green box-shadow'} data-user={thur_user} data-isBooked={thur_book_date && time_start == book_time? 'booked' : ''} data-toggle={isOff || thurOff ? "" : "modal"} data-target={thur_isOnline? "#onlineModal" : "#specialModal"} data-date={thursday} data-day="Thursday"  data-startTime={time_start} data-endTime={time_end} onClick={setDayData}>{thur_book_date && time_start == book_time? thur_isOnline? t("booking.Online Booked") : t("booking.Booked") : t("booking.Available")}</button>}
                                                {/* <div className={isOff || thurOff ? "time-light" : "time-dark"}>{thur_user}</div> */}
                                                {/* <div className={isOff || thurOff ? "date-light" : "date-dark"}>({thursday})</div> */}
                                                <div ></div>
                                            </td>
                                            <td className={isOff || friOff ? "slot  bg-offday" : "slot  bg-light-gray"}>
                                                {isOff || friOff ?  <button className='btn btn-sm bg-notavailable box-shadow' disabled>{t("booking.Not Available")}</button> : <button id={fri_bookId} className={fri_book_date && time_start == book_time? fri_isOnline? 'btn btn-sm bg-lightred box-shadow' : 'btn btn-sm bg-yellow box-shadow' : 'btn btn-sm bg-green box-shadow'} data-user={fri_user} data-isBooked={fri_book_date && time_start == book_time? 'booked' : ''} data-toggle={isOff || friOff ? "" : "modal"} data-target={fri_isOnline? "#onlineModal" : "#specialModal"} data-date={friday} data-day="Friday"  data-startTime={time_start} data-endTime={time_end} onClick={setDayData}>{fri_book_date && time_start == book_time? fri_isOnline? t("booking.Online Booked") : t("booking.Booked") : t("booking.Available")}</button> }
                                                {/* <div className={isOff || friOff ? "time-light" : "time-dark"}>{fri_user}</div> */}
                                                {/* <div className={isOff || friOff ? "date-light" : "date-dark"}>({friday})</div> */}
                                            </td>
                                            <td className={isOff || satOff ? "slot  bg-offday" : "slot  bg-light-gray"}>
                                                {isOff || satOff ?  <button className='btn btn-sm bg-notavailable box-shadow' disabled>{t("booking.Not Available")}</button> : <button id={sat_bookId} className={sat_book_date && time_start == book_time? sat_isOnline? 'btn btn-sm bg-lightred box-shadow' : 'btn btn-sm bg-yellow box-shadow' : 'btn btn-sm bg-green box-shadow'} data-user={sat_user} data-isBooked={sat_book_date && time_start == book_time? 'booked' : ''} data-toggle={isOff || satOff ? "" : "modal"} data-target={sat_isOnline? "#onlineModal" : "#specialModal"} data-date={saturday} data-day="Saturday"  data-startTime={time_start} data-endTime={time_end} onClick={setDayData}>{sat_book_date && time_start == book_time? sat_isOnline? t("booking.Online Booked") : t("booking.Booked") : t("booking.Available")}</button> }
                                                {/* <div className={isOff || satOff ? "time-light" : "time-dark"}>{sat_user}</div> */}
                                                {/* <div className={isOff || satOff ? "date-light" : "date-dark"}>({saturday})</div> */}
                                            </td>
                                            <td className={isOff || sunOff ? "slot  bg-offday" : "slot  bg-light-gray"}>
                                                {isOff || sunOff ?  <button className='btn btn-sm bg-notavailable box-shadow' disabled>{t("booking.Not Available")}</button> : <button id={sun_bookId} className={sun_book_date && time_start == book_time? sun_isOnline? 'btn btn-sm bg-lightred box-shadow' : 'btn btn-sm bg-yellow box-shadow' : 'btn btn-sm bg-green box-shadow'} data-user={sun_user} data-isBooked={sun_book_date && time_start == book_time? 'booked' : ''} data-toggle={isOff || sunOff ? "" : "modal"} data-target={sun_isOnline? "#onlineModal" : "#specialModal"} data-date={sunday} data-day="Sunday"  data-startTime={time_start} data-endTime={time_end} onClick={setDayData}>{sun_book_date && time_start == book_time? sun_isOnline? t("booking.Online Booked") : t("booking.Booked") : t("booking.Available")}</button> }
                                                {/* {isOff || sunOff ? "" : 
                                                <div>
                                                 <div className="time-dark">{time_start} - {time_end}</div>
                                                 <div className="date-dark">({sunday})</div>
                                                </div>
                                                 } */}
                                                {/* <div className={isOff || sunOff ? "time-light" : "time-dark"}>{sun_user}</div> */}
                                                {/* <div className={isOff || sunOff ? "date-light" : "date-dark"}>({sunday})</div> */}
                                            </td>
                                        </tr>
                                    )
                                }
                            })}
                                                                         
                        </tbody>
                    </table>
                </div>

                {/* Admin Book */}
                <div class="modal fade" id="specialModal" tabindex="-1" role="dialog" aria-labelledby="specialModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header  bg-dark">
                        <h4 class="modal-title text-light" id="specialModalLabel">{t("booking.Booking")}</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        </div>
                        <div class="modal-body">
                            {isBooked?
                            <div> {t("booking.Are you sure to free this slot?")} </div> : 
                            <div> {t("booking.Are you sure to reserve this slot?")}  </div>
                            }
                        </div>
                        <div class="modal-footer">
                        <button type="button" class="btn btn-success btn-sm" id="submit-modal" data-dismiss="modal" onClick={saveDetails}>{t("booking.Yes")}</button>
                        <button type="button" class="btn btn-danger btn-sm" data-dismiss="modal">{t("booking.Cancel")}</button>
                        </div>
                    </div>
                    </div>
                </div>

                {/* Online Book */}
                <div class="modal fade" id="onlineModal" tabindex="-1" role="dialog" aria-labelledby="onlineModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header  bg-dark">
                        <h4 class="modal-title text-light" id="onlineModalLabel">{t("booking.Online Booked")}</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        </div>
                        <div class="modal-body">
                            <div className="form-inline">
                                { userArr.map((userdet, userindex) => {                                           
                                    if(selectedUser == userdet.id){
                                        return(
                                            <div> 
                                                ID : <b>{" " + userdet.id}</b> <br/>
                                                {t("booking.Patient")} : <b>{" " + userdet.firstname + " " + userdet.surname}</b> <br/>
                                                {t("booking.Contact")} : <b>{" " + userdet.contact}</b> <br/>
                                                Email : <b>{" " + userdet.email}</b> <br/>                                                
                                            </div>                                            
                                        )
                                    }
                                }) }
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-warning btn-sm" data-dismiss="modal">{t("booking.Close")}</button>
                        </div>
                    </div>
                    </div>
                </div>


                </div>
            </div>
            {/* </div> */}
        {/* </div> */}
    </div>
  )
}

export default Booking