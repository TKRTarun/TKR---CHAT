import React, { useContext, useEffect, useState } from 'react'
import assets from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { ChatContext } from '../../context/ChatContext'

const Sidebar = () => {
    const { getUsers, users, selectedUser, setSelectedUser, unseenMessages, setUnseenMessages } = useContext(ChatContext)
    const { logout, onlineUsers } = useContext(AuthContext)
    const [input, setInput] = useState('')
    const navigate = useNavigate()

    const filteredUsers = input
        ? users.filter((user) =>
            user.fullName.toLowerCase().includes(input.toLowerCase())
        )
        : users

    useEffect(() => {
        getUsers()
    }, [onlineUsers])

    return (
        <div
            className={`bg-[#1a0f33]/50 backdrop-blur-lg h-full p-5 rounded-r-2xl overflow-y-scroll text-white border border-white/20 shadow-[0_0_30px_rgba(127,93,255,0.25)] ${selectedUser ? "max-md:hidden" : ''}`}
        >
            {/* ---------------- LOGO + MENU ---------------- */}
            <div className='pb-5'>
                <div className='flex justify-between items-center'>
                    {/* Holographic Logo */}
                    <div className="relative flex items-center justify-center">
                        <div
                            className="absolute w-[100px] h-[100px] rounded-xl bg-gradient-to-br from-purple-600/40 via-fuchsia-500/30 animate-pulse blur-2xl"
                        ></div>
                        <img
                            src={assets.logo}
                            alt="logo"
                            className="relative z-10 w-[120px] object-contain rounded-xl drop-shadow-[0_0_20px_rgba(168,85,247,0.75)] hover:drop-shadow-[0_0_40px_rgba(217,70,239,1)] transition-all duration-500 hover:scale-105"
                        />
                    </div>

                    {/* MENU DROPDOWN */}
                    <div className="relative py-2 group">
                        <img src={assets.menu_icon} alt="Menu" className='max-h-5 cursor-pointer' />
                        <div className='absolute top-full right-0 z-20 w-36 p-5 rounded-md bg-[#282142]/90 border border-gray-600 text-gray-100 hidden group-hover:block shadow-lg'>
                            <p onClick={() => navigate('/profile')} className='cursor-pointer text-sm hover:text-purple-300 transition'>Edit Profile</p>
                            <hr className="my-2 border-t border-gray-500" />
                            <p onClick={() => logout()} className='cursor-pointer text-sm hover:text-purple-300 transition'>Logout</p>
                        </div>
                    </div>
                </div>

                {/* ---------------- SEARCH BAR ---------------- */}
                <div className='bg-[#282142]/80 rounded-full flex items-center gap-2 py-3 px-4 mt-5 shadow-inner'>
                    <img src={assets.search_icon} alt="Search" className='w-3' />
                    <input
                        onChange={(e) => setInput(e.target.value)}
                        value={input}
                        type="text"
                        className='bg-transparent border-none outline-none text-white text-xs placeholder-gray-400 flex-1'
                        placeholder='Search User...'
                    />
                </div>
            </div>

            {/* ---------------- USER LIST ---------------- */}
            <div className='flex flex-col gap-2'>
                {filteredUsers.map((user, index) => (
                    <div
                        onClick={() => {
                            setSelectedUser(user)
                            setUnseenMessages(prev => ({ ...prev, [user._id]: 0 }))
                        }}
                        key={index}
                        className={`
                            relative flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-300
                            ${selectedUser?._id === user._id ? 'bg-[#3b1a63]/60 shadow-lg scale-105' : 'hover:bg-[#2c0044]/50 hover:scale-105'}
                        `}
                    >
                        <div className="relative">
                            <img
                                src={user?.profilePic || assets.avatar_icon}
                                alt=""
                                className='w-[40px] h-[40px] rounded-full border-2 border-purple-500 hover:scale-110 transition-transform'
                            />
                            {onlineUsers.includes(user._id) && (
                                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-400 ring-1 ring-white animate-pulse"></span>
                            )}
                        </div>

                        <div className='flex flex-col leading-5'>
                            <p className='font-medium'>{user.fullName}</p>
                            <span className={`text-xs ${onlineUsers.includes(user._id) ? 'text-green-400' : 'text-gray-400'}`}>
                                {onlineUsers.includes(user._id) ? 'Online' : 'Offline'}
                            </span>
                        </div>

                        {unseenMessages[user._id] > 0 && (
                            <span className='absolute top-3 right-3 flex justify-center items-center w-5 h-5 text-xs rounded-full bg-violet-500/70 shadow-md animate-pulse'>
                                {unseenMessages[user._id]}
                            </span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Sidebar
