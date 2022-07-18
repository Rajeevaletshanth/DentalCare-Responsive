import React, { useState, useEffect } from 'react'
import MUIDataTable from "mui-datatables";
import axios from 'axios';
import { useCookies } from 'react-cookie';
import configData from '../config.json';
import { createTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";

const Appointment = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['admin-info']);
    const username = cookies["admin-info"].username;
    const admin_id = cookies["admin-info"].id;

    const [data, setData] = useState([]);

    const { t, i18n } = useTranslation();
  
    // const columns = [
    //   {name: "id", label: t("appointment.ID"), options: { sortDirection: 'desc' }},
    //   {name: "patient_name", label: t("appointment.Patient")},
    //   {name: "date", label: t("appointment.Date")},
    //   {name: "time", label: t("appointment.Time")}, 
      // {
      //   name: "action",
      //   label: t("appointment.Actions"),
      //   options: {
      //     customBodyRender: (value, tableMeta, updateValue) => {
      //       return (
      //         <div>
      //         {/* <button className='btn btn-success btn-sm mr-2' id={value} onClick={() => console.log(tableMeta.rowIndex) } > Edit </button>         */}
      //         <button className='btn btn-danger  btn-sm' id={value} onClick={() => console.log(tableMeta.rowIndex) } > Cancel </button>
      //       </div>           
      //       );
      //     }
      //   }
      // }
    // ];
  
    const getData = async() => {
      await axios.get(`${configData.SERVER_URL}/admin/booking/get/${admin_id}`).then((result) => {
        if(result.data.length > 0){
          result.data.map( async(item,index) => {
            if(item.patient_id != "admin"){
              await axios.get(`${configData.SERVER_URL}/admin/user/getUser/${item.patient_id}/${admin_id}`).then((res) => {
                // console.log(res.data)
                setData(s => {
                  return[
                    ...s, {
                      id: item.id,
                      patient_name: res.data[0].firstname + " " + res.data[0].surname,
                      date: item.date,
                      time: item.start_time + " - " + item.end_time,
                      action: item.id
                    }
                  ]
                })
              })
            }else{
              setData(s => {
                return[
                  ...s, {
                    id: item.id,
                    patient_name: item.patient_id,
                    date: item.date,
                    time: item.start_time + " - " + item.end_time,
                    action: item.id
                  }
                ]
              })
            }

          })
        }
      })
    }
  
    useEffect(() => {
      getData();
      // getData();
      // console.log(data)
    },[]);
  
    // const options = {
    //   filterType: "dropdown",
    //   // responsive: "scroll",
    //   selectableRows: false,
    // };

    // const getMuiTheme = () => createTheme({
    //   overrides: {
    //     // MUIDataTableHead:{
    //     //   root: {
    //     //     backgroundColor: "#FF0000",
    //     //   },
    //     // },
    //     MUIDataTableBodyCell: {
    //       root: {
    //         // backgroundColor: "#FF0000",
    //       },
    //     },
    //     MUIDataTablePagination: {
    //       root: {
    //         backgroundColor: "#f3f3f3",
    //         color: "black",
    //       },
    //     },
    //   },
    // });
    const capitalizeFirst = str => {
      return str.charAt(0).toUpperCase() + str.slice(1);
    };

  return (
    <div class="content-wrapper">
      <div class="row">
            <div class="col-md-12 grid-margin stretch-card">
              <div class="card"  style={{maxHeight:"800px", padding:"20px"}}>
                <div class="card-body" style={{overflowY:"scroll"}}>
                  <p class="card-title">{t("appointment.Appointments")}</p>
                  <div class="row">
                    <div class="col-12">
                      <div class="table-responsive">
                        <table class="table table-striped display expandable-table" style={{width:"100%"}}>
                          <thead>
                            <tr>
                              <th class="text-center">{t("appointment.ID")}</th>
                              <th class="text-center">{t("appointment.Patient")}</th>
                              <th class="text-center">{t("appointment.Date")}</th>
                              <th class="text-center">{t("appointment.Time")}</th>
                              {/* <th class="text-center">Action</th> */}
                              {/* <th>Status</th>
                              <th>Updated at</th>
                              <th></th> */}
                            </tr>
                          </thead>
                          {data.map((item) => {
                            return[
                              <tr>
                                <td class="text-center">{item.action}</td>
                                <td class="text-center"><b>{capitalizeFirst(item.patient_name)}</b></td>
                                <td class="text-center">{item.date}</td>
                                <td class="text-center">{item.time}</td>
                                {/* <td class="text-center">{item.action}</td> */}
                              </tr>
                            ]
                          })}
                      </table>
                      {data.length == 0 ? <div class="mt-3 text-center"> No Data Found! </div> : ""}  
                      </div>
                    </div>
                  </div>
                  </div>
                </div>
              </div>
            </div>
    {/* <div class="row"> */}
      {/* <div class="col-12 grid-margin stretch-card"> */}
        {/* <div class="card border-left-primary shadow h-100 py-2"> */}
          {/* <div class="card-body"> */}
            {/* <h4 class="card-title">Appointment</h4> */}
            {/* <MuiThemeProvider theme={getMuiTheme()}>
            <MUIDataTable
              title={t("appointment.Appointments")}
              data={data}
              columns={columns}
              options={options}
            />
            </MuiThemeProvider> */}
          {/* </div>  */}
        {/* </div>
      </div>
    </div> */}
  </div>
  )
}

export default Appointment