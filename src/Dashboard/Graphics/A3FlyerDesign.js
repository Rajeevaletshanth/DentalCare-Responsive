import React, { useState, useEffect } from 'react'
import { useTranslation } from "react-i18next";
import toast, { Toaster } from "react-hot-toast";
import { useCookies } from 'react-cookie';
import "../../css/webpage_layout/homeUI.css"
import axios from 'axios';
import configData from '../../config.json';


import '../../css/graphics.css'

const A3FlyerDesign = () => {
  const { t, i18n } = useTranslation();

  const [cookies, setCookie, removeCookie] = useCookies(['admin-info']);
  const username = cookies["admin-info"].username;
  const admin_id = cookies["admin-info"].id;
  
  const themes = [
    {
      path : "../../images/graphics/flyers/a3/1.jpg",
      content : "Theme 1",
    },
    {
        path : "../../images/graphics/flyers/a3/2.jpg",
        content : "Theme 2",
    },
    {
        path : "../../images/graphics/flyers/a3/3.jpg",
        content : "Theme 3",
    },
    {
        path : "../../images/graphics/flyers/a3/4.jpg",
        content : "Theme 4",
    },
    {
      path : "../../images/graphics/flyers/a3/5.jpg",
      content : "Theme 5",
    },
    {
        path : "../../images/graphics/flyers/a3/6.jpg",
        content : "Theme 6",
    },
    {
        path : "../../images/graphics/flyers/a3/7.jpg",
        content : "Theme 7",
    },
    {
        path : "../../images/graphics/flyers/a3/8.jpg",
        content : "Theme 8",
    },
    {
      path : "../../images/graphics/flyers/a3/9.jpg",
      content : "Theme 9",
    },
    {
        path : "../../images/graphics/flyers/a3/10.jpg",
        content : "Theme 10",
    }
  ]

  const [activeIndex, setActiveIndex] = useState();
  const [isNewLayout, setNewLayout] = useState(true);

  const [cur_logo,setLogo] = useState();
  const [cur_visiting_card, setVisiting_Card] = useState();
  const [cur_a3_flyer,setA3_flyer] = useState();
  const [cur_a4_flyer,setA4_flyer] = useState();

  const handleTheme = (e) => {
    e.preventDefault();
    setActiveIndex(e.target.getAttribute("data-value"))
  }
  const handleAPI = (e) => {
    e.preventDefault();
    if(!activeIndex){
        toast.error(t("Graphics.Select atleast one design!"))
    }else{
        uploadFile()
    }
  }

  const uploadFile = () => {
    if(isNewLayout){
      addGraphics();
    }else{
      updateGraphics();
    } 
  }

  const addGraphics = () => {
    var logo = cur_logo;
    var visiting_card = cur_visiting_card;
    var a3_flyer = activeIndex;
    var a4_flyer = cur_a4_flyer;
    axios.post(`${configData.SERVER_URL}/admin/graphics/add`,{
        logo, visiting_card, a3_flyer, a4_flyer, admin_id
    }).then((res) => {
      console.log(res.data)
      toast.success(t("Graphics.Layout Added"));
      getGraphics();
    })
  }

  const updateGraphics = () => {
    var logo = cur_logo;
    var visiting_card = cur_visiting_card;
    var a3_flyer = activeIndex;
    var a4_flyer = cur_a4_flyer;
    axios.put(`${configData.SERVER_URL}/admin/graphics/update`,{
        logo, visiting_card, a3_flyer, a4_flyer, admin_id
    }).then((res) => {
      toast.success(t("Graphics.Layout Updated"));
      getGraphics();
    })
  }
  
  const getGraphics = async() => {
    await axios.get(`${configData.SERVER_URL}/admin/graphics/get/${admin_id}`).then((res) => {
      if(res.data.length > 0){
        setNewLayout(false);
        setActiveIndex(res.data[0].a3_flyer);
        setLogo(res.data[0].logo);
        setVisiting_Card(res.data[0].visiting_card);
        setA3_flyer(res.data[0].a3_flyer);
        setA4_flyer(res.data[0].a4_flyer);
      }      
    })
  }

  useEffect(() => {
    getGraphics();
  },[])


  return (
    
    <div class="content-wrapper">
    <Toaster />
    <div class="row">
      {/* <h3 class="mt-3 ml-4">{t("Graphics.A3 Flyers")}</h3> */}
      <div class="col-12 grid-margin stretch-card">
        <div class="card">
        

      <div className='ml-4 mt-4 mr-4'>
      <h4 class="card-title">{t("Graphics.A3 Flyers")}</h4>

      {/* <h4 class="card-title mt-5 ml-5">Choose theme :</h4> */}
        <div class="row row-cols-1 row-cols-md-3 g-4 ml-4 mt-5 mr-4" >
          {themes.map((item, index) => {
            return(
              <div class="col mb-5">
                <div class={activeIndex == index? "logo-container-active" : "logo-container" } data-value={index} data-path={item.path} onClick={handleTheme}>
                  <div data-value={index} data-path={item.path} onClick={handleTheme}>
                    <img src={item.path}  class="card-img-top" alt="logos" data-value={index} data-path={item.path} onClick={handleTheme}/>
                  </div>
                </div>
              </div>
            )
          })}                                   
      </div> 
   
              
      <button type="submit" class="btn btn-primary float-right mb-4 mt-4" onClick={handleAPI}> {t("Graphics.Confirm")} </button>
      </div>

      
        </div>
      </div>
    </div>
  </div>


                  
    

    
  )
}

export default A3FlyerDesign