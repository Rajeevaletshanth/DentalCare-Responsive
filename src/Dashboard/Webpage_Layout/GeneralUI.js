import React, { useState, useEffect } from 'react'
import { useTranslation } from "react-i18next";
import toast, { Toaster } from "react-hot-toast";
import { useCookies } from 'react-cookie';
import { useDropzone } from "react-dropzone";
// import "../../css/webpage_layout/homeUI.css"
import '../../css/graphics.css'
import axios from 'axios';
import configData from '../../config.json';
import fileDownload from 'js-file-download';
import { SketchPicker } from 'react-color'

const GeneralUI = () => {
  const { t, i18n } = useTranslation();
  const [file, setFiles] = useState([]);


  const [cookies, setCookie, removeCookie] = useCookies(['admin-info']);
  const username = cookies["admin-info"].username;
  const admin_id = cookies["admin-info"].id;

  // const [activeIndex, setActiveIndex] = useState();
  const [uploadedfile, setUploadedFile] = useState();
  const [uploadedLogo, setUploadedLogo] = useState();
  const [uploadedFavicon, setUploadedFavicon] = useState();
  const [isNewLayout, setNewLayout] = useState(true);

  const [webpageName, setWebpageName] = useState();

  const [logo, setLogo] = useState([]);
  const [favicon, setFavicon] = useState([]);

  //Color
  const [primaryColor, setPrimaryColor] = useState("#1364e8");
  const [secondaryColor, setSecondaryColor] = useState("#ce55f2");
  const [tertiaryColor, setTertiaryColor] = useState("#a155f2");
  const [quaterneryColor, setQuaternaryColor] = useState("#ffffff");

  const [showPrimaryColorPicker, setshowPrimaryColorPicker] = useState(false);
  const [showSecondaryColorPicker, setshowSecondaryColorPicker] = useState(false);
  const [showTertiaryColorPicker, setshowTertiaryColorPicker] = useState(false);
  const [showQuaterneryColorPicker, setshowQuaterneryColorPicker] = useState(false);

  const handleAPI = (e) => {
    e.preventDefault();
    console.log(e.target)
    uploadFile()
  }

  const uploadFile = () => {
    if(!webpageName){
      toast.error(t("Layout.Upload your webpage title!"))
    }else if(logo.length == 0){
      toast.error(t("Layout.Upload your webpage logo!"))
    }else if(favicon.length == 0){
      toast.error(t("Layout.Upload your webpage favicon!"))
    }else{
      const formdata = new FormData(); 
        formdata.append('files', logo[0]);
        formdata.append('files', favicon[0]);
      axios.post(`${configData.SERVER_URL}/admin/upload/uploadMultiple`, formdata,{
        headers: { "Content-Type": "multipart/form-data" }
      }).then((res) => {        
        if(isNewLayout){
          addGeneralUI(res.data[0].filename, res.data[1].filename);
        }else{
          updateGeneralUI(res.data[0].filename, res.data[1].filename);
        }        
      })
    }
  }

  const addGeneralUI = (logo = "", favicon = "") => {
    var dental_name = webpageName;
    var theme_color = primaryColor + "-" + secondaryColor + "-" + tertiaryColor + "-" + quaterneryColor;
    
    axios.post(`${configData.SERVER_URL}/admin/generalui/add`,{
      dental_name, logo, favicon,  theme_color, admin_id
    }).then((res) => {
      toast.success(t("Layout.Layout Added"));
      // getGeneralUI();
    })
  }

  const updateGeneralUI = (logo = "", favicon = "") => {
    var dental_name = webpageName;
    var theme_color = primaryColor + "-" + secondaryColor + "-" + tertiaryColor + "-" + quaterneryColor;

    axios.put(`${configData.SERVER_URL}/admin/generalui/update`,{
      dental_name, logo, favicon,  theme_color, admin_id
    }).then((res) => {
      toast.success(t("Layout.Layout Updated"));
      // getGeneralUI();
    })
  }
  
  const getGeneralUI = async() => {
    await axios.get(`${configData.SERVER_URL}/admin/generalui/get/${admin_id}`).then((res) => {
      if(res.data.length > 0){
        setNewLayout(false);
        setWebpageName(res.data[0].dental_name);
        setUploadedLogo(res.data[0].logo);
        setUploadedFavicon(res.data[0].favicon);
        setThemeColor(res.data[0].theme_color)
        if(res.data[0].logo){
          axios({
            url : `${configData.SERVER_URL}/admin/download/${res.data[0].logo}`,
            method : "GET",
            responseType : "blob"
          }).then((res) => {
            var blobfile1 = new File([res.data], "Logo")
            setLogo([blobfile1])
          })
        }
        if(res.data[0].favicon){
          axios({
            url : `${configData.SERVER_URL}/admin/download/${res.data[0].favicon}`,
            method : "GET",
            responseType : "blob"
          }).then((res) => {
            var blobfile2 = new File([res.data], "Favicon")
            setFavicon([blobfile2])
          })
        }
      }      
    })
  }

  useEffect(() => {
    getGeneralUI();
  },[])

  const setThemeColor = (colorcode) => {
    var colors = colorcode.split("-");
    setPrimaryColor(colors[0]);
    setSecondaryColor(colors[1]);
    setTertiaryColor(colors[2]);
    setQuaternaryColor(colors[3]);
  }

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

  const removeLogo = (e) => {
    e.preventDefault();
    setLogo([]);
    setUploadedLogo();
  }

  const removeFavicon = (e) => {
    e.preventDefault();
    setFavicon([]);
    setUploadedFavicon();
  }

  const [logo_name , setLogo_Name] = useState();
  const [favicon_name , setFavicon_Name] = useState();


  const handleLogo = (e) => {
    var file = e.target.files[0];
    console.log(file.type)
    if(file.type == "image/jpeg" || file.type == "image/png" || file.type == "image/webp" || file.type == "application/x-zip-compressed" ||
    file.type == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || file.type == "application/vnd.openxmlformats-officedocument.wordprocessingml.document"){        
      if(file.name.length > 100){
        toast.error(t("Layout.Uploaded file name is too long!"))
      }else{
        setLogo([file])
        setLogo_Name(file.name)
      }
    }else{
      toast.error(t("Layout.Unsupported file!"))
    }
  }


  const handleFavicon = (e) => {
    var file = e.target.files[0];
    console.log(file.type)
    if(file.type == "image/jpeg" || file.type == "image/png" || file.type == "image/webp" || file.type == "application/x-zip-compressed" ||
    file.type == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || file.type == "application/vnd.openxmlformats-officedocument.wordprocessingml.document"){        
      if(file.name.length > 100){
        toast.error(t("Layout.Uploaded file name is too long!"))
      }else{
        setFavicon([file])
        setFavicon_Name(file.name)
      }
    }else{
      toast.error(t("Layout.Unsupported file!"))
    }
  }


  return (
    
    <div class="content-wrapper">
    <Toaster />
    <div class="row">
      {/* <h3 class="mt-3 ml-4">{t("Layout.General Layout")}</h3> */}
      <div class="col-12 grid-margin stretch-card">
        <div class="card">

      <div className='ml-4 mt-4 mr-4'>
        <h4 class="card-title">{t("Layout.General Layout")}</h4>
        <div class="form-group">
          <label  class="font-weight-bold">{t("Layout.Webpage Name")}</label>
          <input type="text" class="form-control" value={webpageName} onChange={e => setWebpageName(e.target.value)} placeholder={t("Layout.Webpage Name")}/>
        </div>
      
        <div className="row">      
          <div className="col" style={{width: "50%"}}>
            <label  class="font-weight-bold">{t("Layout.Upload Logo")} </label>    
            <input type="file" class="form-control" onChange={handleLogo} />
              {logo.map((item,index) => {
                return(
                  <div className="card row text-center  ml-4 mr-4">
                    <div class="col  mt-4 mb-4">
                      {/* <img  src={URL.createObjectURL(item)} alt="" style={{maxHeight: "200px", maxWidth: "350px"}}/>  */}
                      <p class="mt-1">{logo_name}</p>
                      {/* <a href="" id={uploadedLogo} onClick={downloadFile}>{uploadedLogo}</a><br/> */}
                      <a id={uploadedLogo}>{uploadedLogo}</a><br/>
                      <button class="btn btn-danger btn-sm mb-2" onClick={removeLogo}>{t("Layout.Remove")}</button>
                    </div>
                  </div>
                )
              })}  
          </div>
          <div className="col" style={{width: "50%"}}>
            <label class="font-weight-bold">{t("Layout.Upload favicon")} </label>
            <input type="file" class="form-control" onChange={handleFavicon} />
            {favicon.map((item,index) => {
                return(
                  <div className="card row text-center ml-4 mr-4">
                    <div class="col  mt-4 mb-4">
                      {/* <img  src={URL.createObjectURL(item)} alt="" style={{maxHeight: "200px", maxWidth: "350px"}}/>  */}
                      <p class="mt-1">{favicon_name}</p>
                      {/* <a href="" id={uploadedFavicon} onClick={downloadFile}>{uploadedFavicon}</a><br/> */}
                      <a id={uploadedFavicon} >{uploadedFavicon}</a><br/>
                      <button class="btn btn-danger btn-sm mb-2" onClick={removeFavicon}>{t("Layout.Remove")}</button>
                    </div>
                  </div>
                )
              })}
          </div>
        </div>

        <div class="form-group ">
          <label  class="font-weight-bold">{t("Layout.Theme Colors")}</label>
          <div className="row">
            <div className="col">
              <button class="btn btn-light border" onClick={() => setshowPrimaryColorPicker(showPrimaryColorPicker => !showPrimaryColorPicker)}> {t("Layout.Primary")} 
                <button class="btn mb-1 ml-3" style={{paddingRight: "50px",backgroundColor: primaryColor}} />               
              </button>
              {showPrimaryColorPicker && ( <SketchPicker color={primaryColor} onChange={e => setPrimaryColor(e.hex)}/> )}
            </div>
            <div className="col">
              <button class="btn btn-light border" onClick={() => setshowSecondaryColorPicker(showSecondaryColorPicker => !showSecondaryColorPicker)}> {t("Layout.Secondary")} 
                <button class="btn mb-1 ml-3" style={{paddingRight: "50px",backgroundColor: secondaryColor}} />            
              </button>
              {showSecondaryColorPicker && ( <SketchPicker color={secondaryColor} onChange={e => setSecondaryColor(e.hex)}/> )}
            </div>
            <div className="col">
              <button class="btn btn-light border" onClick={() => setshowTertiaryColorPicker(showTertiaryColorPicker => !showTertiaryColorPicker)}> {t("Layout.Tertiary")} 
                <button class="btn mb-1 ml-3" style={{paddingRight: "50px",backgroundColor: tertiaryColor}} />              
              </button>
              {showTertiaryColorPicker && ( <SketchPicker color={tertiaryColor} onChange={e => setTertiaryColor(e.hex)}/> )}
            </div>
            <div className="col">
              <button class="btn btn-light border" onClick={() => setshowQuaterneryColorPicker(showQuaterneryColorPicker => !showQuaterneryColorPicker)}> {t("Layout.Quaternary")} 
                <button class="btn mb-1 ml-3" style={{paddingRight: "50px",backgroundColor: quaterneryColor}} />            
              </button>
              {showQuaterneryColorPicker && ( <SketchPicker color={quaterneryColor} onChange={e => setQuaternaryColor(e.hex)}/> )}
            </div>
          </div>
        </div>

        
              
        <button class="btn btn-primary float-right  mt-4" onClick={handleAPI}> {isNewLayout ? t("Layout.Upload") : t("Layout.Update")} </button>
      </div>

      
        </div>
      </div>
    </div>
  </div>


                  
    

    
  )
}

export default GeneralUI