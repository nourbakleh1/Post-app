import { Col, Form } from 'react-bootstrap';
import useGetInfo from '../Hooks/useGetInfo';
import { useDispatch } from 'react-redux';
import Loading from '../components/Loading';
import { cleanRecord, updatePosts } from '../state/postSlice';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import withGuard from '../util/withGuard';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useEffect } from 'react';


const formSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('title is Required'),
  description: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('description is Required'),
});

const Edit = () => {
  const {record,error,loading}= useGetInfo();
  const navigate=useNavigate();
  const dispatch=useDispatch();
  
  


 
    
 
  useEffect(()=>{
      return ()=>{
        dispatch(cleanRecord())

      }
      
  },[dispatch]);


  const formik = useFormik({
    initialValues: {
      title: record ? record?.title:"",
      description: record ? record?.description:"",
    },
    validationSchema:formSchema,
    enableReinitialize:true,
    onSubmit: values => {
      
      Swal.fire({
        title: 'Are you sure?',
        text: `do you want really Update record? ${record.title}`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, update it!'
      }).then((result)=>{
        if(result.isConfirmed){
          Swal.fire(
            'Updated!',
            'Your post has been updated.',
            'success'
          );
          dispatch(updatePosts({
            id:record.id, title:values.title,description:values.description
            })).unwrap().then((result)=>{
              navigate("/",{replace:true});
            });
        }
      });
      
      
    },
  });

  return (
    <Loading loading={loading} error={error}>
    <Form onSubmit={formik.handleSubmit} >
    <p>Update post</p>
    <Form.Group as={Col} md="12" controlId="validationFormik02">
              <Form.Control
              className='input'

                type="text"
                name="title"
                value={formik.values.title || ""}
                 onChange={formik.handleChange}
                isInvalid={ !!formik.errors.title}

              />
              <Form.Control.Feedback type="invalid">
              {formik.errors.title}
            </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="12" controlId="validationFormik02">
              <Form.Control
              className='input'
                type="text"
                name="description"
                value={formik.values.description || ""}
                 onChange={formik.handleChange}
                 isInvalid={ !!formik.errors.description}
              />
              <Form.Control.Feedback type="invalid">
              {formik.errors.description}
            </Form.Control.Feedback>

            </Form.Group>

   
    <button type="submit" className='btnsub'>Update</button>
    </Form>
    </Loading>

  )
}

export default withGuard(Edit);