import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";

const Base = () => {
  const history = useHistory();

  useEffect(() => {
    history.push("/admin/login");      
  }, []);
  return (
    <div className="spinner-container mx-auto" style={{marginTop:"10%"}}>
      <div className="row">
          <div class="spinner-grow  text-primary " role="status">
          <span class="sr-only">Loading...</span>
        </div>
        <div class="spinner-grow text-primary ml-5" role="status">
          <span class="sr-only">Loading...</span>
        </div>
        <div class="spinner-grow text-primary ml-5" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  )
}

export default Base