import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import authService from './authService'

//get user from localStorage
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  user: user ? user : null,
  list: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message:'',
  userInfo:{},
}

//register user
export const register = createAsyncThunk('auth/register', async(user, thunkAPI) => {
  try {
    return await authService.register(user)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

//login user
export const login = createAsyncThunk('auth/login', async(user, thunkAPI) => {
  try {
    return await authService.login(user)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

//get user list
export const getList = createAsyncThunk('auth/getlist', async(_, thunkAPI) => {
  try {
    const user = thunkAPI.getState().auth.user;
    if (!user || !user.token) {
      // Handle the case where the user is not authenticated
      throw new Error('User is not authenticated');
    }
    const token = user.token
    return await authService.getList(token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

//create user info
export const createInfo = createAsyncThunk('auth/createinfo', async(infoData, thunkAPI) => {
  try {
      const token = thunkAPI.getState().auth.user.token
      const id = thunkAPI.getState().auth.user._id;
      return await authService.createInfo(infoData, id, token)
    }
  catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
  }
})

//update user info
export const updateInfo = createAsyncThunk('auth/updateinfo', async(infoData, thunkAPI) => {
  try {
      const token = thunkAPI.getState().auth.user.token
      const id = thunkAPI.getState().auth.user._id;
      return await authService.updateInfo(infoData, id, token)
    }
  catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
  }
})


//get user info
export const getInfo = createAsyncThunk('auth/getinfo', async(id, thunkAPI) => {
  try {
    const user = thunkAPI.getState().auth.user;
    if (!user || !user.token) {
      // Handle the case where the user is not authenticated
      throw new Error('User is not authenticated');
    }
    const token = user.token
    return await authService.getInfo(token, id)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

//toggle user toggleChat
export const toggleUser = createAsyncThunk('auth/toggleuser', async(id, thunkAPI) => {
  try {
    const user = thunkAPI.getState().auth.user;
    if (!user || !user.token) {
      // Handle the case where the user is not authenticated
      throw new Error('User is not authenticated');
    }
    const token = user.token
    console.log(`from slice: ${token}`)
    const id = thunkAPI.getState().auth.user._id;
    return await authService.toggleUser(token, id)
    }
  catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
  }
})



//logout user
export const logout = createAsyncThunk('auth/logout', async () => {
  authService.logout()
})


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset:(state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state)=> {
        state.isLoading = true
      })
      .addCase(register.fulfilled, (state, action)=> {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(register.rejected, (state, action)=> {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      .addCase(login.pending, (state)=> {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action)=> {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(login.rejected, (state, action)=> {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      .addCase(logout.fulfilled, (state)=> {
        state.user = null
      })
      .addCase(getList.pending, (state)=> {
        state.isLoading = false
      })
      .addCase(getList.fulfilled, (state, action)=> {
        state.isLoading = false
        state.list = action.payload
      })
      .addCase(getList.rejected, (state)=> {
        state.isLoading = false
        state.isError = true
        state.list = []
      })
      .addCase(createInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true
        state.userInfo = action.payload;
      })
      .addCase(createInfo.rejected, (state) => {
        state.isLoading = false
      })
      .addCase(updateInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true
        state.userInfo = action.payload;
      })
      .addCase(updateInfo.rejected, (state) => {
        state.isLoading = false
      })
      .addCase(getInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userInfo = action.payload;
      })
      .addCase(getInfo.rejected, (state) => {
        state.isLoading = false
      })
      .addCase(toggleUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(toggleUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userInfo.toggleChat = action.payload;
      })
      .addCase(toggleUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload
      })
  },
  })

export const { reset } = authSlice.actions
export default authSlice.reducer