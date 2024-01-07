import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate, useRouteError } from "react-router-dom";



const Errorpage = () => {
  const error = useRouteError();
  const navigate=useNavigate();

  return (
    <div id="error-page" className='mt-5 text-center' >
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p> 
      <Button onClick={()=>{navigate("/",{replace:true})}} variant="link">Go back</Button>
    </div>
  )
}

export default Errorpage;
