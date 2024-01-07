import { useCallback } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import Swal from 'sweetalert2';
import { Link,useNavigate } from "react-router-dom";


const PostListItem = ({ data,deletePosts,dispatch,isLoggedin }) => {
  const navigate=useNavigate();
  


  const confirmDelete=(el)=>{
    Swal.fire({
      title: 'Are you sure?',
      text: `do you want really Delete record? ${el.title}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result)=>{
      if(result.isConfirmed){
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        );
        postDelete(el);

      }
    });
  
  }
  
  
  const postDelete=useCallback((el)=>{

    dispatch(deletePosts(el));

  },[dispatch,deletePosts]);

  const records =data.map((el, idx) => (
    <tr key={el.id}>
      <td>#{++idx}</td>
      <td><Link className="anchor" to={`post/${el.id}`}>{el.title}</Link></td>
      <td>
        <ButtonGroup aria-label="Basic example">
          <Button variant="success" onClick={()=>navigate( `post/${el.id}/edit`)}>Edit</Button>
          <Button variant="danger" onClick={()=>confirmDelete(el)} disabled={!isLoggedin}>Delete</Button>
        </ButtonGroup>
      </td>
    </tr>
  ));
  return <>{records}</>;
};

export default PostListItem;