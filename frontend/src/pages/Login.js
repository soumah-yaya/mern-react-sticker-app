import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FaUser } from 'react-icons/fa'
import { login} from '../features/auth/authSlice'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'

function Login() {
  const [formData, setFormData] = useState({

    email: '',
    password: ''

  })
  const { email, password } = formData
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {isLoading, isError, message, authenticated } = useSelector((state) => state.auth)


  useEffect(()=>{
   
    authenticated && navigate('/')
    isError && toast.error(message)    
    
  }, [authenticated, isError, message, navigate])

const onSubmit = (e)=>{
  e.preventDefault()

  const userData = {
    email, password
  }

  dispatch(login(userData))
}

  const onChange = (e) => {
    let target = e.target.name
    setFormData((prev) => ({ ...prev, [target]: e.target.value }))
  }

  if (isLoading){
    return <Spinner />
  }
 
  return (
    <>
      <section className='heading'>
        <h1>
          <FaUser /> Login
          <p>Login and start adding stickers</p>
        </h1>
      </section>
      <section className='form'>
        <form onSubmit={onSubmit}>

          <div className='form-group'>

            <input type="email" className="form-control" id="email" name="email" value={email} placeholder="Enter your email" onChange={onChange} />
          </div>
          <div className='form-group'>

            <input type="password" className="form-control" id="password" name="password" value={password} placeholder="Enter your password" onChange={onChange} />
          </div>

          <div className='form-group'>

            <button type="submit" className='btn btn-block'>Submit</button>
          </div>
        </form>

      </section>
    </>
  )
}

export default Login