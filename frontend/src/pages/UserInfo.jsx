import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Spinner from '../components/Spinner'
import { getInfo, reset } from '../features/auth/authSlice';

function UserInfo() {
  const { id, name } = useParams();
  const dispatch = useDispatch();
  const {userInfo, isLoading, isError, message} = useSelector((state) => state.auth);

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
    <>
    <div className="content">
      <h3>Detail for {name}</h3>
    </div>
      {userInfo? (
        <div>
          <dl className='row'>
            <dt className='col-sm-3'>Contact: </dt>
            <dd className='col-sm-9'>{userInfo.toggleChat?userInfo.contact:"will visible after user toggle status"}</dd>
          </dl>
          <dl className='row'>
            <dt className='col-sm-3'>Description: </dt>
            <dd className='col-sm-9'>{userInfo.description}</dd>
          </dl>
          <dl className='row'>
            <dt className='col-sm-3'>Language: </dt>
            <dd className='col-sm-9'>{userInfo.language}</dd>
          </dl>
          <dl className='row'>
            <dt className='col-sm-3'>Wanna Chat Now? </dt>
            <dd className='col-sm-9'>{userInfo.toggleChat?"Yes":"No"}</dd>
          </dl>
        </div>
      ) : null
      }
    </>
  );
}

export default UserInfo;
