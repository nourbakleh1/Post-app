import {useEffect} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getPosts } from '../state/postSlice';


const useGetInfo = () => {
    const {id}=useParams();
    const dispatch=useDispatch();
    const {record,loading,error}=useSelector((state)=>{
        return state.posts;
    });
    useEffect(()=>{
        dispatch(getPosts(id));
    },[dispatch,id]);

  return {record,loading,error};
}

export default useGetInfo