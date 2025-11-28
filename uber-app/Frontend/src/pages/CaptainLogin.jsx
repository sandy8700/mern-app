import React from 'react'
import { Link } from 'react-router-dom'

const CaptainLogin = () => {
  

  return (
    <>
      <div className="p-7 min-h-screen flex flex-col justify-between bg-white">
        <img
          className="w-16 mb-10"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s"
          alt=""
        />
        <div>
          <form>
            <div className="form-group">
              <label htmlFor="email" className="inline-block font-bold">
                What's your email
              </label>
              <input
                type="email"
                className="bg-[#eeeeee] mb-7 rounded-sm px-4 py-2 w-full text-lg placeholder:text-base"
                placeholder="email@example.com"
              />
            </div>
            <div className="form-group mt-3">
              <label htmlFor="password" className="inline-block font-bold">
                Enter Password
              </label>
              <input
                type="password"
                className="bg-[#eeeeee] mb-7 rounded-sm px-4 py-2 w-full text-lg placeholder:text-base"
                placeholder="Password"
              />
            </div>
            <button className="bg-[#111] text-white font-semibold mb-3 rounded-sm px-4 py-2 w-full text-lg placeholder:text-base">
              Login
            </button>
          </form>
          <p className="text-center">
            Join a Fleet?{" "}
            <Link to="/captain-signup" className="text-blue-600">
              Resgiter as a Captain
            </Link>
          </p>
        </div>
        <Link
          to="/user-login"
          className="bg-[#d76d1e] flex items-center justify-center text-white font-semibold mb-5 rounded-sm px-4 py-2 w-full text-lg placeholder:text-base"
        >
          Sign in as User
        </Link>
      </div>
    </>
  )
}

export default CaptainLogin
