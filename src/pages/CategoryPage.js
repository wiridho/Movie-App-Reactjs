import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import CardMovie from '../components/CardMovie'
import BannerSearchMovie from '../components/BannerSearchMovie'
import FooterSection from '../components/FooterSection'

export default function CategoryPage() {
    const { id, genre } = useParams()
    const [dataGenre, setDataGenre] = useState([])
    const apiKey = '39d534102975349064b234a5f47263bb'

    useEffect(() => {
        loadGenre()
    })

    const loadGenre = async () => {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${id}`)
            setDataGenre(response.data.results)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div>
                <BannerSearchMovie query={genre} />
                <CardMovie database={dataGenre} />
                <FooterSection />
            </div>
        </>
    )
}
