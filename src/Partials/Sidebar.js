import React from 'react'
import { useTranslation } from "react-i18next";

import { FiHome, FiLogOut, FiArrowLeftCircle, FiArrowRightCircle, FiTag, FiMail, FiCalendar, FiList, FiUser, FiUsers, FiMonitor, FiLayout } from "react-icons/fi";
import { RiPencilLine, RiGalleryLine, RiShoppingBasketLine, RiTranslate2, RiStickyNoteLine, RiCake3Fill, RiEBike2Fill, RiQuestionLine } from "react-icons/ri";
import { BiCog, BiComment, BiDetail, BiCarousel, BiRestaurant, BiImage, BiCustomize } from "react-icons/bi";
import { FaRegHandshake, FaUserCheck, FaBook, FaPercentage, FaMoneyBillWave, FaBookMedical, FaCalendarCheck, FaBell } from "react-icons/fa";

const Sidebar = () => {
    const { t, i18n } = useTranslation();
  return (
    <nav class="sidebar sidebar-offcanvas" id="sidebar">
                <ul class="nav">
                    <li class="nav-item">
                        <a class="nav-link" href="/admin/dashboard">
                        {/* <i class="icon-home menu-icon"></i> */}
                        <div class="mb-1"><FiHome style={{height:"22px", width: "22px"}}/></div>                       
                        <span class="menu-title ml-2">{t("sidebar.menu.Dashboard")}</span>
                        </a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link" href="/admin/schedule">
                        {/* <i class="icon-time menu-icon"></i> */}
                        <div class="mb-1"><FiCalendar style={{height:"22px", width: "22px"}}/></div>  
                        <span class="menu-title ml-2">{t("sidebar.menu.Schedule")}</span>
                        </a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link" href="/admin/patients">
                        {/* <i class="icon-grid menu-icon"></i> */}
                        <div class="mb-1"><FaBookMedical style={{height:"22px", width: "22px"}}/></div>  
                        <span class="menu-title ml-2">{t("sidebar.menu.Patient")}</span>
                        </a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link" href="/admin/appointments">
                        {/* <i class="icon-grid menu-icon"></i> */}
                        <div class="mb-1"><FaCalendarCheck style={{height:"22px", width: "22px"}}/></div>  
                        <span class="menu-title ml-2">{t("sidebar.menu.Appointment")}</span>
                        </a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link" href="/admin/bookings">
                        {/* <i class="icon-grid menu-icon"></i> */}
                        <div class="mb-1"><FaCalendarCheck style={{height:"22px", width: "22px"}}/></div>  
                        <span class="menu-title ml-2">{t("sidebar.menu.Booking")}</span>
                        </a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link" href="/admin/billings">
                        {/* <i class="mdi-alpha-y-box menu-icon"></i> */}
                        <div class="mb-1"><FaMoneyBillWave style={{height:"22px", width: "22px"}}/></div>  
                        <span class="menu-title ml-2">{t("sidebar.menu.Billings")}</span>
                        </a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link" href="/admin/settings">
                        {/* <i class="icon-grid menu-icon"></i> */}
                        <div class="mb-1"><BiCog style={{height:"22px", width: "22px"}}/></div>  
                        <span class="menu-title ml-2">{t("sidebar.menu.Settings")}</span>
                        </a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link" data-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
                        {/* <i class="icon-layout menu-icon"></i> */}
                        <div class="mb-1"><FiLayout style={{height:"22px", width: "22px"}}/></div>  
                        <span class="menu-title ml-2">{t("sidebar.menu.Layout.Layout")}</span>
                        <i class="menu-arrow"></i>
                        </a>
                        <div class="collapse" id="ui-basic">
                            <ul class="nav flex-column sub-menu">
                                <li class="nav-item"> <a class="nav-link" href="/admin/layouts/home">{t("sidebar.menu.Layout.Home")}</a></li>
                                <li class="nav-item"> <a class="nav-link" href="/admin/layouts/team">{t("sidebar.menu.Layout.About Us")}</a></li>
                                <li class="nav-item"> <a class="nav-link" href="/admin/layouts/aboutus">{t("sidebar.menu.Layout.Team")}</a></li>                               
                                <li class="nav-item"> <a class="nav-link" href="/admin/layouts/services">{t("sidebar.menu.Layout.Services")}</a></li>
                                <li class="nav-item"> <a class="nav-link" href="/admin/layouts/contact">{t("sidebar.menu.Layout.Contact")}</a></li>
                                {/* <li class="nav-item"> <a class="nav-link" href="/admin/layouts/extra">{t("sidebar.menu.Layout.Extra")}</a></li> */}
                                <li class="nav-item"> <a class="nav-link" href="/admin/layouts/general">{t("sidebar.menu.Layout.General")}</a></li>
                            </ul>
                        </div>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link" data-toggle="collapse" href="#ui-basic2" aria-expanded="false" aria-controls="ui-basic2">
                        {/* <i class="icon-layout menu-icon"></i> */}
                        <div class="mb-1"><BiCustomize style={{height:"22px", width: "22px"}}/></div>  
                        <span class="menu-title ml-2">{t("sidebar.menu.Graphics.Graphics")}</span>
                        <i class="menu-arrow"></i>
                        </a>
                        <div class="collapse" id="ui-basic2">
                        <ul class="nav flex-column sub-menu">
                            <li class="nav-item"> <a class="nav-link" href="/admin/graphics/logo_design">{t("sidebar.menu.Graphics.Logo")}</a></li>
                            <li class="nav-item"> <a class="nav-link" href="/admin/graphics/visiting_card">{t("sidebar.menu.Graphics.Visiting Card")}</a></li>
                            <li class="nav-item"> <a class="nav-link" href="/admin/graphics/a3_flyers">{t("sidebar.menu.Graphics.A3")}</a></li>
                            <li class="nav-item"> <a class="nav-link" href="/admin/graphics/a4_flyers">{t("sidebar.menu.Graphics.A4")}</a></li>
                        </ul>
                        </div>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link" href="/admin/help">
                        {/* <i class="icon-grid menu-icon"></i> */}
                        <div class="mb-1"><BiCog style={{height:"22px", width: "22px"}}/></div>  
                        <span class="menu-title ml-2">{t("sidebar.menu.Help")}</span>
                        </a>
                    </li>
                    {/* <li class="nav-item">
                        <a class="nav-link" data-toggle="collapse" href="#form-elements" aria-expanded="false" aria-controls="form-elements">
                        <i class="icon-columns menu-icon"></i>
                        <span class="menu-title">Form elements</span>
                        <i class="menu-arrow"></i>
                        </a>
                        <div class="collapse" id="form-elements">
                        <ul class="nav flex-column sub-menu">
                            <li class="nav-item"><a class="nav-link" href="pages/forms/basic_elements.html">Basic Elements</a></li>
                        </ul>
                        </div>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" data-toggle="collapse" href="#charts" aria-expanded="false" aria-controls="charts">
                        <i class="icon-bar-graph menu-icon"></i>
                        <span class="menu-title">Charts</span>
                        <i class="menu-arrow"></i>
                        </a>
                        <div class="collapse" id="charts">
                        <ul class="nav flex-column sub-menu">
                            <li class="nav-item"> <a class="nav-link" href="pages/charts/chartjs.html">ChartJs</a></li>
                        </ul>
                        </div>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" data-toggle="collapse" href="#tables" aria-expanded="false" aria-controls="tables">
                        <i class="icon-grid-2 menu-icon"></i>
                        <span class="menu-title">Tables</span>
                        <i class="menu-arrow"></i>
                        </a>
                        <div class="collapse" id="tables">
                        <ul class="nav flex-column sub-menu">
                            <li class="nav-item"> <a class="nav-link" href="pages/tables/basic-table.html">Basic table</a></li>
                        </ul>
                        </div>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" data-toggle="collapse" href="#icons" aria-expanded="false" aria-controls="icons">
                        <i class="icon-contract menu-icon"></i>
                        <span class="menu-title">Icons</span>
                        <i class="menu-arrow"></i>
                        </a>
                        <div class="collapse" id="icons">
                        <ul class="nav flex-column sub-menu">
                            <li class="nav-item"> <a class="nav-link" href="pages/icons/mdi.html">Mdi icons</a></li>
                        </ul>
                        </div>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" data-toggle="collapse" href="#auth" aria-expanded="false" aria-controls="auth">
                        <i class="icon-head menu-icon"></i>
                        <span class="menu-title">User Pages</span>
                        <i class="menu-arrow"></i>
                        </a>
                        <div class="collapse" id="auth">
                        <ul class="nav flex-column sub-menu">
                            <li class="nav-item"> <a class="nav-link" href="pages/samples/login.html"> Login </a></li>
                            <li class="nav-item"> <a class="nav-link" href="pages/samples/register.html"> Register </a></li>
                        </ul>
                        </div>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" data-toggle="collapse" href="#error" aria-expanded="false" aria-controls="error">
                        <i class="icon-ban menu-icon"></i>
                        <span class="menu-title">Error pages</span>
                        <i class="menu-arrow"></i>
                        </a>
                        <div class="collapse" id="error">
                        <ul class="nav flex-column sub-menu">
                            <li class="nav-item"> <a class="nav-link" href="pages/samples/error-404.html"> 404 </a></li>
                            <li class="nav-item"> <a class="nav-link" href="pages/samples/error-500.html"> 500 </a></li>
                        </ul>
                        </div>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="pages/documentation/documentation.html">
                        <i class="icon-paper menu-icon"></i>
                        <span class="menu-title">Documentation</span>
                        </a>
                    </li> */}
                </ul>
            </nav>
  )
}

export default Sidebar