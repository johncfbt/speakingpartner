import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { useParams } from 'react-router-dom';
import {toast} from 'react-toastify'
import {createInfo, reset} from '../features/auth/authSlice'
import Spinner from './Spinner'

function CreateInfoForm() {
  const [formData, setFormData] = useState({
    contact: '',
    description:'',
  })
  const {contact, description} = formData
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { name } = useParams();

  const {user,isLoading, isError, isSuccess, message} = useSelector(
    (state)=>state.auth)
  
  useEffect(()=>{
    if(isError) {
      toast.error(message)
    }
    if(isSuccess) {
      navigate('/')
    }
    dispatch(reset())
  },[user, isError, isSuccess, message])

  const onChange = (e)=>{
    setFormData((prevState)=> ({
      ...prevState,
      [e.target.name]:e.target.value,
    }))
  }

  const onSubmit = (e)=>{
    e.preventDefault()
    const infoData = {
      contact,
      description,
    }
    if (contact && description) {
      dispatch(createInfo(infoData))
    }
    if(isLoading) {
      return <Spinner />
    }
  }

  return (<>
    <h1>User Information</h1>
    <p>Name: {name}</p>
    <section className="form">
      <form onSubmit={onSubmit}>
      <div className='form-group'>
        <input
          type='contact'
          className='form-control'
          id='contact'
          name='contact'
          value={contact}
          placeholder='Enter a prefered contact'
          onChange={onChange} 
        />
      </div>
      <div className='form-group'>
        <input
          type='description'
          className='form-control'
          id='description'
          name='description'
          value={description}
          placeholder='Type a brief description'
          onChange={onChange} 
        />
      </div>
        <div className="form-group">
          <button className="btn btn-block" type="submit">
            Submit
          </button>
        </div>
      </form>
    </section>
    </>
  )
}

export default CreateInfoForm