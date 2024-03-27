import { useSelector } from 'react-redux';
import useMovieTrailer from '../hooks/useMovieTrailer'

const VideoBackground = ({movieId}) => {

  const trailerVideo = useSelector(store=>store.movies?.trailerVideo);

  useMovieTrailer(movieId)

  return (
    <div className='w-screen aspect-video'>
      <iframe
      className='w-screen aspect-video '
        src={"https://www.youtube.com/embed/"+ trailerVideo?.key +"?modestbranding=1&controls=1&showinfo=0&rel=0&autoplay=1&mute=1&loop=1"}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoBackground;




// hXzcyx9V0xw
// "https://www.youtube.com/embed/hXzcyx9V0xw?&autoplay=1&mute=1"
// className='w-screen aspect-video'

//{"https://www.youtube.com/embed/"+ trailerVideo?.key +"?rel=0&amp&fs=0&amp&showinfo=0&autoplay=1&mute=1"}