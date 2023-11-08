import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'
import {BsToggleOn} from "react-icons/bs";
import {Link, useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {logout, reset} from '../features/auth/authSlice'
import logo from '../logo.png'

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
      <div className='logo'>
        <Link to='/'>
          Stutter Support Chat
        </Link></div>
      <ul>
        {user ? (<>
          <li>
            <Link to={`/info/update/${user._id}/${user.name}`}>
            <button className='btn' style={{ margin: 'auto' }}>
            <FaUser /> Profile
            </button>
            </Link>
          </li>
          <li>
            <Link to={`/info/toggle/${user._id}/${user.name}`}>
            <button className='btn' style={{ margin: 'auto' }}>
            <BsToggleOn /> Toggle
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
            <button className='btn' style={{ margin: 'auto' }}>
            <FaSignInAlt /> Login
            </button>
          </Link>
        </li>
        <li>
          <Link to='/register'>
            <button className='btn' style={{ margin: 'auto' }}>
            <FaUser /> Register
            </button>
          </Link>
        </li>
        </>)}

      </ul>
    </header>
  )
}

export default Header