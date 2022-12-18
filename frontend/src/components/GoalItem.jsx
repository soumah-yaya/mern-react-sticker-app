import {useDispatch} from 'react-redux'
import { deleteGoal } from '../features/goals/goalSlice'


function GoalItem({goal}) {
  
    const dispatch = useDispatch()

    const onRemoveGoal = ()=>{
        dispatch(deleteGoal(goal._id))
    }
  return (
    <div className='goal'>
        <div>
            {new Date(goal.createAt).toLocaleString('en-US')}
        </div>
        <h2>{goal.text}</h2>
        <button onClick={onRemoveGoal} className='close'>X</button>
    </div>
  )
}

export default GoalItem