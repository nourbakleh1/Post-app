import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts,deletePosts } from "../state/postSlice";
import PostList from "../components/PostList";
import Loading from "../components/Loading";



const Index = () => {
  const dispatch = useDispatch();
  const { records, loading, error } = useSelector((state) => state.posts);
  const {isLoggedin}=useSelector((state)=>{
    return state.auth
  });

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return <Loading loading={loading} error={error}>
         <PostList data={records} deletePosts={deletePosts} isLoggedin={isLoggedin} dispatch={dispatch}/>
         </Loading>
};

export default Index;