import React,{ useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";

import { FiHome, FiLogOut, FiArrowLeftCircle, FiArrowRightCircle, FiTag, FiMail, FiCalendar, FiList, FiUser, FiUsers, FiMonitor, FiLayout, FiHelpCircle } from "react-icons/fi";
import { RiPencilLine, RiGalleryLine, RiShoppingBasketLine, RiTranslate2, RiStickyNoteLine, RiCake3Fill, RiEBike2Fill, RiQuestionLine } from "react-icons/ri";
import { BiCog, BiComment, BiDetail, BiCarousel, BiRestaurant, BiImage, BiCustomize, BiCalendarX } from "react-icons/bi";
import { FaRegHandshake, FaUserCheck, FaBook, FaPercentage, FaMoneyBillWave, FaBookMedical, FaCalendarCheck, FaBell } from "react-icons/fa";

const Search = () => {
  const { t, i18n } = useTranslation();
  const [query, setQuery] = useState("");


  const content = [
    {
      content: t("search.Dashboard"),
      breadcrump: t("search.Dashboard"),
      url: "/admin/dashboard",
      icon: <FiHome />
    },
    {
      content: t("search.Schedule"),
      breadcrump: t("search.Schedule"),
      url: "/admin/schedule",
      icon: <FiCalendar />
    },
    {
      content: t("search.Patient"),
      breadcrump: t("search.Patient"),
      url: "/admin/patients",
      icon: <FaBookMedical />
    },
    {
      content: t("search.Appointment"),
      breadcrump: t("search.Appointment"),
      url: "/admin/appointments",
      icon: <FaCalendarCheck />
    },
    {
      content: t("search.Booking"),
      breadcrump: t("search.Booking"),
      url: "/admin/bookings",
      icon: <BiCalendarX />
    },
    {
      content: t("search.Billings"),
      breadcrump: t("search.Billings"),
      url: "/admin/billings",
      icon: <FaMoneyBillWave />
    },
    {
      content: t("search.Settings"),
      breadcrump: t("search.Settings"),
      url: "/admin/settings",
      icon: <BiCog />
    },
    {
      content: t("search.Layout.Layout"),
      breadcrump: t("search.Layout.Layout") + "/" + t("search.Layout.Home"),
      url: "/admin/layouts/home",
      icon: <FiLayout />
    },
    {
      content: t("search.Layout.Home"),
      breadcrump: t("search.Layout.Layout") + "/" + t("search.Layout.Home"),
      url: "/admin/layouts/home",
      icon: <FiLayout />
    },
    {
      content: t("search.Layout.About Us"),
      breadcrump: t("search.Layout.Layout") + "/" + t("search.Layout.About Us"),
      url: "/admin/layouts/aboutus",
      icon: <FiLayout />
    },
    {
      content: t("search.Layout.Team"),
      breadcrump: t("search.Layout.Layout") + "/" + t("search.Layout.Team"),
      url: "/admin/layouts/team",
      icon: <FiLayout />
    },
    {
      content: t("search.Layout.Services"),
      breadcrump: t("search.Layout.Layout") + "/" + t("search.Layout.Services"),
      url: "/admin/layouts/services",
      icon: <FiLayout />
    },
    {
      content: t("search.Layout.Contact"),
      breadcrump: t("search.Layout.Layout") + "/" + t("search.Layout.Contact"),
      url: "/admin/layouts/contact",
      icon: <FiLayout />
    },
    {
      content: t("search.Layout.Extra"),
      breadcrump: t("search.Layout.Layout") + "/" + t("search.Layout.Extra"),
      url: "/admin/layouts/extra",
      icon: <FiLayout />
    },
    {
      content: t("search.Layout.General"),
      breadcrump: t("search.Layout.Layout") + "/" + t("search.Layout.General"),
      url: "/admin/layouts/general",
      icon: <FiLayout />
    },
    {
      content: t("search.Graphics.Graphics"),
      breadcrump: t("search.Graphics.Graphics") + "/" + t("search.Graphics.Logo Designs"),
      url: "/admin/graphics/logo_design",
      icon: <BiCustomize />
    },
    {
      content: t("search.Graphics.Logo Designs"),
      breadcrump: t("search.Graphics.Graphics") + "/" + t("search.Graphics.Logo Designs"),
      url: "/admin/graphics/logo_design",
      icon: <BiCustomize />
    },
    {
      content: t("search.Graphics.Visiting Cards"),
      breadcrump: t("search.Graphics.Graphics") + "/" + t("search.Graphics.Visiting Cards"),
      url: "/admin/graphics/visiting_card",
      icon: <BiCustomize />
    },
    {
      content: t("search.Graphics.A3 Flyers"),
      breadcrump: t("search.Graphics.Graphics") + "/" + t("search.Graphics.A3 Flyers"),
      url: "/admin/graphics/a3_flyers",
      icon: <BiCustomize />
    },
    {
      content: t("search.Graphics.A4 Flyers"),
      breadcrump: t("search.Graphics.Graphics") + "/" + t("search.Graphics.A4 Flyers"),
      url: "/admin/graphics/a4_flyers",
      icon: <BiCustomize />
    },
    {
      content: t("search.Help"),
      breadcrump: t("search.Help"),
      url: "/admin/help",
      icon: <FiHelpCircle />
    },
  ];


  return (
    <li class="nav-item nav-search d-none d-lg-block">
      <div class="input-group">
        <div class="input-group-prepend hover-cursor" id="navbar-search-icon">
          <span class="input-group-text" id="search">
            <i class="icon-search"></i>
          </span>                  
        </div>
        <li class="nav-item nav-profile dropdown">
          <input type="text" class="form-control" placeholder={t("header.search_now")} data-toggle="dropdown" id="searchDropdown" aria-label="search" aria-describedby="search" value={query} onChange={(e) => setQuery(e.target.value)}/>            
          <div class="dropdown-menu dropdown-menu-right navbar-dropdown show" aria-labelledby="searchDropdown" hidden={query != ""? "" : "hidden"}>
            {content.filter((val) => {
              if(query == ""){
                return val;
              }else if(val.content.toLowerCase().includes(query.toLowerCase())){
                return val;
              }
            }).map((val, key) => {                           
              if(key < 5){
                return(
                  <a class="dropdown-item" href={val.url}>
                    {/* <i class="ti-settings text-primary"></i> */}
                    {val.icon}
                    <div className="col ml-3">
                      <div className="row"><p> {val.content}</p></div>
                      {/* <div className="row">
                        <p class="text-muted"> {val.breadcrump}</p>  
                      </div> */}
                    </div>                
                  </a>
                )
              }
            })}
          </div>
        </li>
        <i class="settings-close ti-close mt-3" hidden={query != ""? "" : "hidden"} onClick={() => setQuery("")} style={{cursor: "pointer"}}></i> 
      </div> 
    </li>
  )
}

export default Search