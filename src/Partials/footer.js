import React from 'react'
import {Link} from 'react-router-dom'
import { MDBFooter } from 'mdb-react-ui-kit';
import { useTranslation } from "react-i18next";
import '../css/footer.css'

const Footer = () => {
  const { t, i18n } = useTranslation();
  return (
    <MDBFooter color="primary"
                className='footer text-center text-lg-left'>
    {/* <footer className="footer" style={{backgroundColor: '#f6fefa'}}> */}
    <div className="d-sm-flex justify-content-center justify-content-sm-between">
      <span className="text-muted text-center text-sm-left d-block d-sm-inline-block">{t("Footer.Copyrights")} © 2022 <a href="https://www.ltwtech.it/" target="_blank">LTW Tech</a>. {t("Footer.All rights reserved")}.</span>
      <span className="float-none float-sm-right d-block mt-1 mt-sm-0 text-center"><a href="https://www.ltwtech.it/" target="_blank">{t("Footer.Developed by LTW TECH")}.</a></span>
    </div>
  {/* </footer> */}
  </MDBFooter>
  );
}

export default Footer;
