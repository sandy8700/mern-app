import React, { createContext, useState } from 'react'


const CaptainDataContext = createContext()

const CaptainContext = ({ children }) => {
	const [ captain, setCaptain ] = useState({
		email: '',
		fullName: {
			firstName: '',
			lastName: ''
		},
		licenseNumber: '',
		vehicle: {
			make: '',
			model: '',
			plate: ''
		},
		isAvailable: false
	})

	return (
		<div>
			<CaptainDataContext.Provider value={{ captain, setCaptain }}>
				{children}
			</CaptainDataContext.Provider>
		</div>
	)
}

export { CaptainDataContext }
export default CaptainContext

