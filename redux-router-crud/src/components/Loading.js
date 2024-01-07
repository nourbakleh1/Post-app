import React from "react";

const Loading = ({ loading, error, children }) => {
  const elementType=children.type;
  const Loading_handeler=()=>{
    if(elementType ==="button"){
      return(
        <React.Fragment>
        {
          loading? React.cloneElement(children,{disabled:true},"Loading"):error?<>{children}<p>{error}</p></>:(children)
        }
        </React.Fragment>
      )

    }
    else{
     return( <React.Fragment>
      {loading ? (
        <p>loading please wait...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        children
      )}
    </React.Fragment>)
    }
  }
  
  return Loading_handeler();
    
  
};
export default Loading;