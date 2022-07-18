import React, { useState, useEffect } from 'react'
import { useTranslation } from "react-i18next";
import toast, { Toaster } from "react-hot-toast";
import { useCookies } from 'react-cookie';
import { useDropzone } from "react-dropzone";
// import "../../css/webpage_layout/homeUI.css"
import axios from 'axios';
import configData from '../../config.json';
import fileDownload from 'js-file-download';
import { SketchPicker } from 'react-color'

import '../../css/graphics.css'

const AboutUsUI = () => {
  const { t, i18n } = useTranslation();
  const [file, setFiles] = useState([]);


  const [cookies, setCookie, removeCookie] = useCookies(['admin-info']);
  const username = cookies["admin-info"].username;
  const admin_id = cookies["admin-info"].id;

  // const [activeIndex, setActiveIndex] = useState();

  const [uploadedContent, setUploadedContent] = useState();
  const [UploadedImage, setUploadedImage] = useState();
  
  const [isNewLayout, setNewLayout] = useState(true);

  const [aboutus_content, setAboutus_content] = useState();

  const [customContent, setcustomContent] = useState([]);
  const [images, setimages] = useState([]);

  const [activeIndex, setActiveIndex] = useState("N/A");
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
  const handleTheme = (e) => {
    // setActiveIndex(e.target.value)
    setActiveIndex(e.target.getAttribute("data-value"))
  }


  const handleAPI = (e) => {
    e.preventDefault();
    uploadFile()
  }

  const uploadFile = () => {
    const formdata = new FormData();
    if(customContent.length > 0)
      formdata.append('files', customContent[0]);
    if(images.length > 0)
      formdata.append('files', images[0]);
    if(customContent.length > 0 || images.length > 0){
      axios.post(`${configData.SERVER_URL}/admin/upload/uploadMultiple`, formdata,{
        headers: { "Content-Type": "multipart/form-data" }
      }).then((res) => { 
        var custom_aboutus_content = "";
        var aboutus_images = "";
        if(customContent.length > 0 && images.length > 0) {
          custom_aboutus_content = res.data[0].filename;
          aboutus_images = res.data[1].filename;
        }else if(customContent.length > 0){
          custom_aboutus_content = res.data[0].filename;
        }else if(images.length > 0){
          aboutus_images = res.data[0].filename;
        }
        if(isNewLayout){
          addAboutUsUI(custom_aboutus_content, aboutus_images);
        }else{
          updateAboutUsUI(custom_aboutus_content, aboutus_images);
        }        
      })
    }else{
      if(isNewLayout){
        addAboutUsUI();
      }else{
        updateAboutUsUI();
      } 
    }
  }

  const addAboutUsUI = (customContent = "", images = "") => {
    if(aboutus_content && aboutus_content.length > 1000){
      toast.error(t("Layout.About Us content length is too long!"))
      return 0;      
    }
    var theme = activeIndex;
    var aboutusContent = aboutus_content;
    var custom_content = customContent;
    var images = images;
    
    axios.post(`${configData.SERVER_URL}/admin/aboutusui/add`,{
      theme, aboutusContent, custom_content,  images, admin_id
    }).then((res) => {
      toast.success(t("Layout.Layout Added"));
      // getGeneralUI();
    })
  }

  const updateAboutUsUI = (customContent = "", images = "") => {
    if(aboutus_content && aboutus_content.length > 1000){
      toast.error(t("Layout.About Us content length is too long!"))
      return 0;      
    }
    var theme = activeIndex;
    var aboutusContent = aboutus_content;
    var custom_content = customContent;
    var images = images;

    axios.put(`${configData.SERVER_URL}/admin/aboutusui/update`,{
      theme, aboutusContent, custom_content,  images, admin_id
    }).then((res) => {
      toast.success(t("Layout.Layout Updated"));
      // getGeneralUI();
    })
  }
  
  const getGeneralUI = async() => {
    await axios.get(`${configData.SERVER_URL}/admin/aboutusui/get/${admin_id}`).then((res) => {
      if(res.data.length > 0){
        setNewLayout(false);
        setActiveIndex(res.data[0].theme);
        setAboutus_content(res.data[0].content)
        setUploadedContent(res.data[0].custom_content);
        setUploadedImage(res.data[0].images);
        if(res.data[0].custom_content){
          axios({
            url : `${configData.SERVER_URL}/admin/download/${res.data[0].custom_content}`,
            method : "GET",
            responseType : "blob"
          }).then((res) => {
            var blobfile1 = new File([res.data], "About_Us_Content")
            setcustomContent([blobfile1])
          })
        }
        if(res.data[0].images){
          axios({
            url : `${configData.SERVER_URL}/admin/download/${res.data[0].images}`,
            method : "GET",
            responseType : "blob"
          }).then((res) => {
            var blobfile2 = new File([res.data], "About_Us_Images")
            setimages([blobfile2])
          })
        }
      }      
    })
  }

  useEffect(() => {
    getGeneralUI();
  },[])


  const downloadFile = async(e) => {
    e.preventDefault();
    downloadAPI(e.target.id)
  }

  const downloadAPI = (targetFile) => {
    axios({
      url : `${configData.SERVER_URL}/admin/download/${targetFile}`,
      method : "GET",
      responseType : "blob"
    }).then((res) => {
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

  const removecustomContent = (e) => {
    e.preventDefault();
    setcustomContent([]);
    setUploadedContent();
  }

  const removeimages = (e) => {
    e.preventDefault();
    setimages([]);
    setUploadedImage();
  }

  const [file_name , setFile_Name] = useState();
  const [customContent_name , setcustomContent_Name] = useState();
  const [images_name , setimages_Name] = useState();

  const [word_count, setWordCount] = useState('0');
  const [lengthvalid, setlengthValid] = useState('form-control')

  const handleAboutUs = (e) => {
    setAboutus_content(e.target.value)
    if(e.target.value.length <= 1000){
      setWordCount(e.target.value.length)
      setlengthValid('form-control is-valid')
    }else{
      setWordCount(e.target.value.length)
      setlengthValid('form-control is-invalid')
    }
  }

  const handleCustomABoutUS = (e) => {
    var file = e.target.files[0];
    if(file.type == "image/jpeg" || file.type == "image/png" || file.type == "image/webp" || file.type == "application/x-zip-compressed" ||
      file.type == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || file.type == "application/vnd.openxmlformats-officedocument.wordprocessingml.document"){
        if(file.name.length > 100){
          toast.error(t("Layout.Uploaded file name is too long!"))
        }else{
          setcustomContent([file])
          setcustomContent_Name(file.name)
        }  
      }else{
        toast.error(t("Layout.Unsupported file!"))
      }
  }

  const handleImages = (e) => {
    var file = e.target.files[0];
    console.log(file.type)
    if(file.type == "image/jpeg" || file.type == "image/png" || file.type == "image/webp" || file.type == "application/x-zip-compressed" ||
    file.type == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || file.type == "application/vnd.openxmlformats-officedocument.wordprocessingml.document"){        
      if(file.name.length > 100){
        toast.error(t("Layout.Uploaded file name is too long!"))
      }else{
        setimages([file])
        setimages_Name(file.name)
      }
    }else{
      toast.error(t("Layout.Unsupported file!"))
    }
  }


  return (
    
    <div class="content-wrapper">
    <Toaster />
    
    <div class="row">
      <h3 class="mt-3 ml-4"></h3>
      <div class="col-12 grid-margin stretch-card">
        <div class="card">

      <div className='ml-4 mt-4 mr-4'>
      <h4 class="card-title">{t("Layout.About Us Layout")}</h4>
      {/* <label  class="font-weight-bold">{t("Layout.Choose Theme")}</label>
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

        <div class="form-group">
          <label  class="font-weight-bold">{t("Layout.About Us")}</label>
          <textarea class={lengthvalid} value={aboutus_content} onChange={handleAboutUs} placeholder="About Us"/>
          <label className="text-muted">{1000 - word_count} {t("Layout.characters left")}.</label>
        </div>
      
        <div className="row">      
          <div className="col" style={{width: "50%"}}>
            <label  class="font-weight-bold">{t("Layout.Upload about us content")} </label>
            <input type="file" class="form-control" onChange={handleCustomABoutUS} />
              {customContent.map((item,index) => {
                return(
                  <div className="card row text-center  ml-4 mr-4">
                    <div class="col  mt-4 mb-4">
                      {/* <img src={URL.createObjectURL(item)} alt="" style={{maxHeight: "200px", maxWidth: "350px"}}/>  */}
                      <p class="mt-1">{customContent_name}</p>
                      {/* <a href="" id={uploadedContent} onClick={downloadFile}>{uploadedContent}</a><br/> */}
                      <a id={uploadedContent} >{uploadedContent}</a><br/>
                      <button class="btn btn-danger btn-sm mb-2" onClick={removecustomContent}>{t("Layout.Remove")}</button>
                    </div>
                  </div>
                )
              })}  
          </div>
          <div className="col" style={{width: "50%"}}>
            <label class="font-weight-bold">{t("Layout.Upload about us images")} ({t("Layout.Zip it and upload")})</label>
            <input type="file" class="form-control" onChange={handleImages} />
            {images.map((item,index) => {
                return(
                  <div className="card row text-center ml-4 mr-4">
                    <div class="col  mt-4 mb-4">
                      {/* <img  src={URL.createObjectURL(item)} alt="" style={{maxHeight: "200px", maxWidth: "350px"}}/>  */}
                      <p class="mt-1">{images_name}</p>
                      {/* <a href="" id={UploadedImage} onClick={downloadFile}>{UploadedImage}</a> <br/> */}
                      <a id={UploadedImage}>{UploadedImage}</a> <br/>
                      <button class="btn btn-danger btn-sm mb-2" onClick={removeimages}>{t("Layout.Remove")}</button>
                    </div>
                  </div>
                )
              })}
          </div>
        </div>

        
              
        <button class="btn btn-primary float-right mb-4 mt-4" onClick={handleAPI}> {isNewLayout ? t("Layout.Upload") : t("Layout.Update")} </button>
      </div>

      
        </div>
      </div>
    </div>
  </div>


                  
    

    
  )
}

export default AboutUsUI