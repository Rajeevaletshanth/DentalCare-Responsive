import axios from "axios";
import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useCookies } from 'react-cookie';
import DatePicker from "react-datepicker";
import configData from '../config.json';
import { useTranslation } from "react-i18next";
import "react-datepicker/dist/react-datepicker.css";

const Schedule = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['admin-info']);
  const username = cookies["admin-info"].username;
  const admin_id = cookies["admin-info"].id;

  const { t, i18n } = useTranslation();

  const [IsExist, setExist] = useState(false);

  const defaultOpeningTime = "08:30";
  const defaultClosingTime = "22:00";

  const [isValid, setValid] = useState(false);
  const [isValid2, setValid2] = useState(0);
  const [toastErrCount, settoastErrCount] = useState(0)
  const [show, setShow] = useState(false);
  const [letToggle, setToggle] = useState("")

  const [genOpeningTime, setgenOpeningTime] = useState(defaultOpeningTime);
  const [genClosingTime, setgenClosingTime] = useState(defaultClosingTime);
  const [aptTimeSpan, setaptTimeSpan] = useState("30");
  const [note, setNote] = useState('');

  const roundOfTime = (value) => {
    var time = String(value)
    let [hours, minutes] = time.split(":");
    hours = parseInt(hours);
    minutes = parseInt(minutes);

    let rounded = Math.round(minutes / 30) * 30;

    if (rounded == 60) {   
      return getHour(hours + 1) + ":00";
    } else if (rounded == 0) {
      return getHour(hours) + ":00";
    } else {
      return getHour(hours) + ":30";
    }
  };

  const getHour = (hour) => {
    if(hour < 10){
      return "0" + hour;
    }else{
      return hour
    }
  }


  const handleOpeningTime = (e) => {
    setgenOpeningTime(roundOfTime(e.target.value));
  };
  const handleClosingTime = (e) => {
    setgenClosingTime(roundOfTime(e.target.value));
  };

  const handleAptmntTime = (e) => {
    setaptTimeSpan(e.target.value);
  }

  const handleNote = (e) => {
    setNote(e.target.value)
  }
  

  const [arr, setArr] = useState([]);
  const [offHr, setoffHr] = useState([]);
  const [updateArr, setUpdate] = useState(false);
  const [isMaxed, setMaxed] = useState(0);

  const addInput = (e) => {
    e.preventDefault();
    if(isMaxed < 5){
      setMaxed(isMaxed + 1)  
      setArr(s => {
        setoffHr(off => {
          return[
            ...off,{}
          ]
        })
        return [
          ...s,
          {}
        ];
      });
    }else{
      toast.error(t("schedule.Reached maximum"))
    }
  }

  const offHrReset = (e) => {
    e.preventDefault();
    setArr([]);
    setoffHr([]);
    setMaxed(0);
  }

  const handleOffHourStart = (e) => {
    e.preventDefault()
    var id = e.target.id
    var value = e.target.value
    updateOffArrStart(id,value)
    setUpdate(true)
  }

  const handleOffHourEnd = (e) => {
    e.preventDefault()
    var id = e.target.id
    var value = e.target.value
    updateOffArrEnd(id,value)
    setUpdate(true)
  }

  const updateOffArrStart = (id, value) => {
    let temp_state = offHr;
    let temp_element = { ...temp_state[id] };   
    temp_element.start = roundOfTime(value);
    temp_state[id] = temp_element;
    setoffHr( temp_state );
  }

  const updateOffArrEnd = (id, value) => {
    let temp_state = offHr;
    let temp_element = { ...temp_state[id] };
    temp_element.end = roundOfTime(value);
    temp_state[id] = temp_element;
    setoffHr( temp_state );
  }

  useEffect(() => {
    setUpdate(false)
  }, [updateArr])

  //***Special***//
  //--General--\\
  const [initialDays, setInitialDays] = useState(['Select a day','Monday','Tuesday','Wednesday','Thursday','Friday', 'Saturday', 'Sunday']);
  const [italianDays, setItalianDays] = useState(['Seleziona un giorno','Lunedì','Martedì','Mercoledì','Giovedì','Venerdì', 'Sabato', 'Domenica']);
  const [spclday, setspclday] = useState("");
  const [isDayOff,setDayOff] = useState(true);
  const [splOpening,setsplOpening] = useState(defaultOpeningTime);
  const [splClosing,setsplClosing] = useState(defaultClosingTime);
  const [isHidden, setHidden] = useState("");
  const [spclDbData, setspclDbData] = useState([]);


  /////////*********** */

  const handlesplOpening = (e) => {
    setsplOpening(roundOfTime(e.target.value));
  }

  const handlesplClosing = (e) => {
    setsplClosing(roundOfTime(e.target.value));
  }

  const handleSpclDay = (e) => {
    setspclday(e.target.value);
  }

  const handleDayOff = (e) => {
    var val = e.target.value
    setDayOff(val) 
    
    if(val == "true")
      setHidden("hidden");
    else
      setHidden(""); 
  }
  //--End General--\\

  //--Special Off hours--\\
  const [splArr, setSplArr] = useState([]);
  const [sploffHr, setsploffHr] = useState([]);
  const [updatesplArr, setsplUpdate] = useState(false);
  const [isSplMaxed, setSplMaxed] = useState(0);
  const [letEdit, setletEdit] = useState();

  const addSplInput = (e) => {
    e.preventDefault();
    if(isSplMaxed < 5){
      setSplMaxed(isSplMaxed + 1)  
      setSplArr(s => {
        setsploffHr(off => {
          return[
            ...off,{}
          ]
        })
        return [
          ...s,
          {}
        ];
      });
    }else{
      toast.error(t("schedule.Reached maximum"))
    }
  }

  const sploffHrReset = (e) => {
    e.preventDefault();
    setSplArr([]);
    setsploffHr([]);
    setSplMaxed(0);
  }

  const handlesplOffHourStart = (e) => {
    e.preventDefault()
    var id = e.target.id
    var value = e.target.value
    updatesplOffArrStart(id,value)
    setsplUpdate(true)
  }

  const updatesplOffArrStart = (id, value) => {
    let temp_state = sploffHr;
    let temp_element = { ...temp_state[id] };   
    temp_element.start = roundOfTime(value);
    temp_state[id] = temp_element;
    setsploffHr( temp_state );
  }

  const handlesplOffHourEnd = (e) => {
    e.preventDefault()
    var id = e.target.id
    var value = e.target.value
    updatesplOffArrEnd(id,value)
    setsplUpdate(true)
  }

  const updatesplOffArrEnd = (id, value) => {
    let temp_state = sploffHr;
    let temp_element = { ...temp_state[id] };
    temp_element.end = roundOfTime(value);
    temp_state[id] = temp_element;
    setsploffHr( temp_state );
  }

  useEffect(() => {
    setsplUpdate(false)
  }, [updatesplArr])

  
   
  const preventClick = (e) => {
    e.preventDefault();
    setspclday("Select a day");
    setDayOff(false)
    setsplOpening(defaultOpeningTime);
    setsplClosing(defaultClosingTime);
    setSplArr([]);
    setsploffHr([]);
    setsplUpdate(false);
    setSplMaxed(0);
    setToggle("");
    setletEdit();
  }

  const loadSpcl = (e) => {
    e.preventDefault();
      setletEdit(e.target.getAttribute('data-scheduleid'))
      if(spclDbData[e.target.id].is_dayoff){
        setspclday(spclDbData[e.target.id].day)
        setDayOff(true);
        setHidden("hidden")
      }else{
        setsplOpening(spclDbData[e.target.id].opening_time);
        setsplClosing(spclDbData[e.target.id].closing_time);
        setspclday(spclDbData[e.target.id].day)
        const spcloffHourArr = JSON.parse(spclDbData[e.target.id].off_hours)
        setsploffHr(spcloffHourArr);
        setSplArr(spcloffHourArr);   
        setsplUpdate(false);
        setSplMaxed(isSplMaxed + spcloffHourArr.length);
        setDayOff(false);
        setHidden("")
      }

  }

  //--End Special Off hours--\\
  
  const addSpecial = (e) => {
    sploffHr.splice(isSplMaxed, isSplMaxed);  
    var isSpclError = false;  
    if(spclday == "Select a day" || spclday ==  "" || spclday == null){
      toast.error(t("schedule.You need to choose the day!"));
      isSpclError = true;
    }
    if(spclDbData.length > 0){
      if(!e.target.getAttribute('data-setUpdate')){
        spclDbData.map((item) =>{
          if(item.day == spclday){
            toast.error(t("schedule.You've already scheduled for ") + spclday);
            isSpclError = true;
          }        
        })
      }
    }

    if(!isDayOff){
      if(splOpening >= splClosing){
        toast.error(t("schedule.Time Conflict ..!!!") + t("schedule.Closing time is earlier than or same as Opening Time!"));
        isSpclError = true;
      }else{      
        for(var i = 0; i < sploffHr.length; i++){       
          var startTime = sploffHr[i].start;
          var endTime = sploffHr[i].end;
          if (startTime >= endTime){
            toast.error(t("schedule.Time Conflict ..!!!") + t("schedule.End time is earlier than or same as Start Time!") );
            isSpclError = true;
            break;
          }else if(!startTime || !endTime){
            toast.error(t("schedule.Time Conflict ..!!!") +  t("schedule.Off hours cannot be empty!"));
            isSpclError = true;
            break;
          }else if(splOpening >= startTime ||  startTime > splClosing){
            toast.error(t("schedule.Time Conflict ..!!!") +  t("schedule.Off hours are not permitted to fall outside of working hours.!"));
            isSpclError = true;
            break;
          }else if(splOpening >= endTime ||  endTime > splClosing){
            toast.error(t("schedule.Time Conflict ..!!!") +  t("schedule.Off hours are not permitted to fall outside of working hours.!"));
            isSpclError = true;
            break;
          }
          for(var j = 0; j < sploffHr.length; j++){
            if(i != j){
              if(startTime >= sploffHr[j].start && startTime <= sploffHr[j].end){
                toast.error(t("schedule.Time Conflict ..!!!") +  t("schedule.Off hours are clashing with each other!"));
                isSpclError = true;
                break;
              }else if(endTime >= sploffHr[j].start && endTime <= sploffHr[j].end){
                toast.error(t("schedule.Time Conflict ..!!!") +  t("schedule.Off hours are clashing with each other!"));
                isSpclError = true;
                break;
              }
            }
          }
          if(isSpclError){
            break;
          }         
        }     
      }
    }
    if(!isSpclError){
        setToggle("modal")
        if(e.target.getAttribute("data-setUpdate")){
          updateSpecialSchedule(e.target.getAttribute("data-setUpdate"))
        }else{
          addSpecialSchedule()
        }        
    }
  }

  const updateSpecialSchedule = (update_id) => {
    var isDAYOFF = 0;
    var spcloffHour = "";
    if(isDayOff == "true"){
      setsplOpening("");
      setsplClosing("");
      setsploffHr([]);
      isDAYOFF = 1
    }else{
      var spcloffHour = JSON.stringify(sploffHr);
    }
   axios.put(`${configData.SERVER_URL}/admin/schedule/special/update`,{
        spclday, splOpening, splClosing, spcloffHour, isDAYOFF, admin_id, update_id
      }).then((res) => {
        // console.log(res)
        window.location.reload();
        getSpecialSchedule();
      })
      setspclday('');
      setDayOff(false)
      setsplOpening(defaultOpeningTime);
      setsplClosing(defaultClosingTime);
      setSplArr([]);
      setsploffHr([]);
      setsplUpdate(false);
      setSplMaxed(0);
      setHidden("");
}

  const addSpecialSchedule = () => {
      var isDAYOFF = 0;
      var spcloffHour = "";
      if(isDayOff == "true"){
        console.log(isDayOff);
        setsplOpening("");
        setsplClosing("");
        setsploffHr([]);
        isDAYOFF = 1
      }else{
        spcloffHour = JSON.stringify(sploffHr);
      }
     axios.post(`${configData.SERVER_URL}/admin/schedule/special/add`,{
          spclday, splOpening, splClosing, spcloffHour, isDAYOFF, admin_id
        }).then((res) => {
          // console.log(res)
          window.location.reload();
          getSpecialSchedule();
        })
        setspclday('');
        setDayOff(false)
        setsplOpening(defaultOpeningTime);
        setsplClosing(defaultClosingTime);
        setSplArr([]);
        setsploffHr([]);
        setsplUpdate(false);
        setSplMaxed(0);
        setHidden("");
  }

  //Delete Special
  const deleteSpcl = (e) => {
    axios.delete(`${configData.SERVER_URL}/admin/schedule/special/delete/${e.target.id}/${admin_id}`).then((res) => {
      toast.success(t("shedule.Successfully Deleted"));
      setTimeout(() => { getSpecialSchedule()},500)
    })
  }

  
  //***End Special***//


  const handleAPI = (e) => {
    e.preventDefault();
    offHr.splice(isMaxed, isMaxed);   
    if(genOpeningTime >= genClosingTime){
      toast.error(t("schedule.Time Conflict ..!!!") + t("schedule.Closing time is earlier than or same as Opening Time!"));
    }else{  
      var isError = false; 
      for(var i = 0; i < offHr.length; i++){       
        var startTime = offHr[i].start;
        var endTime = offHr[i].end;
        if (startTime >= endTime){
          toast.error(t("schedule.Time Conflict ..!!!") + t("schedule.End time is earlier than or same as Start Time!"));
          isError = true;
          break;
        }else if(!startTime || !endTime){
          toast.error(t("schedule.Time Conflict ..!!!") + t("schedule.Off hours cannot be empty!"));
          isError = true;
          break;
        }else if(genOpeningTime > startTime ||  startTime > genClosingTime){
          toast.error(t("schedule.Time Conflict ..!!!") + t("schedule.Off hours are not permitted to fall outside of working hours.!"));
          isError = true;
          break;
        }else if(genOpeningTime >= endTime ||  endTime > genClosingTime){
          toast.error(t("schedule.Time Conflict ..!!!") + t("schedule.Off hours are not permitted to fall outside of working hours.!"));
          isError = true;
          break;
        }
        for(var j = 0; j < offHr.length; j++){
          if(i != j){
            if(startTime > offHr[j].start && startTime <= offHr[j].end){
              toast.error(t("schedule.Time Conflict ..!!!") + t("schedule.Off hours are clashing with each other!"));
              isError = true;
              break;
            }else if(endTime >= offHr[j].start && endTime <= offHr[j].end){
              toast.error(t("schedule.Time Conflict ..!!!") + t("schedule.Off hours are clashing with each other!"));
              isError = true;
              break;
            }
          }
        }
        if(isError){
          break;
        }         
      }
      if(!isError){
        if(!IsExist)
          addNewSchedule();
        else
          updateSchedule();
      }
    }
  }


  const addNewSchedule = () => {
    const temp = JSON.stringify(offHr);
      axios.post(`${configData.SERVER_URL}/admin/schedule/general/add/`, {
        genOpeningTime, genClosingTime, temp, aptTimeSpan, note, admin_id
      }).then((res) => {
        toast.success(t("schedule.Schedule saved successfully"))
      })
  }

  const updateSchedule = async () => {
      const temp = JSON.stringify(offHr);
      await axios.put(`${configData.SERVER_URL}/admin/schedule/general/update/${admin_id}`, {
        genOpeningTime, genClosingTime, temp, aptTimeSpan, note 
      }).then((res) => {
        toast.success(t("schedule.Schedule updated successfully"))
      })
  }

  //Get stored data
  useEffect(async() => {
    if(admin_id){
      await axios
        .get(`${configData.SERVER_URL}/admin/schedule/general/get/${admin_id}`)
        .then((resp) => {
          if(resp.data.length > 0){
            setExist(true);
            setgenOpeningTime(resp.data[0].opening_time)
            setgenClosingTime(resp.data[0].closing_time)
            setaptTimeSpan(resp.data[0].appointment_time_interval);
            setNote(resp.data[0].note);
            const offHourArr = JSON.parse(resp.data[0].off_hours)
            setoffHr(offHourArr);
            setArr(offHourArr);
            setMaxed(isMaxed + offHourArr.length) 
          }
        });

        getSpecialSchedule();
    }
  }, []);

  const getSpecialSchedule = async() => {
    await axios.get(`${configData.SERVER_URL}/admin/schedule/special/get/${admin_id}`).then((res) =>{         
      setspclDbData(res.data)
    })
  }




  return (
    <div class="content-wrapper">
      <Toaster />
      <div class="card">
      <h3 class="card-title mb-0 ml-4 mt-4">{t("schedule.Schedule")}</h3>
      <div class="row">
        <div class="col-12 grid-margin stretch-card">         
            <div class="card-body">           
            <div id="accordion">
              <div class="card">
                <div class="card-header" id="headingOne"  data-toggle="collapse" data-target="#generalSchedule" aria-expanded="true" aria-controls="generalSchedule" style={{cursor: "pointer"}}>
                  <h5>{t("schedule.General Schedule")}</h5>
                </div>

                <div id="generalSchedule" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                  <div class="card-body">
                    <div className="row">
                      <div className="col">
                      <h5>{t("schedule.Opening Hours")}</h5>
                          <div class="form-group form-inline ml-4 mt-4 mr-4">
                            <label className="mr-2" for="gen_opening_hr">{t("schedule.Opening Time")} </label>              
                            <input type="time" class="form-control pro ml-3" id="gen_opening_hr" onChange={handleOpeningTime} value={genOpeningTime} />
                          </div>
                          <div class="form-group form-inline  ml-4 mr-4">
                            <label className="mr-2" for="gen_closing_hr">{t("schedule.Closing Time")} </label>
                            <input type="time" class="form-control pro ml-4" id="gen_closing_hr" onChange={handleClosingTime} value={genClosingTime} />
                          </div>
                      </div>

                      <div className="col">
                      <h5>{t("schedule.Off Hours")}</h5>
                      
                        <form class="form-inline">
                          <button className="btn btn-primary btn-sm  mr-3" onClick={addInput}> + {t("schedule.Add Off Hours")} </button>
                          <button className="btn btn-danger btn-sm " onClick={offHrReset}> {t("schedule.Reset")} </button>
                        </form>
                        {arr.map((item, index) => {
                          return(
                            
                              <form class="form-inline  mb-3 ml-3 mt-3">
                                <div class="form-group">
                                  <label className="mr-2" for="offhr_start">{t("schedule.Starts")} </label>
                                  <input type="time" className="form-control pro" id={index} value={offHr[index].start} onChange={handleOffHourStart}/>
                                </div>
                                <div class="form-group ml-4">
                                  <label className="mr-2" for="offhr_end">{t("schedule.Ends")} </label>
                                  <input type="time" className="form-control pro" id={index} value={offHr[index].end} onChange={handleOffHourEnd}/>
                                </div>
                              </form>
                            
                          )
                        })}
                        </div>
                    </div>

                  </div>
                </div>
              </div>
              </div>
              <div id="accordion">
              <div class="card">
                <div class="card-header" id="headingTwo"  data-toggle="collapse" data-target="#daySchedule" aria-expanded="false" aria-controls="daySchedule" style={{cursor: "pointer"}}>
                  <div className="form-inline">
                    <h5 class="mb-0"  style={{padding: "0px"}} >{t("schedule.Day Schedule")} </h5> 
                    <button className="btn btn-dark btn-sm ml-5"  style={{padding: "3px", paddingLeft: "10px", paddingRight: "10px"}} data-toggle="modal" onClick={preventClick} data-target="#specialModal"> + {t("schedule.Add")} </button>
                  </div>
                </div>

                <div id="daySchedule" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                  <div class="card-body">                                                     
                    <p>({t("schedule.This will overwrite your general schedule")}.)</p>
                    {/* <button className="btn btn-primary btn-sm mr-3" data-toggle="modal" onClick={preventClick} data-target="#specialModal"> + Add Day Schedule </button> */}
                    <div className="row ml-3">
                    {spclDbData.map((item, index) => {
                      return(                   
                        <div class="card shadow rounded-0 mt-3 ml-2">
                          <div class="card-header bg-dark text-white">
                          {item.day == "Monday"? italianDays[1]:
                          item.day == "Tuesday"? italianDays[2]:
                          item.day == "Wednesday"? italianDays[3]:
                          item.day == "Thursday"? italianDays[4]:
                          item.day == "Friday"? italianDays[5]:
                          item.day == "Saturday"? italianDays[6]:
                          italianDays[7]}
                          </div>
                          <div class="card-body"> 
                            {/* <h5 class="card-title">{item.day}</h5> */}
                            <p class="card-text">{item.is_dayoff? 
                              <p class="card-text"> {t("schedule.Off Day")} <br/><br/> </p>
                              : 
                              <p class="card-text">{t("schedule.Opens")} : {item.opening_time} <br/> {t("schedule.Closes")} : {item.closing_time}</p>
                              } </p>
                            <button className="btn btn-danger btn-sm float-right text-light ml-2" id={item.id} onClick={deleteSpcl} >{t("schedule.Delete")}</button> 
                            <button className="btn btn-success btn-sm float-right text-light mb-1" id={index} data-scheduleid={item.id} onClick={loadSpcl} data-toggle="modal" data-target="#specialModal">{t("schedule.Edit")}</button>
                          </div>
                        </div>       
                      )
                    })}
                    </div>
                  </div>
                </div>
              </div>
              
            </div>

              {/* <h3>Schedule</h3> */}
                  <form class="forms-sample  mt-4">
                    {/* <h5>Opening Hours</h5>
                    <form class="form-inline mb-3 ml-3">
                      <div class="form-group">
                        <label className="mr-2" for="gen_opening_hr">Opening Time </label>              
                        <input type="time" class="form-control pro" id="gen_opening_hr" onChange={handleOpeningTime} value={genOpeningTime} />
                      </div>
                      <div class="form-group ml-4">
                        <label className="mr-2" for="gen_closing_hr">Closing Time </label>
                        <input type="time" class="form-control pro" id="gen_closing_hr" onChange={handleClosingTime} value={genClosingTime} />
                      </div>
                    </form>
                    <form class="form-inline">
                      <button className="btn btn-primary btn-sm mt-3 mr-3" onClick={addInput}> + Add Off Hours </button>
                      <button className="btn btn-danger btn-sm mt-3" onClick={offHrReset}> Reset </button>
                    </form>
                    {arr.map((item, index) => {
                      return(
                        <form class="form-inline  mb-3 ml-3 mt-3">
                          <div class="form-group">
                            <label className="mr-2" for="offhr_start">Starts </label>
                            <input type="time" className="form-control pro" id={index} value={offHr[index].start} onChange={handleOffHourStart}/>
                          </div>
                          <div class="form-group ml-4">
                            <label className="mr-2" for="offhr_end">Ends </label>
                            <input type="time" className="form-control pro" id={index} value={offHr[index].end} onChange={handleOffHourEnd}/>
                          </div>
                        </form>
                      )
                    })}


                    <div className="form-inline">
                      <h4 class="card-title mt-3">Day Schedule</h4>
                      <button className="btn btn-primary btn-sm mr-3 ml-5" data-toggle="modal" onClick={preventClick} data-target="#specialModal"> + Add Day Schedule </button>                                 
                    </div>
                    <p>(Note: This will overwrite your general schedule.)</p>
                    <div className="row ml-3">
                    {spclDbData.map((item, index) => {
                      return(                   
                        <div class="card mt-3 ml-2" style={{width:"16rem", height:"12rem"}}>
                          <div class={item.is_dayoff? "card-header bg-danger text-white" : "card-header bg-success text-white"}>                       
                            <h5 className="mt-0 mb-0">{item.is_dayoff? 
                              <p class="card-text"> Off Day </p>
                              : 
                              <p class="card-text">Working Day</p>
                              }</h5>
                          </div>
                          <div class="card-body"> 
                            <h5 class="card-title">{item.day}</h5>
                            <p class="card-text">{item.is_dayoff? 
                              <p class="card-text"> Off Day <br/><br/> </p>
                              : 
                              <p class="card-text">Opens : {item.opening_time} <br/> Closes : {item.closing_time}</p>
                              } </p>
                            <button className="btn btn-danger btn-sm float-right text-light ml-2" id={item.id} onClick={deleteSpcl} >Delete</button> 
                            <button className="btn btn-success btn-sm float-right text-light mb-1" id={index} data-scheduleid={item.id} onClick={loadSpcl} data-toggle="modal" data-target="#specialModal">Edit</button>
                          </div>
                        </div>       
                      )
                    })}
                    </div> */}
                    <div class="form-group mt-5">
                        <h5>{t("schedule.Appointment Time Interval")} </h5>
                        <select className="form-control" id="appointment_timespan" value={aptTimeSpan} onChange={handleAptmntTime}>
                          <option value="15"> 15 {t("schedule.minutes")} </option>
                          <option value="30"> 30 {t("schedule.minutes")} </option>
                          <option value="45"> 45 {t("schedule.minutes")} </option>
                          <option value="60"> 1 {t("schedule.hour")} </option>
                        </select>
                    </div>

                    <div class="form-group mt-3">
                        <h5>{t("schedule.Special Note")} </h5>
                        <textarea  class="form-control" onChange={handleNote} value={note}/>
                    </div>
                    <button type="submit" className="btn btn-primary float-right" onClick={handleAPI}> {IsExist ? t("schedule.Update") : t("schedule.Save")}</button>
                  </form>
            </div>
          </div>
        </div>
      </div>

      {/* Special Days */}
      <div class="modal fade" id="specialModal" tabindex="-1" role="dialog" aria-labelledby="specialModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header  bg-dark">
              <h4 class="modal-title text-light" id="specialModalLabel">{t("schedule.Special Schedule")} </h4>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form>
                <div className="row">
                  <div class="col">
                    <label for="day" class="col-form-label"> {t("schedule.Select Day")} </label>
                    <select className="form-control pro" id="day" value={spclday} onChange={handleSpclDay}>
                      {initialDays.map((item,index) => {return(
                        <option value={item}>{italianDays[index]}</option>
                      )})}                   
                    </select>
                  </div>
                  <div class="col">
                    <label for="recipient-name" class="col-form-label"> {t("schedule.Day Off")} </label>
                    <select className="form-control pro" id="day" value={isDayOff} onChange={handleDayOff}>
                        <option value={false}>{t("schedule.No")}</option>   
                        <option value={true}>{t("schedule.Yes")}</option>              
                    </select>
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <label for="message-text" className="col-form-label" hidden={isHidden}>{t("schedule.Opening Time")} </label>
                    <input type="time" className="form-control pro" value={splOpening} onChange={handlesplOpening} hidden={isHidden}/>
                  </div>
                  <div className="col">
                    <label for="message-text" className="col-form-label" hidden={isHidden}>{t("schedule.Closing Time")} </label>
                    <input type="time" className="form-control pro" value={splClosing} onChange={handlesplClosing} hidden={isHidden} />
                  </div>
                </div>
                <form class="form-inline">
                  <button className="btn btn-primary btn-sm mt-3 mr-3" onClick={addSplInput} hidden={isHidden}> + {t("schedule.Add Off Hours")} </button>
                  <button className="btn btn-danger btn-sm mt-3" onClick={sploffHrReset} hidden={isHidden}> {t("schedule.Reset")} </button>
                </form>
                {splArr.map((item, index) => {
                  return(
                  <div className="row" hidden={isHidden}>
                    <div className="col">
                      <label for="message-text" className="col-form-label">{t("schedule.Starts")} </label>
                      <input type="time" className="form-control pro" id={index} value={sploffHr[index].start} onChange={handlesplOffHourStart}/>
                    </div>
                    <div className="col">
                      <label for="message-text" className="col-form-label">{t("schedule.Ends")} </label>
                      <input type="time" className="form-control pro"  id={index} value={sploffHr[index].end} onChange={handlesplOffHourEnd}/>
                    </div>
                  </div>
                )})}
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-success" id="submit-modal" data-dismiss={letToggle} data-setUpdate={letEdit} onClick={addSpecial}>{letEdit? t("schedule.Update") : t("schedule.Add")}</button>
              <button type="button" class="btn btn-danger" data-dismiss="modal">{t("schedule.Cancel")}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
