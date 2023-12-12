import { useEffect } from "react"
import {Link} from 'react-router-dom'
import { FaUser} from 'react-icons/fa'
import {useNavigate} from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"
import UserItem from '../components/UserItem'
import Spinner from '../components/Spinner'
import { getList, reset } from "../features/auth/authSlice"
import 'bootstrap-icons/font/bootstrap-icons.css';


function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {user, isLoading, isError, message, list} = useSelector((state)=>state.auth)

  useEffect(()=> {
    if(isError){
      console.log(message);
    }
    // if (!user) {
    //   navigate('/login');
    // } else if (list.length === 0) {
    //   // Only dispatch getList if the list is empty and user logged in.
    //   dispatch(getList());
    // }
    if (list.length === 0) {
      dispatch(getList());
    }
    //claenup function
    return () => {
      dispatch(reset())
    }
  }, [user])

  if (isLoading) {
    return <Spinner />
  }
  
  return (
    <>
      <Link to={`/how`}><p className="text-left text-primary">How to use this website</p></Link>
      <section className="heading">
        {/* <h1>Welcome {user && user.name} <i className="bi bi-emoji-smile"></i></h1> */}
        <p>User list by last active time:</p>
      </section>
      <section className="content table-responsive">
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Last Live Time</th>
              <th scope="col">Language</th>
              <th scope="col">Wanna Chat Now?</th>
            </tr>
          </thead>
          <tbody>
            {list.map((user, index)=> (
            <UserItem key={user._id} user={user} index={index}/>
              ))}
          </tbody>
        </table>
      </section>
    </>
  )
}

export default Dashboard