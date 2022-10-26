import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, } from 'react-bootstrap'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "../Styling/CardMovie.css";
import { BsFillStarFill } from "react-icons/bs";


export default function CardMovie({ database }) {
    console.log(database)
    const navigation = useNavigate()

    return (
        <div className='container card_wrapper'>
            <Swiper
                slidesPerView={4}
                spaceBetween={30}
                className="mySwiper">
                {database && database.map((items, index) => {
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
                                        src={`https://image.tmdb.org/t/p/w500${items.poster_path}`}
                                        alt='card'
                                    />
                                </div>
                                <div className='image_overlay'>
                                    <div className='image_title'><Card.Title>{items.title}</Card.Title></div>
                                    <div className='image_description'>
                                        <Card.Text className='d-flex'>
                                            <BsFillStarFill className='stars' size={23} />
                                            {items.vote_average}
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
    )
}
