import { useState } from 'react'
import { useDispatch} from 'react-redux'
import { createSticker } from '../features/stickers/stickerSlice'
function StickerForm() {
    const [text, setText] = useState('')

    const dispatch = useDispatch()
    // const { createSticker } = useSelector((store)=> store.sticker)
    const onSubmit = (e)=>{
        e.preventDefault()
        
        dispatch(createSticker(text))
    }
    const onChange = (e) => {
        setText(e.target.value)
    }
  return (
      <section>
          <form onSubmit={onSubmit} className="form">
              <div className='form-group'>
                  <label htmlFor='text'>Sticker</label>
                  <input type="text" value={text} onChange={onChange} name="text" id="text" />
              </div>
              <div className='form-group'>
                  <button type="submit" className='btn btn-block'>Add Sticker</button>
              </div>
          </form>
      </section>
  )
}

export default StickerForm