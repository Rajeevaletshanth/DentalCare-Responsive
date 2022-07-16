import React, { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { useSelector } from 'react-redux';
import i18next from "i18next";

const SetRegion = () => {
  useEffect(() => {
    if(localStorage.getItem('lang')){
      i18next.changeLanguage(localStorage.getItem('lang'));   
    }
  },[])
  return (
    <></>
  )
}

export default SetRegion