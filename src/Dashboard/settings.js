import React, { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import configData from '../config.json';
import toast, { Toaster } from "react-hot-toast";
import { useTranslation } from "react-i18next";

const Settings = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['admin-info']);
    const admin_id = cookies["admin-info"].id;
    const [username, setUsername] = useState(cookies["admin-info"].username);
    const [email, setEmail] = useState(cookies["admin-info"].email);
    const [base_url, setBase_url] = useState('');
    const [lang, setLang] = useState("en");
    const [note, setNote] = useState();

    const { t, i18n } = useTranslation();

    const [settings, setSettings] = useState([]);

    // const language = ["en", "it", "fr", "de"]
    const language = [
      {
        name : "Inglese",
        abbr : "en"
      },
      {
        name : "Italiano",
        abbr : "it"
      },
      {
        name : "Francese",
        abbr : "fr"
      },
      {
        name : "Tedesco",
        abbr : "de"
      },
    ]

    //password auth
    const [current_password, setCurrent_password] = useState();
    const [new_password, setNew_password] = useState();
    const [reEnter_password, setReEnter_password] = useState();

    const [current_passwordinvalid, setCurrent_passwordinvalid] = useState(false);
    const [new_passwordinvalid, setNew_passwordinvalid] = useState(false);
    const [reEnter_passwordinvalid, setReEnter_passwordinvalid] = useState(false);

    useEffect(() => {
        getSettings();
    },[])

    const handleAPI = (e) => {
        e.preventDefault();
        updateUsername();
    }

    const getSettings = async() => {
        await axios.get(`${configData.SERVER_URL}/admin/settings/get/${admin_id}`).then((res) => {
            if(res.data.length > 0){
                setSettings(res.data)
                setUsername(res.data[0].username);
                setBase_url(res.data[0].base_url);
                setLang(res.data[0].language);
                setNote(res.data[0].note)
            }
        })
    }

    const updateUsername = (e) => {       
        axios.put(`${configData.SERVER_URL}/admin/updateuser/${admin_id}` , {
            username }
        ).then((res) => {
            // console.log(res.data)
        });

        if(settings.length > 0){
            axios.put(`${configData.SERVER_URL}/admin/settings/update/${admin_id}` , {
                username, base_url, lang, note }
            ).then((err,res) => {
                toast.success(t("settings.Settings updated"))
                window.location.reload();
            });
        }else{
            axios.post(`${configData.SERVER_URL}/admin/settings/add`, {
                admin_id, username, base_url, lang, note
            }).then((err,res) => {
                toast.success(t("settings.Settings saved"))
                window.location.reload();
            })
        }
    }

    const handleChangePswd = (e) => {
      e.preventDefault();
      axios.post(`${configData.SERVER_URL}/admin/checkpassword`, {
        email, current_password
      }).then((res) => {

        if(res.data){
          setCurrent_passwordinvalid(false)
          if(new_password != reEnter_password){
            setReEnter_passwordinvalid(true)
            toast.error(t("settings.New and re-entered password is not matching!"))
          }else{
            if(current_password == new_password){
              setReEnter_passwordinvalid(true)
              toast.error(t("settings.Current password and New password is same. Try a different one!"))
            }else{
              changePassword();
              setTimeout(() => window.location.reload(), 1000)
            }           
          }
        }else{
          setCurrent_passwordinvalid(true)
          toast.error(t("settings.Current password is wrong!"))
        }
      })   
    }

    const changePassword = () =>{
      axios.put(`${configData.SERVER_URL}/admin/changenewpassword`, {
        email, new_password
      }).then((res) => {
        toast.success(t("settings.Password changed successfully"))
      })
    }

  return (
    <div class="content-wrapper">
      <div class="row">
        <div class="col-12 grid-margin stretch-card">
          <div class="card">
            <div class="card-body">
            <Toaster />
              <h4 class="card-title">{t("settings.Settings")}</h4>

              <form class="forms-sample">
                <div class="form-group">
                  <label for="username">{t("settings.Username")} / {t("settings.Display Name")}</label>
                  <input type="text" class="form-control" id="username" value={username} required onChange={(e) => {setUsername(e.target.value)}}/>
                </div>

                <div class="form-group">
                  <label for="email">{t("settings.Email")}</label>
                  <input type="text" class="form-control" id="email" disabled  value={email} required />
                </div>

                <div class="form-group">
                  <label for="base_url">{t("settings.Base URL")}</label>
                  <input type="text" class="form-control" id="base_url" required placeholder="http://www.dentalcare.com/" value={base_url} onChange={(e) => {setBase_url(e.target.value)}}/>
                </div>

                <div class="form-group">
                  <label for="language">{t("settings.Language")}</label>
                  <select className="form-control" id="language" value={lang} onChange={(e) => {setLang(e.target.value)}}>
                  {language.map((item,index) => {
                        return(
                            <option value={item.abbr}>{item.name}</option>
                        )
                  })}
                  </select>
                </div>

                <div class="form-group">
                  <label for="note">{t("settings.Note")}</label>
                  <textarea class="form-control" id="note" value={note} onChange={(e) => {setNote(e.target.value)}}/>
                </div>

                <button type="button" class="btn btn-dark mr-2" data-toggle="modal" data-target="#changepswdModal" >{t("settings.Change Password")}</button>                                            
                <button type="submit" class="btn btn-primary" onClick={handleAPI}> {t("settings.Save")} </button>

                <p className='mt-2' style={{opacity: "60%" }}> ({t("settings.Some changes will be reflected after a fresh login")}.) </p>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Change Password Modal */}
        <div class="modal fade" id="changepswdModal" tabindex="-1" role="dialog" aria-labelledby="changepswdModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="changepswdModalLabel">{t("settings.Change Password")}</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form>
                    <div class="form-group">
                    <label for="current_pswd">{t("settings.Current Password")}</label>
                    <input type="password" class={current_passwordinvalid? "form-control  is-invalid" : "form-control" } id="current_pswd" value={current_password} onChange={(e) => {setCurrent_password(e.target.value)}} required />
                    </div>
                    <div class="form-group">
                    <label for="new_pswd">{t("settings.New Password")}</label>
                    <input type="password" class={reEnter_passwordinvalid? "form-control  is-invalid" : "form-control" } id="new_pswd" value={new_password} onChange={(e) => {setNew_password(e.target.value)}} required />
                    </div>
                    <div class="form-group">
                    <label for="re_enterpswd">{t("settings.Re-Enter Password")}</label>
                    <input type="password" class={reEnter_passwordinvalid? "form-control  is-invalid" : "form-control" } id="re_enterpswd" value={reEnter_password} onChange={(e) => {setReEnter_password(e.target.value)}} required />
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-dark" data-dismiss="modal">{t("settings.Close")}</button>
                <button type="button" class="btn btn-primary" onClick={handleChangePswd}>{t("settings.Save")}</button>
            </div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default Settings