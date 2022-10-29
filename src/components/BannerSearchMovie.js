import React from 'react'
import '../Styling/BannerSearchMovie.css'
export default function BannerSearchMovie({ query }) {
    console.log(query)
    return (
        <>
            <div className=' banner_wrapper'>
                <div className='result_search'>
                    <div className='container detail_search'>
                        <h1>All movies "{query}"</h1>
                    </div>
                </div>
                <img
                    className='img_banner_search'
                    src='/bannerSearchPages.png'
                    alt='bannerSearch'
                />
            </div>
        </>
    )
}
