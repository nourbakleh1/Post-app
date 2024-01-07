import React,{Suspense} from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import Root from "./Pages/Root";
import Home from "./Pages/Home";

import Errorpage from "./Pages/Errorpage";
import store from "./state";
import { Provider } from 'react-redux';
import Footer from "./components/Footer";

const Add =React.lazy(()=>import("./Pages/Add"));
const Edit =React.lazy(()=>import("./Pages/Edit"));
const Details =React.lazy(()=>import("./Pages/Details"));


const handelloader=(data)=>{
  if( isNaN(data.params.id) ){
    throw new Response("Bad Request",{statusText:"please enter number",status:400});
  }else{
    
  }
};

const routes=createBrowserRouter([{
  path:"/",element:<Root/>,errorElement:<Errorpage/>,children:[{
    index:true,element:<Home/>
  },{
    path:"post",element:<Home/>
  },
  {
    path:"post/add",element:
    <Suspense fallback="please wait ......"><Add/></Suspense>
  },
  {
    path:"post/:id/edit",element:
    <Suspense fallback="please wait ......"> <Edit/></Suspense>,
   
    loader:handelloader,

  },{
    path:"post/:id",element:
    <Suspense fallback="please wait ......"> <Details/></Suspense>,
    
    
     loader:handelloader,
  }]
}
]);
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.Fragment>
  <div className="background">
  <Provider store={store}>
     <RouterProvider router={routes}/>
     </Provider>
     </div>
     <Footer></Footer>
  </React.Fragment>
);
