import { FaUser} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Spinner from '../components/Spinner'
import { getInfo, reset } from '../features/auth/authSlice';

function UserInfo() {
  const { id, name } = useParams();
  const dispatch = useDispatch();
  const {user, userInfo, isLoading, isError, message} = useSelector((state) => state.auth);

  useEffect(() => {
    if(isError){
      console.log(message);
    }
    dispatch(getInfo(id));
    return () => {
      dispatch(reset())
    }
  }, [id]);

  if (isLoading) {
    return <Spinner />
  }
  return (
    <div className="content">
      <h1>My Profile</h1>
      <p>Name: {name}</p>
      {userInfo && userInfo[0] ? (
        <>
          <p>Contact: {userInfo[0].contact}</p>
          <p>Description: {userInfo[0].description}</p>
          {userInfo[0].user === user._id && (
          <Link to={`/info/update/${user._id}/${user.name}`}>
          <button className='btn' style={{ margin: 'auto' }}>
          <FaUser /> Update
          </button>
          </Link>
          )}
        </>
      ) : 
      <Link to={`/info/create/${user._id}/${user.name}`}>
      <button className='btn' style={{ margin: 'auto' }}>
      <FaUser /> Create
      </button>
      </Link>}
    </div>
  );
}

export default UserInfo;
