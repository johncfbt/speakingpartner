import { useEffect} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {toast} from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux';
import { FaUser } from 'react-icons/fa';
import { toggleUser, reset } from '../features/auth/authSlice';
import Spinner from './Spinner'

function ToggleForm() {
  const { id, name } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const {user, isError, isSuccess, message, isLoading} = useSelector(
    (state)=>state.auth)
  const onToggle = () => {
    dispatch(toggleUser(id));
    dispatch(reset())
    navigate('/')
  }
  
  // useEffect(()=>{
  //   if(isError) {
  //     toast.error(message)
  //   }
  //   if(isSuccess) {
  //     navigate('/')
  //   }
  //   return () => {
  //     dispatch(reset())
  //   }
  // },[user, isError, isSuccess, message])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <p className="h3">Click the button below to change {name} chat status for 30 minutes:</p>
        <button className='btn' style={{ margin: 'auto' }} onClick={onToggle}>
          <FaUser /> Toggle
        </button>
    </>
  );
}

export default ToggleForm;
