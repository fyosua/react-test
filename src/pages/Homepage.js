import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'

import Paginate from '../Paginate';

const REVIEWS = gql`
  query GetReviews($page: Int!, $size: Int!) {
    reviews(pagination: { page: $page, pageSize: $size }) {
      data{
        id,
        attributes{
          title,
          body,
          rating,
          categories {
            data{
              id,
              attributes{
                name
              }
            }
          }
        }
      },
      meta {
        pagination {
          page
          pageSize
          total
          pageCount
        }
      }
    }
  }
`

export default function Homepage() {
  //paging
  const postsPerPage = 2
  const [currentPage, setCurrentPage] = useState(1);

  const paginate = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	const previousPage = () => {
		if (currentPage !== 1) {
			setCurrentPage(currentPage - 1);
		}
	};

	const nextPage = () => {
		if (currentPage !== Math.ceil(data.reviews.meta.pagination.total / postsPerPage)) {
			setCurrentPage(currentPage + 1);
		}
	};

  //Appollo
  const { loading, error, data } = useQuery(REVIEWS, {
    variables: { 
      page: parseInt(currentPage) ? parseInt(currentPage) : 1,
      size: parseInt(postsPerPage)
     }
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  console.log(data)

  return (
    <div>
      {data.reviews.data.map(review => (
        <div key={review.id} className="review-card">
          <div className="rating">{review.attributes.rating}</div>
          <h2>{review.attributes.title}</h2>
          
          {review.attributes.categories.data.map(c => (
            <small key={c.id}>{c.attributes.name}</small>
          ))}

          <p>{review.attributes.body.substring(0, 200)}...</p>
          <Link to={`/details/${review.id}`}>Read more</Link>
        </div>
      ))}
      <Paginate
        postsPerPage={postsPerPage}
        totalPosts={data.reviews.meta.pagination.total}
        currentPage={data.reviews.meta.pagination.page}
        paginate={paginate}
        previousPage={previousPage}
        nextPage={nextPage}
			/>
    </div>
  )
}
