import React, { useState } from 'react'
import { useTranslation } from "react-i18next";
import toast, { Toaster } from "react-hot-toast";

const Webpage_setting = () => {

  const { t, i18n } = useTranslation();

  const [homeTheme, setHomeTheme] = useState("none");

  const handleHomeTheme = (e) => {
    setHomeTheme(e.target.value);
  };


  return (
    // <div class="content-wrapper">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-body">
              <Toaster />

              {/* <div className="row mt-2 ml-3">
                <div class="col-sm-2">
                  <h3 class="shadow-lg p-3 bg-body rounded bg-primary text-white text-center"  style={{maxHeight: "55px"}}> {t("webpage_setting.nav_title.Home")} </h3>
                  <h3 class="shadow-lg p-3 bg-body rounded bg-primary text-white text-center"  style={{maxHeight: "55px"}}> {t("webpage_setting.nav_title.About Us")} </h3>
                  <h3 class="shadow-lg p-3 bg-body rounded bg-primary text-white text-center"  style={{maxHeight: "55px"}}> {t("webpage_setting.nav_title.Team")} </h3>
                  <h3 class="shadow-lg p-3 bg-body rounded bg-primary text-white text-center"  style={{maxHeight: "55px"}}> {t("webpage_setting.nav_title.Services")} </h3>
                  <h3 class="shadow-lg p-3 bg-body rounded bg-primary text-white text-center"  style={{maxHeight: "55px"}}> {t("webpage_setting.nav_title.Contact")} </h3>
                  <h3 class="shadow-lg p-3 bg-body rounded bg-primary text-white text-center"  style={{maxHeight: "55px"}}> {t("webpage_setting.nav_title.Extra")} </h3>
                  <h3 class="shadow-lg p-3 bg-body rounded bg-primary text-white text-center"  style={{maxHeight: "55px"}}> {t("webpage_setting.nav_title.General")} </h3>
                </div> */}


                <div class="col shadow-lg p-3 mb-5 bg-body rounded ml-3" style={{width: "98%"}}>
                    {/* <label class={activeIndex == index? "btn radio-btn-selected" : "btn radio-btn"} id={index} onClick={handleClick}>item</label> */}
                  <h4 class="mt-4 ml-3">{t("webpage_setting.home.Choose Theme")} :</h4>
                  <div class="row row-cols-1 row-cols-md-4 g-4">
                    <div class="col mx-auto">
                      <div class="card border border-5 border-dark rounded-0">
                        <img src="../../images/404notfound.png" class="card-img-top" alt="..."/>
                        <div class="card-body">
                        <label class="btn btn-dark btn-sm float-right" >{t("webpage_setting.home.Live Preview")}</label>
                          <label class={homeTheme == "none"? "btn btn-success btn-sm" : "btn btn-light btn-sm"} value="none" onClick={handleHomeTheme}>{t("webpage_setting.home.Choose Theme")}</label>
                        </div>
                      </div>
                    </div>
                  </div>


                </div>
              {/* </div> */}
            </div>
           </div>
        </div>
      </div>
    // </div>
    
  )
}

export default Webpage_setting