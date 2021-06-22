import React, { useState } from 'react'
import Scheduler from './Scheduler'
import Stripe from './Stripe'
import Confirmation from './Confirmation'

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
                <Scheduler />
            ) : pageNumber === 2 ? (
                <Stripe />
            ) : pageNumber === 3 ? (
                <Confirmation />
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
