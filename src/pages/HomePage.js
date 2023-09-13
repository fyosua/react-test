import React from 'react'
import useFetch from '../hooks/useFetch'
import { Link } from 'react-router-dom'

export default function HomePage() {
  const { loading, error, data } = useFetch(process.env.REACT_APP_API_URL+'reviews')

  if(loading) return <p>Loading...</p>
  if(error) return <p>Error</p>

  return (
    <div>
        {data.data.map(review => (
          <div key={review.id} className='review-card'>
            <div className='rating'>{review.attributes.rating}</div>
            <h2>{review.attributes.title}</h2>

            <small></small>

            <p>{review.attributes.body.substring(0, 200)}...</p>
            <Link to={`details/${review.id}`}>Read More</Link>
          </div>
        ))}
    </div>
  )
}
