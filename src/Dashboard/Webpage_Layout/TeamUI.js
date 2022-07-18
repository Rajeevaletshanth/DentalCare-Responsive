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

const TeamUI = () => {
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

  //Add members
  const [arr, setArr] = useState([]);
  const [memberdet, setmemberdet] = useState([]);
  const [updateArr, setUpdate] = useState(false);

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
          addTeamUI(res.data.filename);
        }else{
          updateTeamUI(res.data.filename);
        }        
      })
    }else{
      toast(t("Layout.No custom theme uploaded!"))
      if(isNewLayout){
        addTeamUI();
      }else{
        updateTeamUI();
      } 
    }
  }

  const addTeamUI = (images = "") => {
    var team_member = JSON.stringify(memberdet);
    var team_theme = "N/A";
    if(activeIndex){
      team_theme = activeIndex
    }
    
    axios.post(`${configData.SERVER_URL}/admin/teamui/add`,{
      team_theme, team_member, images, admin_id
    }).then((res) => {
      console.log(res.data)
      toast.success(t("Layout.Layout Added"));
      getTeamUI();
    })
  }

  const updateTeamUI = (images = "") => {
    var team_member = JSON.stringify(memberdet);
    var team_theme = "N/A";
    if(activeIndex){
      team_theme = activeIndex
    }
    axios.put(`${configData.SERVER_URL}/admin/teamui/update`,{
      team_theme, team_member, images, admin_id
    }).then((res) => {
      console.log(res.data)
      toast.success(t("Layout.Layout Updated"));
      getTeamUI();
    })
  }
  
  const getTeamUI = async() => {
    await axios.get(`${configData.SERVER_URL}/admin/teamui/get/${admin_id}`).then((res) => {
      if(res.data.length > 0){
        setNewLayout(false);
        setActiveIndex(res.data[0].theme);
        const memberArr = JSON.parse(res.data[0].team_member)
        setmemberdet(memberArr);
        setArr(memberArr);
        if(res.data[0].team_member_photos){
          setUploadedFile(res.data[0].team_member_photos);
            axios({
              url : `${configData.SERVER_URL}/admin/download/${res.data[0].team_member_photos}`,
              method : "GET",
              responseType : "blob"
            }).then((res) => {
              var blobfile = new File([res.data], "Team_Members")
              setFiles([blobfile])
            })            
        }
      }      
    })
  }

  useEffect(() => {
    getTeamUI();
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

  const addInput = (e) => {
    e.preventDefault();
    setArr(s => {
      setmemberdet(item => {
          return[
            ...item,{}
          ]
        })
        return [
          ...s,
          {}
        ];
    });
  }
  const memberReset = (e) => {
    e.preventDefault();
    setArr([]);
    setmemberdet([]);
  }

  const handleMember = (e) => {
    e.preventDefault()
    var id = e.target.id
    var value = e.target.value
    updateMember(id,value)
    setUpdate(true)
  }

  const handleWorkType = (e) => {
    e.preventDefault()
    var id = e.target.id
    var value = e.target.value
    updateWorktype(id,value)
    setUpdate(true)
  }

  const updateMember = (id, value) => {
    let temp_state = memberdet;
    let temp_element = { ...temp_state[id] };   
    temp_element.name = value;
    temp_state[id] = temp_element;
    setmemberdet( temp_state );
  }

  const updateWorktype = (id, value) => {
    let temp_state = memberdet;
    let temp_element = { ...temp_state[id] };
    temp_element.type = value;
    temp_state[id] = temp_element;
    setmemberdet( temp_state );
  }

  useEffect(() => {
    setUpdate(false)
    console.log(memberdet)
  }, [updateArr])

  return (
    
    <div class="content-wrapper">
    <Toaster />
    <div class="row">
      {/* <h3 class="mt-3 ml-4">{t("Layout.Team Layout")}</h3> */}
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
      <h4 class="card-title">{t("Layout.Team Members")}</h4>
      <form class="form-inline">
        {/* <h5 class="card-title mr-3">{t("Layout.Team Members")}</h5> */}
        <button className="btn btn-primary btn-sm mb-3 mr-3" onClick={addInput}> + {t("Layout.Add Team Member")} </button>
        <button className="btn btn-danger btn-sm mb-3" onClick={memberReset}> {t("Layout.Reset")} </button>
      </form>
        {arr.length == 0 && <label className="ml-4"> {t("Layout.No members added")}! </label>}
        {arr.map((item, index) => {
          return(
            <form class="form-inline  mb-3 ml-3 mt-3">
              <div class="form-group">
                <label className="mr-2">{t("Layout.Member Name")} </label>
                <input type="text" className="form-control pro" id={index} value={memberdet[index].name} onChange={handleMember}/>
              </div>
              <div class="form-group ml-4">
                <label className="mr-2">{t("Layout.Work Type")} </label>
                <input type="text" className="form-control pro" id={index} value={memberdet[index].type} onChange={handleWorkType}/>
              </div>
            </form>
          )
        })}

      <h4 class="card-title mt-5">{t("Layout.Upload Team Images")} ({t("Layout.optional")}) </h4>
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

export default TeamUI