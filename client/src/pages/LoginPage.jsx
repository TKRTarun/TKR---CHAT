import React, { useContext, useState } from 'react'
import assets from '../assets/assets'
import { AuthContext } from '../../context/AuthContext'

const LoginPage = () => {
  const [currState, setCurrState] = useState("Sign up")
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [bio, setBio] = useState("")
  const [isDataSubmitted, setIsDataSubmitted] = useState(false)

  const { login } = useContext(AuthContext)

  const onSubmitHandler = (event) => {
    event.preventDefault()

    if (currState === 'Sign up' && !isDataSubmitted) {
      setIsDataSubmitted(true)
      return
    }

    login(currState === "Sign up" ? 'signup' : 'login', {
      fullName,
      email,
      password,
      bio
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden bg-gradient-to-br from-[#1b002c] via-[#2c0044] to-[#12001f]">

      {/* Decorative floating gradients */}
      <div className="absolute w-[500px] h-[500px] bg-purple-600/40 blur-[180px] rounded-full top-[-10%] left-[-10%]"></div>
      <div className="absolute w-[450px] h-[450px] bg-violet-500/30 blur-[160px] rounded-full bottom-[-10%] right-[-10%]"></div>

      <div className="flex items-center justify-center gap-10 sm:gap-20 max-sm:flex-col relative z-10">

        {/* Left Logo */}
        <div className="flex items-center justify-center">
          <img
            src={assets.logo_big}
            alt="logo"
            className="
              w-[min(100vw,500px)]
              object-contain
              drop-shadow-[0_0_25px_rgba(168,85,247,0.75)]
              hover:drop-shadow-[0_0_40px_rgba(216,180,254,1)]
              transition-all duration-500
            "
          />
        </div>

        {/* Right Form */}
        <form
          onSubmit={onSubmitHandler}
          className="
            backdrop-blur-xl bg-white/10
            border border-white/20
            text-white p-8
            w-[330px] sm:w-[370px]
            flex flex-col gap-6 rounded-2xl
            shadow-[0_0_25px_rgba(255,255,255,0.15)]
            animate-fadeIn
          "
        >
          <h2 className="font-semibold text-3xl flex justify-between items-center tracking-wide">
            {currState}

            {isDataSubmitted && (
              <img
                onClick={() => setIsDataSubmitted(false)}
                src={assets.arrow_icon}
                alt=""
                className="w-5 cursor-pointer hover:scale-110 transition"
              />
            )}
          </h2>

          {/* Form Inputs */}
          {currState === "Sign up" && !isDataSubmitted && (
            <input
              onChange={(e) => setFullName(e.target.value)}
              value={fullName}
              type="text"
              className="p-3 bg-white/10 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Full Name"
              required
            />
          )}

          {!isDataSubmitted && (
            <>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="Email Address"
                required
                className="p-3 bg-white/10 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="Password"
                required
                className="p-3 bg-white/10 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </>
          )}

          {currState === "Sign up" && isDataSubmitted && (
            <textarea
              onChange={(e) => setBio(e.target.value)}
              value={bio}
              rows={4}
              className="p-3 bg-white/10 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Provide a short bio..."
              required
            ></textarea>
          )}

          {/* Button */}
          <button
            type="submit"
            className="
              py-3 rounded-md cursor-pointer
              bg-gradient-to-r from-purple-500 to-fuchsia-500
              hover:from-purple-400 hover:to-pink-500
              transition-all duration-300
              shadow-[0_0_20px_rgba(217,70,239,0.6)]
              font-medium tracking-wide
            "
          >
            {currState === "Sign up" ? "Create Account" : "Login Now"}
          </button>

          {/* Terms */}
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <input type="checkbox" />
            <p>Agree to the terms of use & privacy policy.</p>
          </div>

          {/* Toggle Login / Sign Up */}
          <div className="flex flex-col gap-1">
            {currState === "Sign up" ? (
              <p className="text-sm text-gray-300">
                Already have an account?{" "}
                <span
                  onClick={() => {
                    setCurrState("Login")
                    setIsDataSubmitted(false)
                  }}
                  className="font-semibold text-purple-300 cursor-pointer hover:text-purple-200"
                >
                  Login here
                </span>
              </p>
            ) : (
              <p className="text-sm text-gray-300">
                Create an account{" "}
                <span
                  onClick={() => setCurrState("Sign up")}
                  className="font-semibold text-purple-300 cursor-pointer hover:text-purple-200"
                >
                  Click here
                </span>
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
