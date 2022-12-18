import api from '../../utils/request'

import { toast } from 'react-toastify'

const register = async (userData) => {

    const { data: res } = await api.post('/users', userData)
   
    toast.success(res.meta.msg)
    localStorage.setItem('token', res.token)

    return res.meta.status === 201
  
}

// login user
const login = async (userData) => {

    const { data: res } = await api.post('/users/login', userData)
    toast.success(res.meta.msg)
    localStorage.setItem('token', res.token) 

    return res.meta.status === 200
}
// logout
const logout = () => {
    localStorage.removeItem('token')
}

const authService = {
    register,
    logout,
    login
}
export default authService