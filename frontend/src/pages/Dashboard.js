import { useEffect,useCallback} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner'
import StickerForm from '../components/StickerForm';
import StickerItem from '../components/StickerItem';
import { getStickers } from '../features/stickers/stickerSlice'


function Dashboard() {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { isLoading, isError, message, stickers } = useSelector((state) => state.sticker)
  const { authenticated } = useSelector((state) => state.auth)

  // console.log((authenticated))
  // console.log('stickers', stickers)
  const getAllStickers = useCallback(()=>{
    dispatch(getStickers())
  }, [dispatch])

  useEffect(() => {
    getAllStickers()
    // dispatch(getStickers())

    if (isError) {
      console.log(message);
    }
    if (!authenticated) {
      navigate('/login')
    }    
    

  }, [isError, message, authenticated, navigate, getAllStickers])


  if (isLoading) {
    return <Spinner />
  } 
  return (
    <>
      <section className='heading'>
        {/* <h1>Welcome {user && user.name}</h1> */}
        <h1>Welcome </h1>
        <p>Goals Dashboard</p>
      </section>
      <StickerForm />
      <section className='content'>
        {stickers.length > 0 ? (

          <div className='stickers'>
            {stickers.map((item) => (
              <StickerItem key={item._id} item={item} />
            ))}
          </div>

        ) : (<h3>You have not set any note</h3>)
        }
      </section>
    </>
  )
}

export default Dashboard