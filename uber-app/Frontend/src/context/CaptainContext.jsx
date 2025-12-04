import React, { createContext, useState } from 'react'


const CaptainDataContext = createContext(null)

const CaptainContext = ({ children }) => {
	const [ captain, setCaptain ] = useState({
		fullName: {
			firstName: '',
			lastName: ''
		},
		email: '',
		vehicle: {
			color: '',
			plate: '',
			capacity: '',
			vehicleType: ''
		},
		location: {
			ltd: null,
			lng: null

		},
		status: ''
	})
	return (
		<div>
			<CaptainDataContext.Provider value={{ captain, setCaptain }}>
				{children}
			</CaptainDataContext.Provider>
		</div>
	)
}

export default CaptainContext

