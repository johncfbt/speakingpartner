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
    </div>
      {userInfo? (
        <div>
          <h3>Detail for {name}</h3>
          <dl className='row'>
            <dt className='col-3'>Contact: </dt>
            <dd className='col-9'>{userInfo.toggleChat?userInfo.contact:"will visible after user toggle status"}</dd>
          </dl>
          <dl className='row'>
            <dt className='col-3'>Description: </dt>
            <dd className='col-9'>
              <span className="text-break" style={{ whiteSpace: 'pre-wrap' }}>
                {userInfo.description}
              </span>
            </dd>
          </dl>
          <dl className='row'>
            <dt className='col-3'>Language: </dt>
            <dd className='col-9'>{userInfo.language}</dd>
          </dl>
          <dl className='row'>
            <dt className='col-3'>Wanna Chat Now? </dt>
            <dd className='col-9'>{userInfo.toggleChat?"Yes":"No"}</dd>
          </dl>
          
        </div>
      ) : 
      <div>
        <h4>{name}'s profile will only be shown for logined user.</h4>
      </div>
      }
    </>
  );
}

export default UserInfo;
