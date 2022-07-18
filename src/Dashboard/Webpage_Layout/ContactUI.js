import React, { useState, useEffect } from 'react'
import { useTranslation } from "react-i18next";
import toast, { Toaster } from "react-hot-toast";
import { useCookies } from 'react-cookie';
import Dropzone, { useDropzone } from "react-dropzone";
// import "../../css/webpage_layout/homeUI.css"
import '../../css/graphics.css'
import axios from 'axios';
import configData from '../../config.json';
import fileDownload from 'js-file-download';

const ContactUI = () => {
  const { t, i18n } = useTranslation();
  const [file, setFiles] = useState([]);

  const [cookies, setCookie, removeCookie] = useCookies(['admin-info']);
  const username = cookies["admin-info"].username;
  const admin_id = cookies["admin-info"].id;
  
  const themes = [
    {
      path : "../../images/layout/port_6.jpg",
      content : "Theme 1",
      theme_id : "1"
    },
    {
      path : "../../images/layout/MediClinic-Dentist-WordPress-Theme.jpg",
      content : "Theme 2",
      theme_id : "2"
    },
    {
      path : "../../images/layout/MediClinic-Dentist-WordPress-Theme.jpg",
      content : "Theme 3",
      theme_id : "3"
    }
  ]

  const [activeIndex, setActiveIndex] = useState();
  const [isNewLayout, setNewLayout] = useState(true);

  const [email, setEmail] = useState();
  const [pnumber, setPNumber] = useState();
  const [mnumber, setMNumber] = useState();
  const [curAddress, setAddress] = useState();

  const handleTheme = (e) => {
    e.preventDefault();
    // setActiveIndex(e.target.value)
    setActiveIndex(e.target.getAttribute("data-value"))
  }
  const handleAPI = (e) => {
    e.preventDefault();
    if(validateEmail()){
      if(!pnumber){
        toast.error(t("Layout.Phone number cannot be empty"))
      }else if(!curAddress){
        toast.error(t("Layout.Address cannot be empty"))
      }else if(!mnumber){
        toast.error(t("Layout.Mobile number be empty"))
      }else{
        uploadFile()
      }
    }else{
      toast.error(t("Layout.Please enter a valid Email address"))
    }
  }

  const validateEmail = () =>{
    const regex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return !(!email || regex.test(email) === false);
  }

  const uploadFile = () => {
    if(isNewLayout){
      addContactUI();
    }else{
      updateContactUI();
    } 
  }

  const addContactUI = () => {
    var theme_id = "N/A";
    var email_addr = email;
    var phone_no = pnumber;
    var mobile_no = mnumber;
    var address = curAddress;
    if(activeIndex){
      theme_id = activeIndex
    }
    
    axios.post(`${configData.SERVER_URL}/admin/contactui/add`,{
      theme_id, email_addr, phone_no, mobile_no, address, admin_id
    }).then((res) => {
      console.log(res.data)
      toast.success(t("Layout.Layout Added"));
      getContacteUI();
    })
  }

  const updateContactUI = () => {
    var theme_id = "N/A";
    var email_addr = email;
    var phone_no = pnumber;
    var mobile_no = mnumber;
    var address = curAddress;
    if(activeIndex){
      theme_id = activeIndex
    }
    axios.put(`${configData.SERVER_URL}/admin/contactui/update`,{
      theme_id, email_addr, phone_no, mobile_no, address, admin_id
    }).then((res) => {
      toast.success(t("Layout.Layout Updated"));
      getContacteUI();
    })
  }
  
  const getContacteUI = async() => {
    await axios.get(`${configData.SERVER_URL}/admin/contactui/get/${admin_id}`).then((res) => {
      if(res.data.length > 0){
        setNewLayout(false);
        setEmail(res.data[0].email);
        setPNumber(res.data[0].phone_no);
        setMNumber(res.data[0].mobile_no);
        setAddress(res.data[0].address)
        setActiveIndex(res.data[0].theme);
      }      
    })
  }

  useEffect(() => {
    getContacteUI();
  },[])


  return (
    
    <div class="content-wrapper">
    <Toaster />
    <div class="row">
      {/* <h3 class="mt-3 ml-4">{t("Layout.Contact Layout")}</h3> */}
      <div class="col-12 grid-margin stretch-card">
        <div class="card">
        

      <div className='ml-4 mt-4 mr-4'>
      {/* <h4 class="card-title">{t("Layout.Contact Layout")}</h4> */}
      <form>
      <h4 class="card-title">{t("Layout.Contact Details")}</h4>
        <div class="row">
          <div class="col ml-3">
            <label>{t("Layout.Email")} </label>
            <input type="email" class="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t("Layout.Email")}/>
          </div>
          <div class="col ml-3">
            <label> {t("Layout.Phone Number")} </label>
            <input type="number" class="form-control" value={pnumber} onChange={(e) => setPNumber(e.target.value)} placeholder={t("Layout.Phone Number")}/>
          </div>
        </div>
        <div class="row mt-4">
          <div class="col ml-3">
            <label> {t("Layout.Address")} </label>
            <input type="text" class="form-control" value={curAddress} onChange={(e) => setAddress(e.target.value)} placeholder={t("Layout.Address")}/>
          </div>
          <div class="col ml-3">
            <label> {t("Layout.Mobile Number")} </label>
            <input type="number" class="form-control" value={mnumber} onChange={(e) => setMNumber(e.target.value)} placeholder={t("Layout.Mobile Number")}/>
          </div>
        </div>
      


      {/* <h4 class="card-title mt-5 ml-5">{t("Layout.Choose Theme")} :</h4>
        <div class="row row-cols-1 row-cols-md-3 g-4 ml-4 mt-2 mr-4" >
          {themes.map((item, index) => {
            return(
              <div class="col mb-5">
                <div class={activeIndex == index? "card logo-container-active" : "card logo-container" } data-value={index} data-path={item.path} onClick={handleTheme}>
                  <div data-value={index} data-path={item.path} onClick={handleTheme}>
                    <img src={item.path}  class="card-img-top" alt="logos" data-value={index} data-path={item.path} onClick={handleTheme}/>
                  </div>
                </div>
              </div>
              // <div class="col mb-5" >
              //   <div class="card  shadow bg-white " style={{ overflow: "hidden"}}>
              //     <div>
              //       <img src={item.path}  class="card-img-top" alt="..." />
              //     </div>
              //     <div class="card-body" >
              //       <p class="card-title">{item.content}</p>
              //     </div>
              //     <div class="card-footer" style={{background:"inherit;"}}>
              //       <button 
              //       class={activeIndex == index? "btn btn-danger btn-sm active float-right ml-2" : "btn btn-primary btn-sm float-right ml-2"} value={index} data-path={item.path} onClick={handleTheme}>
              //         {activeIndex == index? t("Layout.Selected") : t("Layout.Choose")}
              //       </button>
              //       <label class="btn btn-dark btn-sm float-right"  value={index}>{t("Layout.Preview")}</label>                         
              //     </div>
              //   </div>
              // </div>
            )
          })}                                   
      </div>  */}
   
              
      <button type="submit" class="btn btn-primary float-right mb-4 mt-4" onClick={handleAPI}> {isNewLayout ? t("Layout.Upload") : t("Layout.Update")} </button>
      </form>
      </div>

      
        </div>
      </div>
    </div>
  </div>


                  
    

    
  )
}

export default ContactUI