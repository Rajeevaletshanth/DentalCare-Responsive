

  import React from 'react'
  import {Route, Switch} from 'react-router-dom';
  import 'material-icons/iconfont/material-icons.css';
  import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
  import 'react-pro-sidebar/dist/css/styles.css';
  import { useHistory } from "react-router-dom";
  
//   import './css/main.css'

import Sidebar from './Partials/Sidebar';
import SkinSettings from './Partials/SkinSettings';
import Footer from './Partials/footer';
  
  import Header from './Partials/Header'
  import Dashboard from './Dashboard/dashboard'
  import Protected from './Dashboard/protected';
  import Notfound from './Dashboard/notFound';
  
  import Schedule from './Dashboard/schedule';
  import Billings from './Dashboard/billings';
  import Patient from './Dashboard/patient';
  import Appointment from './Dashboard/appointment';
  import Booking from './Dashboard/booking';
  import Settings from './Dashboard/settings';
  import Webpage_setting from './Dashboard/webpage_setting';
  import Help from './Dashboard/help';
  
  //Webpage_Layouts
  import HomeUI from './Dashboard/Webpage_Layout/HomeUI';
  import AboutUsUI from './Dashboard/Webpage_Layout/AboutUsUI';
  import TeamUI from './Dashboard/Webpage_Layout/TeamUI';
  import ServicesUI from './Dashboard/Webpage_Layout/ServicesUI';
  import ContactUI from './Dashboard/Webpage_Layout/ContactUI';
  import ExtraUI from './Dashboard/Webpage_Layout/ExtraUI';
  import GeneralUI from './Dashboard/Webpage_Layout/GeneralUI';
  
  //Graphics
  import LogoDesign from './Dashboard/Graphics/LogoDesign';
  import VisitingCardDesign from './Dashboard/Graphics/VisitingCardDesign';
  import A3FlyerDesign from './Dashboard/Graphics/A3FlyerDesign';
  import A4FlyerDesign from './Dashboard/Graphics/A4FlyerDesign';
  
  const Root = () => {
    return (
        <div class="container-scroller">
        <Header />
        <div class="container-fluid page-body-wrapper" style={{paddingTop:"40px"}}>
            <SkinSettings />  
            <Sidebar />    
            <div class="main-panel">
                {/* <div class="content-wrapper"> */}
                <Switch>
                    <Route exact path="/admin/dashboard"><Protected Cmp={Dashboard}/></Route>  
                    <Route exact path="/admin/schedule"><Protected Cmp={Schedule}/></Route>  
                    <Route exact path="/admin/patients"><Protected Cmp={Patient}/></Route>
                    <Route exact path="/admin/appointments"><Protected Cmp={Appointment}/></Route>  
                    <Route exact path="/admin/billings"><Protected Cmp={Billings}/></Route> 
                    <Route exact path="/admin/bookings"><Protected Cmp={Booking}/></Route>  
                    <Route exact path="/admin/settings"><Protected Cmp={Settings}/></Route>      
                    <Route exact path="/admin/help"><Protected Cmp={Help}/></Route>             
        
                    {/* Webpage_Layouts */}
                    <Route exact path="/admin/layouts/home"><Protected Cmp={HomeUI}/></Route>
                    <Route exact path="/admin/layouts/aboutus"><Protected Cmp={AboutUsUI}/></Route>
                    <Route exact path="/admin/layouts/team"><Protected Cmp={TeamUI}/></Route>
                    <Route exact path="/admin/layouts/services"><Protected Cmp={ServicesUI}/></Route>
                    <Route exact path="/admin/layouts/contact"><Protected Cmp={ContactUI}/></Route>
                    {/* <Route exact path="/admin/layouts/extra"><Protected Cmp={ExtraUI}/></Route> */}
                    <Route exact path="/admin/layouts/general"><Protected Cmp={GeneralUI}/></Route>
        
                    {/* Graphics */}
                    <Route exact path="/admin/graphics/logo_design"><Protected Cmp={LogoDesign}/></Route>
                    <Route exact path="/admin/graphics/visiting_card"><Protected Cmp={VisitingCardDesign}/></Route>
                    <Route exact path="/admin/graphics/a3_flyers"><Protected Cmp={A3FlyerDesign}/></Route>
                    <Route exact path="/admin/graphics/a4_flyers"><Protected Cmp={A4FlyerDesign}/></Route>
        
                    <Route component={Notfound} />    
                </Switch> 
                {/* </div>                 */}
            <Footer />
            </div>
        </div>
        </div>
    );
  }
  
  export default Root;
  