import React, { useState } from 'react'
import Calendar from '../../Calendar/Calendar'
import Checkout from '../../Stripe/Checkout'
import Success from '../../Stripe/Success'

const ScheduleServiceModal = ({
    scheduleServiceType,
    setScheduleServiceType
}) => {
    const [pageNumber, setPageNumber] = useState(1)

    return (
        <div style={{ height: '250px', width: '250px'}}>
            <h1>{scheduleServiceType}</h1>
            <button onClick={() => setScheduleServiceType(null)}>X</button>
            {pageNumber === 1 ? (
                <Calendar />
            ) : pageNumber === 2 ? (
                <Checkout />
            ) : pageNumber === 3 ? (
                <Success />
            ) : null}
            {pageNumber > 1 ? (
                <button onClick={() => setPageNumber(pageNumber-1)}>Previous</button>
            ) : null}
            {pageNumber < 3 ? (
                <button onClick={() => setPageNumber(pageNumber+1)}>Next</button>
            ) : null}
        </div>
    )
}

export default ScheduleServiceModal
