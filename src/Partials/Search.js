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
      content: t("search.Layout.Layout"),
      breadcrump: t("search.Layout.Layout") + " > " +t("search.Layout.Home"),
      url: "/admin/layout/home",
      icon: <FiLayout />
    }
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
              return(
                <a class="dropdown-item" href={val.url}>
                  {/* <i class="ti-settings text-primary"></i> */}
                  {val.icon}
                  <div className="col ml-3">
                    <div className="row"><p> {val.content}</p></div>
                    <div className="row">
                      <p class="text-muted"> {val.breadcrump}</p>  
                    </div>
                  </div>                
                </a>
              )
            })}
          </div>
        </li>
      </div>
    </li>
  )
}

export default Search