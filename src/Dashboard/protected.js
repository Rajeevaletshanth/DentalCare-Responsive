import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useCookies } from 'react-cookie';


const Protected = (props) => {
  let Cmp = props.Cmp;
  const history = useHistory();
  const [cookies, setCookie, removeCookie] = useCookies(['admin-info']);

  useEffect(() => {
    if(!cookies["admin-info"]){
      history.push("/admin/login");
    }
    if (!localStorage.getItem("user-info")) {
      history.push("/admin/login");
    }
    
  }, []);

  return (
    <div>
      <Cmp />
    </div>
  );
};

export default Protected;
