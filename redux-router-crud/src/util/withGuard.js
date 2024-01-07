import { useSelector } from "react-redux";


const withGuard = (Component) => {

    return (props)=>{
        const {isLoggedin}=useSelector((state)=>{
            return state.auth;
        });

        return isLoggedin?<Component {...props}/>:"please login first";

    }
 
  
}

export default withGuard;