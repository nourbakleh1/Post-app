import React,{useEffect} from 'react';
import useGetInfo from '../Hooks/useGetInfo';
import Loading from '../components/Loading';
import {useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { cleanRecord } from '../state/postSlice';

const Details = () => {

  const navigate=useNavigate();
  const {record,error,loading} =useGetInfo();
  const dispatch=useDispatch();

  useEffect(()=>{
    return ()=>{
      dispatch(cleanRecord())

    }
    
},[dispatch]);
  

  return (
    <Loading error={error} loading={loading}>
    <div className='title'>Post Details</div>
    <div className='boundry'>
    <p><span>title:</span> {record?.title}</p>
    <p><span>description:</span> {record?.description}</p>
    <button className="btnsub" onClick={()=>navigate("/",{replace:true})}>back</button>
    </div>
    
    </Loading>
  )
}

export default Details;