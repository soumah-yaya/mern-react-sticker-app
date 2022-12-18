import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Dashboard() {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { isLoading, isError, message, authenticated } = useSelector((state) => state.auth)

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (!authenticated) {
      navigate('/login')
    }

    // useDispatch(getGoals())
    // useEffect callback to reset state data
    // return () => dispatch(reset())

  }, [authenticated, navigate, isError, message, dispatch])

  return (
    <div>Dashboard</div>
  )
}

export default Dashboard