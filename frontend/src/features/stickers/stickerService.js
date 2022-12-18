// import axios from '../../utils/request'
import axios from 'axios'

// register user
const API_URL = '/api/goals/'

// create new goal
const createGoal = async (goalData, token) => {
    const config = {
        headers: {
            // Authorization: `Bearer ${token}`
            Authorization: token
        }
    }
    const response = await axios.post(API_URL, goalData, config)
    console.log('data create', response.data)
    return response.data
}
// get goals
const getGoals = async (token) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL, config)
    return response.data
}

// delete goal
const deleteGoal = async (goalId, token) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.delete(API_URL + goalId, config)
    // const response = await axios.delete(API_URL + goalId)
    return response.data
}


const goalService = {
    createGoal,
    getGoals,
    deleteGoal,

}
export default goalService