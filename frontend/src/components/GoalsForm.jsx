import {useState} from 'react'
import { useDispatch } from 'react-redux'
import { createGoal } from '../features/goals/goalSlice'


function GoalsForm() {
    const [text, setText] = useState('')

const dispatch = useDispatch()

    const onSubmit = (e)=>{
        e.preventDefault()
        dispatch(createGoal({text}))
        setText('')
    }
    const onChange = (e)=>{
        setText(e.target.value)
    }
  return (
    <section>
        <form onSubmit={onSubmit} className="form">
<div className='form-group'>
    <label htmlFor='text'>Goal</label>
    <input type="text" value={text} onChange={onChange} name="text" id="text"/>
</div>
<div className='form-group'>
    <button type="submit" className='btn btn-block'>Add Goal</button>
</div>
        </form>
    </section>
  )
}

export default GoalsForm