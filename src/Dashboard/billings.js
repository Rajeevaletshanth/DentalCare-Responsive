import React, { useState, useEffect } from 'react'
import configData from '../config.json';
import { useTranslation } from "react-i18next";
import toast, { Toaster } from "react-hot-toast";
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';
import axios from 'axios';
import { useCookies } from 'react-cookie';


const Billings = () => {
    const { t, i18n } = useTranslation();
    const handleLang = (lang) => {
        i18n.changeLanguage(lang);

    } 

    const stripeTestPromise = loadStripe(configData.STRIPE_PUBLIC)

    const [cookies, setCookie, removeCookie] = useCookies(['admin-info']);
    const username = cookies["admin-info"].username;
    const admin_id = cookies["admin-info"].id;

    const [business_name, setBusiness_name] = useState();
    const [address, setAddress] = useState();
    const [tel_no, setTel_No] = useState();
    const [vat_no, setVat_No] = useState();
    const [unique_code, setUniqueCode] = useState();

    const [isAdded, setAdded] = useState(false);

    useEffect(() => {
      getInvoice();
    },[])

    const handleInvoice = async(e) => {
      e.preventDefault();
      if(!business_name){
        toast.error("Business name field cannot be empty!")
      }else if(!address){
        toast.error("Address field cannot be empty!")
      }else if(!tel_no){
        toast.error("Telephone Number field cannot be empty!")
      }else if(!vat_no){
        toast.error("VAT Number field cannot be empty!")
      }else if(!unique_code){
        toast.error("Unique Code field cannot be empty!")
      }else{
        if(isAdded)
          updateInvoice();
        else
          addInvoice()
      }
    }

    const getInvoice = async() => {
      await axios.get(`${configData.SERVER_URL}/admin/getInvoice/${admin_id}`).then((res) => {
        if(res.data.length > 0){
          setAdded(true)
          setBusiness_name(res.data[0].business_name);
          setAddress(res.data[0].address);
          setTel_No(res.data[0].tel_no);
          setVat_No(res.data[0].vat_no);
          setUniqueCode(res.data[0].unique_code);
        }
      })
    }

    const addInvoice = async() => {
      await axios.post(`${configData.SERVER_URL}/admin/addInvoice`, {
        business_name, address, tel_no, vat_no, unique_code, admin_id
      }).then((res) => {
        if(res.data.success){
          toast.success("Invoice details saved.")
        }
      })
    }

    const updateInvoice = async() => {
      await axios.put(`${configData.SERVER_URL}/admin/updateInvoice`, {
        business_name, address, tel_no, vat_no, unique_code, admin_id
      }).then((res) => {
        if(res.data.success){
          toast.success("Invoice details updated.")
        }
      })
    }



  return (
    <div className="content-wrapper">
    <div className="card card-custom" style={{padding :"40px"}}>
    <Toaster />
    <h5 class="mt-2"><strong>{t("Billings.title")}</strong></h5> <br></br>
        <div class="col">
	<div class=" mb-5">
      <form class="forms-sample">

          <div class="control-group ">
            <label class="control-label"  for="username">{t("Billings.Name_input")}</label>
            <div class="controls">
              <input type="text" id="businessname" name="businessname" class="form-control" value={business_name} onChange={(e) => setBusiness_name(e.target.value)}/>
            </div>
          </div>

          <div class=" control-group ">
            <label class="control-label " for="address">{t("Billings.Address_input")}</label>
            <div class="controls">
              <input type="text" id="address" name="address" class="form-control" value={address} onChange={(e) => setAddress(e.target.value)}/>
            </div>
          </div>
     
         
          <div class="control-group ">
            <label class="control-label"  for="tpnumber">{t("Billings.tpNumber_input")}</label>
            <div class="controls">
              <input type="number" id="tpnumber" name="tpnumber" class="form-control" value={tel_no} onChange={(e) => setTel_No(e.target.value)}/>
            </div>
          </div>

          <div class="control-group ">
            <label class="control-label"  for="vatnumber">{t("Billings.vatNumber_input")}</label>
            <div class="controls">
              <input type="number" id="vatnumber" name="vatnumber" class="form-control" value={vat_no} onChange={(e) => setVat_No(e.target.value)}/>
            </div>
          </div>

          <div class="control-group ">
            <label class="control-label"  for="uniquecode">{t("Billings.uCode")}</label>
            <div class="controls">
              <input type="number" id="uniquecode" name="uniquecode" class="form-control" value={unique_code} onChange={(e) => setUniqueCode(e.target.value)}/>
            </div>
          </div>

          <button type="submit" class="btn btn-primary float-right mt-3" onClick={handleInvoice}> {t("Billings.Save")} </button>
      </form>
      
    </div>
</div>
        <p class="text-muted text-center">{t("Billings.title2")}</p>
        <div class="row">
            {/* <div className="col-md-6 grid-margin stretch-card">
                <div className="card card-custom mr-3 ">
                    <div  className="card-body">
                    <p className="card-title d-flex justify-content-center mt-1">{t("Billings.BankTransfer")}</p>
                    <p className="font-weight-500 d-flex justify-content-center mt-5"  style={{fontSize: "1rem"}}>
                    {t("Billings.benificiary_data")} <br></br>
                    {t("Billings.Bank")}- UNICREDIT <br></br>
                    {t("Billings.Bank_Address")} - VIA LORENZO DELLEANI, 25 13900 BIELLA, ITALIA <br></br>
                    {t("Billings.benificiary")} - LTW TECHNOLOGIES SRLS <br></br>
                    IBAN - IT05N0200822310000104844825 <br></br>
                    BIC/SWIFT - UNCRITM1CD1
                    </p>

                    </div>
                </div>

                <div className="card card-custom ml-3">
                    <div  className="card-body">
                    <p className="card-title d-flex justify-content-center mt-1 mb-5">{t("Billings.Cardpayment")}</p>
                        <Elements stripe={stripeTestPromise}>
                            <PaymentForm/>
                        </Elements>
                    </div>
                </div>
            </div> */}

            <div class="col-md-6 grid-margin stretch-card">
              <div class="card border">
                <div class="card-body">
                  <p class="card-title mb-4 mt-3 text-center">{t("Billings.BankTransfer")}</p>
                  <p className="font-weight-500 justify-content-center mt-5"  style={{fontSize: "1rem"}}>
                    {t("Billings.benificiary_data")} <br></br>
                    {t("Billings.Bank")}- UNICREDIT <br></br>
                    {t("Billings.Bank_Address")} - VIA LORENZO DELLEANI, 25 13900 BIELLA, ITALIA <br></br>
                    {t("Billings.benificiary")} - LTW TECHNOLOGIES SRLS <br></br>
                    IBAN - IT05N0200822310000104844825 <br></br>
                    BIC/SWIFT - UNCRITM1CD1
                    </p>
                </div>
              </div>
            </div>
            <div class="col-md-6 grid-margin stretch-card">
              <div class="card border">
                <div class="card-body">
                  <p class="card-title mb-4 mt-3 text-center">{t("Billings.Cardpayment")}</p>
                    <Elements stripe={stripeTestPromise}>
                        <PaymentForm/>
                    </Elements>
                </div>
              </div>
            </div>

        </div>
        </div>
    </div>
  )
}

export default Billings