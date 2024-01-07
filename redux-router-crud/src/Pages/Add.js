import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Col, Form } from 'react-bootstrap';
import { useDispatch,useSelector } from 'react-redux';
import { insertPosts } from '../state/postSlice';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import withGuard from '../util/withGuard';

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

const Add = () => {
  const navigate=useNavigate();

  
  
  const dispatch=useDispatch();
  const {loading,error}=useSelector((state)=>{
    return state.posts;
  });
  
    const formik = useFormik({
      initialValues: {
        title: '',
        description: ''
      },
      validationSchema:formSchema,
      onSubmit: values => {
        
        const data={

          id:Math.floor(Math.random() * 800),
          title:values.title,
          description:values.description
        }
        dispatch(insertPosts(data)).unwrap().then((fullfeld)=>{
          navigate("/",{replace:true});
        }).catch((rejected)=>{
          console.log(rejected);
         });
        
      },
    });
  

  
  return (
    <React.Fragment>
    <Form onSubmit={formik.handleSubmit} >
    <p>Insert post</p>
    
    
    <Form.Group as={Col} md="12" controlId="validationFormik02">
              <Form.Control
              className='input'

                type="text"
                name="title"
                value={formik.values.title}
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
                value={formik.values.description}
                 onChange={formik.handleChange}
                 isInvalid={ !!formik.errors.description}
              />
              <Form.Control.Feedback type="invalid">
              {formik.errors.description}
            </Form.Control.Feedback>

            </Form.Group>


    
    <Loading loading={loading} error={error}>
    <button type='submit' className='btnsub'>Create</button>
    </Loading>
    </Form>
    
    </React.Fragment>
  )
}

export default withGuard(Add);