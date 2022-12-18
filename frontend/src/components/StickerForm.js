import { useState } from 'react'

function StickerForm() {
    const [text, setText] = useState('')
    const onSubmit = ()=>{
        
    }
    const onChange = (e) => {
        setText(e.target.value)
    }
  return (
      <section>
          <form onSubmit={onSubmit} className="form">
              <div className='form-group'>
                  <label htmlFor='text'>Goal</label>
                  <input type="text" value={text} onChange={onChange} name="text" id="text" />
              </div>
              <div className='form-group'>
                  <button type="submit" className='btn btn-block'>Add Goal</button>
              </div>
          </form>
      </section>
  )
}

export default StickerForm