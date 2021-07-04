import React, { useState } from 'react'
import ScheduleServiceModal from './Components/ScheduleServiceModal';

const Services = () => {
  const [scheduleServiceType, setScheduleServiceType] = useState(null)
  const services = [
    {
      type: 'Interior Detail',
      cost: 250,
      imgPath: 'InteriorDetail.jpg'
    },
    {
      type: 'Exterior Hand Wash',
      cost: 120,
      imgPath: 'HandWash.jpg'
    },
    {
      type: 'Exterior Hand Wash and Polish',
      cost: 400,
      imgPath: 'HandWashAndPaintPolish.jpg'
    },
    {
      type: 'Ceramic Coating',
      cost: 900,
      imgPath: 'CeramicCoating.jpg'
    },
    {
      type: 'Deep Scratch Repair',
      cost: 50,
      imgPath: 'ScratchRepair.jpg'
    },
  ]

  return (
    <div>
      {services.map((service, i) => (
        <div key={i}>
          <img src={`images/${service.imgPath}`} alt={service.type} />
          {service.type}: ${service.cost}
          <button onClick={() => setScheduleServiceType(service.type)}>
            Schedule
          </button>
        </div>
      ))}
      {scheduleServiceType ?
        <ScheduleServiceModal />
      : null}
    </div>
  )
}

export default Services