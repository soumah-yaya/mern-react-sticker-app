import  { useEffect, useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { register  } from '../features/auth/authSlice'
import { useSelector,useDispatch } from 'react-redux'
import Spinner from '../components/Spinner'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'

function Register() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { authenticated, isError, message, isLoading } = useSelector((state)=> state.auth)

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirm_password: ''
    })
    const { name, email, password, confirm_password } = formData

    useEffect(() => {
        authenticated && navigate('/')
        isError && toast.error(message)   
    }, [authenticated, isError, message, navigate])

    // input change
    const onChange = (e) => {
        let target = e.target.name
        setFormData((prev) => ({ ...prev, [target]: e.target.value }))
    }

    const onSubmit = (e) => {
        e.preventDefault()
        if(password !== confirm_password){
            toast.error('Password must be the same')
        }else{
            const userData = {
                name, email, password
            }
            dispatch(register(userData))
           

        }
        
    }
    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
            <section className='heading'>
                <h1>
                    <FaUser /> Register
                    <p>Please create an account</p>
                </h1>
            </section>
            <section className='form'>
                <form onSubmit={onSubmit}>
                    <div className='form-group'>
                        <input type="text" className="form-control" id="name" name="name" value={name} placeholder="Enter your name" onChange={onChange} />
                    </div>
                    <div className='form-group'>

                        <input type="email" className="form-control" id="email" name="email" value={email} placeholder="Enter your email" onChange={onChange} />
                    </div>
                    <div className='form-group'>

                        <input type="password" className="form-control" id="password" name="password" value={password} placeholder="Enter your password" onChange={onChange} />
                    </div>
                    <div className='form-group'>

                        <input type="password" className="form-control" id="confirm_password" name="confirm_password" value={confirm_password} placeholder="Confirm password" onChange={onChange} />
                    </div>
                    <div className='form-group'>

                        <button type="submit" className='btn btn-block'>Submit</button>
                    </div>
                </form>

            </section>
        </>

    )
}

export default Register