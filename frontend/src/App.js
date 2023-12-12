import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header';
import CreateInfoForm from './components/CreateInfoForm'
import UpdateInfoForm from './components/UpdateInfoForm'
import ToggleForm from './components/ToggleForm'
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import UserInfo from './pages/UserInfo';
import Profile from './pages/Profile';
import How from './pages/How'


function App() {
  return (
    <>
      <Router>
        <div className='container'>
          <Header />
          <Routes>
            <Route path='/' element={<Dashboard/>}/>
            <Route path='/how' element={<How/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/info/:id/:name' element={<UserInfo />} />
            <Route path='/profile/:id/:name' element={<Profile />} />
            <Route path='/info/create/:id/:name' element={<CreateInfoForm />} />
            <Route path='/info/update/:id/:name' element={<UpdateInfoForm />} />
            <Route path='/info/toggle/:id/:name' element={<ToggleForm />} />
          </Routes>
        </div>
      </Router>
      {/* <ToastContainer /> */}
    </>
  );
}

export default App;
