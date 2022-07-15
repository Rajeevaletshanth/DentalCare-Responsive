import React, { useState, useEffect } from "react";
import { US, IT, FR, DE } from 'country-flag-icons/react/3x2';
import { useTranslation } from "react-i18next";

const SkinSettings = () => {
  const { t, i18n } = useTranslation();
  const [region, setRegion] = useState("it");

  useEffect(() => {
    i18n.changeLanguage(region);
  },[region])
  return (
    <div class="theme-setting-wrapper" style={{cursor:"pointer"}}>
      <div id="settings-trigger">
        <i class="ti-settings"></i>
      </div>
      <div id="theme-settings" class="settings-panel">
        <i class="settings-close ti-close"></i>

        <p class="settings-heading">{t("SkinSetting.LANGUAGE")}</p>
        <div className="text-center">
          <div class="btn btn-sm btn-light mr-4 mt-2" onClick={() => setRegion('it')}>
            <IT title="Italy" style={{width:"23px" , height:"19px", pointerEvents: "none"}}/> &nbsp; Italiano
          </div>
          <div class="btn btn-sm btn-light mr-3 mt-2" onClick={() => setRegion('en')}>
            <US title="English" style={{width:"23px" , height:"19px", pointerEvents: "none"}}/> &nbsp; English
          </div>
          <div class="btn btn-sm btn-light mr-3 mt-2  mb-2" onClick={() => setRegion('fr')}>
            <FR title="France" style={{width:"23px" , height:"19px", pointerEvents: "none"}}/> &nbsp; Francese
          </div>
          <div class="btn btn-sm btn-light mr-3 mt-2 mb-2" onClick={() => setRegion('de')}>
            <DE title="German" style={{width:"23px" , height:"19px", pointerEvents: "none"}}/> &nbsp; Tedesco
          </div>
        </div>
          {/* <div class="sidebar-bg-options selected" id="sidebar-light-theme" onClick={() => setRegion('it')}>
            <IT title="Italy" style={{width:"23px" , height:"19px", pointerEvents: "none"}}/> &nbsp; Italiano
          </div>
          <div class="sidebar-bg-options" id="sidebar-light-theme" onClick={() => setRegion('en')}>
            <US title="United States" style={{width:"23px" , height:"19px", pointerEvents: "none"}}/> &nbsp; English
          </div> */}
          {/* <a class="sidebar-bg-options" value="it" onClick={() => setRegion('it')}><IT title="Italy" style={{width:"23px" , height:"19px", pointerEvents: "none"}}/> &nbsp; Italiana </a>
          <a class="sidebar-bg-options" value="en" onClick={() => setRegion('en')}><US title="United States" style={{width:"23px" , height:"19px", pointerEvents: "none"}}/> &nbsp; English </a>
          <a class="sidebar-bg-options" value="fr" onClick={() => setRegion('fr')}><FR title="France" style={{width:"23px" , height:"19px", pointerEvents: "none"}} disabled/> &nbsp; Français </a>
          <a class="sidebar-bg-options" value="de" onClick={() => setRegion('de')}><DE title="Germany" style={{width:"23px" , height:"19px", pointerEvents: "none"}} disabled/> &nbsp; Deutsch </a>                       */}


        <p class="settings-heading">{t("SkinSetting.SIDEBAR")}</p>
        <div class="sidebar-bg-options selected" id="sidebar-light-theme">
          <div class="img-ss rounded-circle bg-light border mr-3"></div>{t("SkinSetting.Light")}
        </div>
        <div class="sidebar-bg-options" id="sidebar-dark-theme">
          <div class="img-ss rounded-circle bg-dark border mr-3"></div>{t("SkinSetting.Dark")}
        </div>

        <p class="settings-heading mt-2">{t("SkinSetting.HEADER")}</p>
        <div class="color-tiles mx-0 px-4">
          <div class="tiles success"></div>
          <div class="tiles warning"></div>
          <div class="tiles danger"></div>
          <div class="tiles info"></div>
          <div class="tiles dark"></div>
          <div class="tiles default"></div>
        </div>

      </div>
    </div>
  );
};

export default SkinSettings;
