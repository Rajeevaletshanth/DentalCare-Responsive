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

const ServicesUI = () => {
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
  const [uploadedfile, setUploadedFile] = useState();
  const [isNewLayout, setNewLayout] = useState(true);

  const [addedservice, setAddedService] = useState("");
  const [serviceType, setServiceType] = useState([]);

  const handleTheme = (e) => {
    // setActiveIndex(e.target.value)
    setActiveIndex(e.target.getAttribute("data-value"))
  }
  const handleAPI = (e) => {
    e.preventDefault();
    uploadFile()
  }

  const uploadFile = () => {
    if(isNewLayout){
      addServiceUI();
    }else{
      updateServiceUI();
    } 
  }

  const addServiceUI = () => {
    var theme_id = "N/A";
    var service_type = JSON.stringify(serviceType);
    if(activeIndex){
      theme_id = activeIndex
    }
    
    axios.post(`${configData.SERVER_URL}/admin/serviceui/add`,{
      theme_id, service_type, admin_id
    }).then((res) => {
      toast.success(t("Layout.Layout Added"));
      getServiceUI();
    })
  }

  const updateServiceUI = () => {
    var theme_id = "N/A";
    var service_type = JSON.stringify(serviceType);
    if(activeIndex){
      theme_id = activeIndex
    }
    axios.put(`${configData.SERVER_URL}/admin/serviceui/update`,{
      theme_id, service_type, admin_id
    }).then((res) => {
      toast.success(t("Layout.Layout Updated"));
      getServiceUI();
    })
  }
  
  const getServiceUI = async() => {
    await axios.get(`${configData.SERVER_URL}/admin/serviceui/get/${admin_id}`).then((res) => {
      if(res.data.length > 0){
        setNewLayout(false);
        setServiceType(JSON.parse(res.data[0].service_type))
        setActiveIndex(res.data[0].theme);
      }      
    })
  }

  useEffect(() => {
    getServiceUI();
  },[])


  const handleServices = (e) => {
    setAddedService(e.target.value);
  }

  const handleServiceType = (e) => {
    e.preventDefault();
    if(addedservice != ""){
      setServiceType(s => {
        return[
          ...s, addedservice
        ]
      })
    }
    setAddedService("");
  }

  const deleteService = (e) => {
    var tempservarr = [];
    serviceType.map((item, index) => {
      if(e.target.value != index){
        tempservarr.push(item)
      }
    })
    setServiceType(tempservarr)
  }


  return (
    
    <div class="content-wrapper">
    <Toaster />
    <div class="row">
      {/* <h3 class="mt-3 ml-4">{t("Layout.Service Layout")}</h3> */}
      <div class="col-12 grid-margin stretch-card">
        <div class="card">
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

      <div className='ml-4 mt-4 mr-4'>
      {/* <h4 class="card-title">{t("Layout.About Us Layout")}</h4> */}
      <h4 class="card-title">{t("Layout.Service Types")}</h4>
      <h5 class="ml-3 mt-5 mb-3">{t("Layout.New Service")}</h5>
      <form class="form-inline">
        <div class="form-group mx-sm-3 mb-2">
          <label class="sr-only">{t("Layout.New Service")}</label>
          <input type="text" class="form-control" placeholder={t("Layout.Add New Service")} value={addedservice} onChange={handleServices}/>
        </div>
        <button class="btn btn-primary mb-2" onClick={handleServiceType} >{t("Layout.Add")}</button>        
      </form>
      <form class="form-inline">
        {serviceType.map((item, index) => {
            return(
              <span class="bg-light text-dark border p-2 ml-2 mt-2"><span class="ml-2">{item} </span><button type="button" value={index} class="btn btn-close btn-sm btn-close-dark" onClick={deleteService}>x</button></span>
              
              // <p>{item}</p>
            )
        })}
      </form>
    
              
      <button class="btn btn-primary float-right mt-4" onClick={handleAPI}> {isNewLayout ? t("Layout.Upload") : t("Layout.Update")} </button>
      </div>

      
        </div>
      </div>
    </div>
  </div>


                  
    

    
  )
}

export default ServicesUI