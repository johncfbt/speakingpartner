import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {useParams} from 'react-router-dom';
import {toast} from 'react-toastify'
import {updateInfo, reset} from '../features/auth/authSlice'
import Spinner from './Spinner'

function UpdateInfoForm() {
  const [formData, setFormData] = useState({
    contact: '',
    description:'',
    language:'',
  })
  const {contact, description, language} = formData
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { name } = useParams();

  const {user, isLoading, isError, isSuccess, message} = useSelector(
    (state)=>state.auth)
  
  useEffect(()=>{
    if(isError) {
      toast.error(message)
    }
    if(isSuccess) {
      navigate('/')
    }
    return () => {
      dispatch(reset())
    } 
  },[user, isError, isSuccess, message])

  const onChange = (e) => {
      // For other input fields, set the value normally
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
  };

  const onSubmit = (e)=>{
    e.preventDefault()
    const infoData = {
      contact,
      description,
      language,
    }
    if (contact && description && language) {
      dispatch(updateInfo(infoData))
    }
  }

  if(isLoading) {
    return <Spinner />
  }
  
  return (
  <>
    <section className="heading">
      <h1>Update my profile</h1>
      <p>Name: {name}</p>
    </section>
    <section>
      <form className='form-group' onSubmit={onSubmit}>
        <label htmlFor="contact" >Contact:</label>
          <input
            type='text'
            className='form-control'
            id='contact'
            name='contact'
            value={contact}
            placeholder='Input a prefered contact'
            onChange={onChange} 
          />
        <label htmlFor="description">Description:</label>
          <input
            type='text'
            className='form-control'
            id='description'
            name='description'
            value={description}
            placeholder='Input a brief description'
            onChange={onChange} 
          />
        <label htmlFor="language">Language:</label>
          <select
            className='form-select'
            type='select'
            id='language'
            name='language'
            value={language}
            onChange={onChange}>
              <option value="">Select your Language</option>
              <option value="English">English</option>
              <option value="Chinese">Mandarin</option>
              <option value="Hindi">Hindi</option>
              <option value="Spanish">Spanish</option>
              <option value="Others">Specify in profile</option>
          </select>
        <button className="btn" style={{ margin: 'auto' }} type="submit">
          Submit
        </button>
      </form>
    </section>
  </>)
}

export default UpdateInfoForm