import React from 'react'
import { useTranslation } from "react-i18next";

const Sidebar = () => {
    const { t, i18n } = useTranslation();
  return (
    <nav class="sidebar sidebar-offcanvas" id="sidebar">
                <ul class="nav">
                    <li class="nav-item">
                        <a class="nav-link" href="/admin/dashboard">
                        <i class="icon-grid menu-icon"></i>
                        <span class="menu-title">{t("sidebar.menu.Dashboard")}</span>
                        </a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link" href="/admin/schedule">
                        <i class="icon-grid menu-icon"></i>
                        <span class="menu-title">{t("sidebar.menu.Schedule")}</span>
                        </a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link" href="/admin/patients">
                        <i class="icon-grid menu-icon"></i>
                        <span class="menu-title">{t("sidebar.menu.Patient")}</span>
                        </a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link" href="/admin/appointments">
                        <i class="icon-grid menu-icon"></i>
                        <span class="menu-title">{t("sidebar.menu.Appointment")}</span>
                        </a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link" href="/admin/bookings">
                        <i class="icon-grid menu-icon"></i>
                        <span class="menu-title">{t("sidebar.menu.Booking")}</span>
                        </a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link" href="/admin/billings">
                        <i class="icon-grid menu-icon"></i>
                        <span class="menu-title">{t("sidebar.menu.Billings")}</span>
                        </a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link" href="/admin/settings">
                        <i class="icon-grid menu-icon"></i>
                        <span class="menu-title">{t("sidebar.menu.Settings")}</span>
                        </a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link" data-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
                        <i class="icon-layout menu-icon"></i>
                        <span class="menu-title">UI Elements</span>
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
                        <i class="icon-layout menu-icon"></i>
                        <span class="menu-title">UI Elements</span>
                        <i class="menu-arrow"></i>
                        </a>
                        <div class="collapse" id="ui-basic2">
                        <ul class="nav flex-column sub-menu">
                            <li class="nav-item"> <a class="nav-link" href="pages/ui-features/buttons.html">Buttons</a></li>
                            <li class="nav-item"> <a class="nav-link" href="pages/ui-features/dropdowns.html">Dropdowns</a></li>
                            <li class="nav-item"> <a class="nav-link" href="pages/ui-features/typography.html">Typography</a></li>
                        </ul>
                        </div>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link" href="/admin/help">
                        <i class="icon-grid menu-icon"></i>
                        <span class="menu-title">{t("sidebar.menu.Help")}</span>
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