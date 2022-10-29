import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../Styling/CardCast.css'
import { Card, } from 'react-bootstrap'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "../Styling/CardMovie.css";

export default function CardCast({ movie }) {
    const navigation = useNavigate()
    console.log(`ini cast ${movie}`)
    return (

        <>
            <div className='container movie_cast'>
                <h1 className='header'> Movie Cast and Crew Info</h1>
                <Swiper
                    slidesPerView={4}
                    spaceBetween={30}
                    className="mySwiper">
                    {movie && movie.map((items, index) => {
                        return (

                            <SwiperSlide key={index}>
                                <Card key={index}
                                    className='card'
                                    border="light"
                                    style={{ width: '15rem', cursor: 'pointer', border: 'none' }}
                                    onClick={() => navigation(`/${items.id}`)} >
                                    <div className='image'>
                                        <img
                                            className='image_img'
                                            src={`https://image.tmdb.org/t/p/w500${items.profile_path}`}
                                            alt='img'
                                        />
                                    </div>
                                    <div className='image_overlay'>
                                        <div className='image_description'>
                                            <Card.Text className='d-flex text-center'>
                                                {items.name}  <br /> as  <br /> {items.character}
                                            </Card.Text>
                                        </div>
                                    </div>
                                </Card>
                            </SwiperSlide>


                        )
                    }
                    )}
                </Swiper>
            </div>

        </>
    )
}
