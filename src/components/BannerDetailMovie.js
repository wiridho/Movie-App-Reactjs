import React from 'react'
import '../Styling/BannerDetailMovie.css'
import { BsPlayCircle } from "react-icons/bs";


export default function BannerDetailMovie({ movie }) {
    return (
        <div className='bannerDetail'>
            <div key={movie.id}>
                <div className='' style={{
                    position: 'absolute',
                    width: "100%",
                    height: '600px',
                    backgroundImage: 'linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0))'
                }}>
                </div>
                <div className='detail_wrapper'>
                    <div className='container detail_movie'>
                        <h1>{movie.title}</h1>
                        <p className='secondary'>{movie.release_date}</p>
                        {movie.genres && movie.genres.map((item) =>
                            <span key={item.id}> {item.name}, </span>)}
                        <p >{movie.overview}</p>
                        <a className='movieLink' href={`https://www.youtube.com/results?search_query=${movie.title ? movie.title : movie.original_title} trailer`}>
                            <button className='trailer'>Watch Trailer <BsPlayCircle /></button>
                        </a>
                    </div>
                </div>
                <img className='image_movie'
                    style={{ backgroundImage: 'linear-gradient(to top, rgba(0,0,0,0), rgba(0,0,0,0))' }} src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt='teks' />
            </div>
        </div>

    )
}