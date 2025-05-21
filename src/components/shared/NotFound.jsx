import React from 'react'
import NoDataFound from '@/assets/svg/NoDataFound'

const NotFound = ({ message = 'No data found!' } = {}) => {
    return (
        <div className="text-center mt-20">
            <div className="flex justify-center">
                <NoDataFound height={280} width={280} />
            </div>
            <h3 className="mt-8">{message}</h3>
        </div>
    )
}

export default NotFound
