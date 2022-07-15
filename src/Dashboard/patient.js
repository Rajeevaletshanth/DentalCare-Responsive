import React, { useState, useEffect } from 'react'
import MUIDataTable from "mui-datatables";
import { useCookies } from 'react-cookie';
import configData from '../config.json';
import axios from 'axios';
import { createTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";

const Patient = () => {

    const [cookies, setCookie, removeCookie] = useCookies(['admin-info']);
    const username = cookies["admin-info"].username;
    const admin_id = cookies["admin-info"].id;

    const { t, i18n } = useTranslation();

    const [data, setData] = useState([]);
  
    const columns = [
      {name: "id", label: t("patient.ID")},
      {name: "firstname", label: t("patient.Firstname")},
      {name: "surname", label: t("patient.Lastname")},
      {name: "dob", label: t("patient.Date of Birth")},
      {name: "contact", label: t("patient.Contact")},
      // {name: "username", label: t("patient.Address")},
      {name: "email", label: t("patient.Email")},      
    //   {
    //     name: "actions",
    //     label: t("patient.Actions"),
    //     options: {
    //       customBodyRender: (value, tableMeta, updateValue) => {
    //         return (
    //           <div>
    //           <button className='btn btn-success' onClick={() => console.log(tableMeta.rowIndex) } > <span class="material-icons md-18">edit</span> </button>        
    //           <button className='btn btn-danger' onClick={() => console.log(tableMeta.rowIndex) } > <span class="material-icons md-18">delete</span> </button>
    //         </div>           
    //         );
    //       }
    //     }
    //   }
    ];
  
    const getData = async() => {
      const result = await axios.get(`${configData.SERVER_URL}/admin/user/get/${admin_id}`)
      setData(result.data);
    }
  
    useEffect(() => {
      getData();
    },[]);
  
    // const options = {
    //   filterType: "dropdown",
    //   // responsive: "scroll",
    //   selectableRows: false
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
              <div class="card card-custom"  style={{maxHeight:"800px", padding:"20px"}}>
                <div class="card-body" style={{overflowY:"scroll"}}>
                  <p class="card-title">{t("patient.Patient List")}</p>
                  <div class="row">
                    <div class="col-12">
                      <div class="table-responsive">
                        <table class="table table-striped display expandable-table" style={{width:"100%"}}>
                          <thead>
                            <tr>
                              <th class="text-center">{t("patient.ID")}</th>
                              <th class="text-center">{t("patient.Firstname")}</th>
                              <th class="text-center">{t("patient.Lastname")}</th>
                              <th class="text-center">{t("patient.Date of Birth")}</th>
                              <th class="text-center">{t("patient.Contact")}</th>
                              <th class="text-center">{t("patient.Email")}</th>
                              {/* <th class="text-center">Action</th> */}
                              {/* <th>Status</th>
                              <th>Updated at</th>
                              <th></th> */}
                            </tr>
                          </thead>
                                
                          {data.map((item) => {
                            return[
                              <tr>
                                <td class="text-center">{item.id}</td>
                                <td class="text-center"><b>{capitalizeFirst(item.firstname)}</b></td>
                                <td class="text-center"><b>{capitalizeFirst(item.surname)}</b></td>
                                <td class="text-center">{item.dob}</td>
                                <td class="text-center"><b>{item.contact}</b></td>
                                <td class="text-center">{item.email}</td>
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
    {/* <div class="row">
      <div class="col-12 grid-margin stretch-card">
        <div class="card"> */}
          {/* <div class="card-body"> */}
            {/* <h4 class="card-title">Patient List</h4> */}
            {/* <MuiThemeProvider theme={getMuiTheme()}>
            <MUIDataTable
              title={t("patient.Patient List")}
              data={data}
              columns={columns}
              options={options}
            />
            </MuiThemeProvider> */}
          {/* </div> */}
        {/* </div>
      </div>
    </div> */}
  </div>
  )
}

export default Patient