import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'
import {Link, useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {logout, reset} from '../features/auth/authSlice'

function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {user} = useSelector((state)=>state.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  return (
    <header className='header'>
      <div className='logo'><Link to='/'>Speaking Partner</Link></div>
      <ul>
        {user ? (<>
          <li>
            <Link to={`/info/update/${user._id}/${user.name}`}>
            <button className='btn' style={{ margin: 'auto' }}>
            <FaUser /> Update
            </button>
            </Link>
          </li>
          <li>
            <Link to={`/info/toggle/${user._id}/${user.name}`}>
            <button className='btn' style={{ margin: 'auto' }}>
            <FaUser /> Toggle
            </button>
            </Link>
          </li> 
          <li>
            <button className='btn' onClick={onLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </li>
          </>
        ): (<>
          <li>
          <Link to='/login'>
            <FaSignInAlt /> Login
          </Link>
        </li>
        <li>
          <Link to='/register'>
            <FaUser /> Register
          </Link>
        </li>
        </>)}

      </ul>
    </header>
  )
}

export default Header