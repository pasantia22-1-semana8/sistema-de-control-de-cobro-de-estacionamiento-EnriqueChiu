import React from 'react'

function PageLoading() {
  return (
    <div className="d-flex justify-content-center pt-5 mt-5">
      <h2>Loading...  </h2>
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  )
}

export default PageLoading