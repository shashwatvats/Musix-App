import React from 'react'

function Spinner() {
    return (
        <div className="d-flex h-100 align-items-center justify-content-center">
            <div className="spinner-border mx-auto mt-5" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    )
}

export default Spinner
