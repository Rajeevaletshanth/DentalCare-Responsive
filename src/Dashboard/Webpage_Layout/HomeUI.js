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

const HomeUI = () => {
  const { t, i18n } = useTranslation();
  const [file, setFiles] = useState([]);

  const [cookies, setCookie, removeCookie] = useCookies(['admin-info']);
  const username = cookies["admin-info"].username;
  const admin_id = cookies["admin-info"].id;
  
  const themes = [
    {
      path : "../../images/layout/website/scrollpg1.jpg",
      content : "Theme 1",
      theme_id : "1"
    },
    {
      path : "../../images/layout/website/scrollpg2.jpg",
      content : "Theme 2",
      theme_id : "2"
    },
    {
      path : "../../images/layout/website/scrollpg3.png",
      content : "Theme 3",
      theme_id : "3"
    },
    {
      path : "../../images/layout/website/scrollpg4.jpg",
      content : "Theme 4",
      theme_id : "4"
    },
    {
      path : "../../images/layout/website/scrollpg5.png",
      content : "Theme 5",
      theme_id : "5"
    },
    {
      path : "../../images/layout/website/scrollpg6.jpg",
      content : "Theme 6",
      theme_id : "6"
    },
    {
      path : "../../images/layout/website/scrollpg7.jpg",
      content : "Theme 7",
      theme_id : "7"
    },
    {
      path : "../../images/layout/website/scrollpg8.jpg",
      content : "Theme 8",
      theme_id : "8"
    },
    {
      path : "../../images/layout/website/scrollpg9.jpg",
      content : "Theme 9",
      theme_id : "9"
    },
    {
      path : "../../images/layout/website/scrollpg10.jpg",
      content : "Theme 10",
      theme_id : "10"
    },
    {
      path : "../../images/layout/website/scrollpg11.jpg",
      content : "Theme 11",
      theme_id : "11"
    },
    {
      path : "../../images/layout/website/sample1.jpg",
      content : "Theme 12",
      theme_id : "12"
    },
    {
      path : "../../images/layout/website/sample2.jpg",
      content : "Theme 13",
      theme_id : "13"
    },
    {
      path : "../../images/layout/website/sample3.jpg",
      content : "Theme 14",
      theme_id : "14"
    },
    {
      path : "../../images/layout/website/sample4.jpg",
      content : "Theme 15",
      theme_id : "15"
    },
    {
      path : "../../images/layout/website/sample5.jpg",
      content : "Theme 16",
      theme_id : "16"
    },
  ]

  const [activeIndex, setActiveIndex] = useState();
  const [uploadedfile, setUploadedFile] = useState();
  const [isNewLayout, setNewLayout] = useState(true);

  const handleTheme = (e) => {
    // setActiveIndex(e.target.value)
    setActiveIndex(e.target.getAttribute("data-value"))
  }
  const handleAPI = (e) => {
    e.preventDefault();
    uploadFile()
  }

  const uploadFile = () => {
    if(file.length > 0){
      const formdata = new FormData(); 
      formdata.append('file', file[0]);
      axios.post(`${configData.SERVER_URL}/admin/upload/uploadSingle`, formdata,{
        headers: { "Content-Type": "multipart/form-data" }
      }).then((res) => {
        console.log(res);
        if(isNewLayout){
          addHomeUI(res.data.filename);
        }else{
          updateHomeUI(res.data.filename);
        }        
      })
    }else{
      toast(t("Layout.No custom theme uploaded!"))
      if(isNewLayout){
        addHomeUI();
      }else{
        updateHomeUI();
      } 
    }
  }

  const addHomeUI = (custom_theme = "") => {
    var theme_id = "N/A";
    if(activeIndex){
      theme_id = activeIndex
    }
    
    axios.post(`${configData.SERVER_URL}/admin/homeui/add`,{
      theme_id, custom_theme, admin_id
    }).then((res) => {
      toast.success(t("Layout.Layout Added"));
      getHomeUI();
    })
  }

  const updateHomeUI = (custom_theme = "") => {
    var theme_id = "N/A";
    if(activeIndex){
      theme_id = activeIndex
    }
    axios.put(`${configData.SERVER_URL}/admin/homeui/update`,{
      theme_id, custom_theme, admin_id
    }).then((res) => {
      toast.success(t("Layout.Layout Updated"));
      getHomeUI();
    })
  }
  
  const getHomeUI = async() => {
    await axios.get(`${configData.SERVER_URL}/admin/homeui/get/${admin_id}`).then((res) => {
      if(res.data.length > 0){
        setNewLayout(false);
        setActiveIndex(res.data[0].theme_id);
        if(res.data[0].custom_theme){
          setUploadedFile(res.data[0].custom_theme);
          if(res.data[0].custom_theme){
            axios({
              url : `${configData.SERVER_URL}/admin/download/${res.data[0].custom_theme}`,
              method : "GET",
              responseType : "blob"
            }).then((res) => {
              var blobfile = new File([res.data], "Custom_Theme")
              setFiles([blobfile])
            })   
          }      
        }
      }      
    })
  }

  useEffect(() => {
    getHomeUI();
  },[])

  const downloadFile = async(e) => {
    e.preventDefault();
    axios({
      url : `${configData.SERVER_URL}/admin/download/${e.target.id}`,
      method : "GET",
      responseType : "blob"
    }).then((res) => {
      console.log(res.data.type);
      if(res.data.type == "image/jpeg"){
        fileDownload(res.data, `${username} - Home Layout.jpg`)
      }else if(res.data.type == "image/png"){
        fileDownload(res.data, `${username} - Home Layout.png`)
      }else if(res.data.type == "application/zip"){
        fileDownload(res.data, `${username} - Home Layout.zip`)
      }else{
        fileDownload(res.data, `${username} - Home Layout.jpg`)
      }
    })
  }

  const removeFile = (e) => {
    e.preventDefault();
    setFiles([]);
    setUploadedFile();
  }

  const [file_name , setFile_Name] = useState();

  const handleFiles = (e) => {
    var file = e.target.files[0];
    if(file.type == "image/jpeg" || file.type == "image/png" || file.type == "image/webp" || file.type == "application/x-zip-compressed" ||
      file.type == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || file.type == "application/vnd.openxmlformats-officedocument.wordprocessingml.document"){
        if(file.name.length > 100){
          toast.error(t("Layout.Uploaded file name is too long!"))
        }else{
          setFiles([file])
          setFile_Name(file.name)
        }  
      }else{
        toast.error(t("Layout.Unsupported file!"))
      }
  }

  return (
    
    <div class="content-wrapper">
    <Toaster />
    <div class="row">
      {/* <h3 class="mt-3 ml-4">{t("Layout.Home Layout")}</h3> */}
      <div class="col-12 grid-margin stretch-card">
        <div class="card card-custom">
        {/* <h4 class="card-title mt-5 ml-5">{t("Layout.Choose Theme")} :</h4> */}
        <h4 class="card-title ml-4 mt-4 mr-4">{t("Layout.Home Layout")}</h4>
        <div class="row row-cols-1 row-cols-md-2 g-4 ml-4 mt-2 mr-4" >
          {themes.map((item, index) => {
            return(
              <div class="col mb-5">
                <div class={activeIndex == index? "logo-container-active" : "logo-container" } style={{maxHeight:"500px", overflowY:"scroll", overflowX:"hidden"}} data-value={index} data-path={item.path} onClick={handleTheme}>
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
      </div> 

      <div className='ml-4 mt-4 mr-4'>
      <h4 class="card-title">{t("Layout.Upload custom theme")} ({t("Layout.optional")}) </h4>
      <input type="file" class="form-control" onChange={handleFiles} />

            {file.map((item,index) => {
                return(
                  <div className="card row text-center ml-4 mr-4">
                    <div class="col  mt-4 mb-4">
                      {/* <p class="font-weight-bold">- Uploaded File -</p> */}
                      {/* <img  src={URL.createObjectURL(item)} alt="" style={{maxHeight: "400px", maxWidth: "550px"}}/>  */}
                      <p class="mt-1">{file_name}</p>
                      {/* <a href="" id={uploadedfile} onClick={downloadFile}>{uploadedfile}</a> <br/> */}
                      <a id={uploadedfile}>{uploadedfile}</a> <br/>
                      <button class="btn btn-danger btn-sm mb-2" onClick={removeFile}>{t("Layout.Remove")}</button>
                    </div>
                  </div>
                )
              })}
            
              
              <button class="btn btn-primary float-right mb-4 mt-4" onClick={handleAPI}> {isNewLayout ? t("Layout.Upload") : t("Layout.Update")} </button>
      </div>

      
        </div>
      </div>
    </div>
  </div>


                  
    

    
  )
}

export default HomeUI