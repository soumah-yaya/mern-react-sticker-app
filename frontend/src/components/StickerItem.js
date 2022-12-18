import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteSticker } from '../features/stickers/stickerSlice'
function StickerItem({item}) {
    
    const dispatch = useDispatch()
    

    const onRemoveSticker = () => {
        dispatch(deleteSticker(item._id))
    }
  return (
      <div className='sticker'>
          <div>
              <span>{item.createAt}</span>{new Date(item.createdAt).toLocaleString('en-US')}
          </div>
          <h2>{item.text}</h2>
          <button onClick={onRemoveSticker} className='close'>X</button>
      </div>
  )
}

export default StickerItem