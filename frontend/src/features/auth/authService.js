import axios from 'axios'

const API_URL = '/api/users/'

//register user
const register = async(userData) => {
  const response = await axios.post(API_URL, userData)
  if(response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }
  return response.data
}

//login user
const login = async(userData) => {
  const response = await axios.post(API_URL + 'login', userData)
  if(response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }
  return response.data
}

//get list
const getList = async(token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.get(API_URL + 'list', config)
  return response.data
}

//create userInfo
const createInfo = async(infoData, id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.post(`/api/users/info/create/${id}`, infoData, config)
  return response.data
}

//update userInfo
const updateInfo = async(infoData, id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.put(`/api/users/info/update/${id}`, infoData, config)
  return response.data
}

//get userInfo
const getInfo = async(token, id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.get(`/api/users/info/${id}`, config)
  return response.data
}

//toggle user
const toggleUser = async(token, id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  console.log(`from service:`)
  console.log(config)
  const response = await axios.put(`/api/users/toggle/${id}`, config)
  return response.data
}

//logout user
const logout = () => {
  localStorage.removeItem('user')
}

const authService = {
  register,
  logout,
  login,
  getList,
  createInfo,
  updateInfo,
  toggleUser,
  getInfo,
}

export default authService