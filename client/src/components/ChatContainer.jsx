import React, { useContext, useEffect, useRef, useState } from 'react'
import assets from '../assets/assets'
import { formatMessageTime } from '../lib/utils'
import { ChatContext } from '../../context/ChatContext'
import { AuthContext } from '../../context/AuthContext'
import toast from 'react-hot-toast'

const ChatContainer = () => {
  const { messages, selectedUser, setSelectedUser, sendMessage, getMessages } = useContext(ChatContext)
  const { authUser, onlineUsers } = useContext(AuthContext)
  const scrollEnd = useRef()
  const [input, setInput] = useState('')

  // Send text message
  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (input.trim() === '') return
    await sendMessage({ text: input.trim() })
    setInput('')
  }

  // Send image message
  const handleSendImage = async (e) => {
    const file = e.target.files[0]
    if (!file || !file.type.startsWith('image/')) {
      toast.error('Select an image file')
      return
    }
    const reader = new FileReader()
    reader.onloadend = async () => {
      await sendMessage({ image: reader.result })
      e.target.value = ''
    }
    reader.readAsDataURL(file)
  }

  useEffect(() => {
    if (selectedUser) getMessages(selectedUser._id)
  }, [selectedUser])

  useEffect(() => {
    if (scrollEnd.current && messages) {
      scrollEnd.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  // If a user is selected
  if (selectedUser) {
    return (
      <div className="relative h-full flex flex-col backdrop-blur-xl bg-[#1a0c33]/40 border-l border-r border-white/10 rounded-r-2xl overflow-hidden shadow-[0_0_50px_rgba(127,93,255,0.25)]">

        {/* Header */}
        <div className="flex items-center justify-between gap-3 p-4 border-b border-gray-600 bg-[#1f0f44]/70 backdrop-blur-md shadow-sm">
          <div className="flex items-center gap-3">
            <img
              src={selectedUser.profilePic || assets.avatar_icon}
              alt=""
              className="w-10 h-10 rounded-full ring-2 ring-violet-500"
            />
            <div className="flex flex-col">
              <p className="text-white font-semibold flex items-center gap-2">
                {selectedUser.fullName}
                {onlineUsers.includes(selectedUser._id) && (
                  <span className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></span>
                )}
              </p>
              <span className="text-gray-400 text-xs">
                {onlineUsers.includes(selectedUser._id) ? 'Online' : 'Offline'}
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <img onClick={() => setSelectedUser(null)} src={assets.arrow_icon} alt="" className="w-6 md:hidden cursor-pointer hover:scale-110 transition"/>
            <img src={assets.help_icon} alt="" className="w-5 max-md:hidden cursor-pointer hover:scale-110 transition"/>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-scroll p-4 flex flex-col gap-3 scrollbar-thin scrollbar-thumb-purple-500/40 scrollbar-track-transparent">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex items-end gap-3 ${msg.senderId === authUser._id ? 'justify-end' : 'justify-start'}`}
            >
              {msg.senderId !== authUser._id && (
                <img
                  src={selectedUser.profilePic || assets.avatar_icon}
                  alt=""
                  className="w-8 h-8 rounded-full ring-1 ring-violet-400"
                />
              )}
              {msg.image ? (
                <img
                  src={msg.image}
                  alt=""
                  className={`max-w-[250px] rounded-xl shadow-lg hover:scale-105 transition-transform`}
                />
              ) : (
                <p
                  className={`p-3 max-w-[250px] break-words rounded-xl text-white font-light ${
                    msg.senderId === authUser._id
                      ? 'bg-gradient-to-br from-purple-500 to-fuchsia-500 rounded-br-none shadow-md animate-fadeIn'
                      : 'bg-[#2c0044] rounded-bl-none shadow-md animate-fadeIn'
                  }`}
                >
                  {msg.text}
                </p>
              )}
              {msg.senderId === authUser._id && (
                <img
                  src={authUser?.profilePic || assets.avatar_icon}
                  alt=""
                  className="w-8 h-8 rounded-full ring-1 ring-purple-400"
                />
              )}
              <span className="text-gray-400 text-xs flex items-end">{formatMessageTime(msg.createdAt)}</span>
            </div>
          ))}
          <div ref={scrollEnd}></div>
        </div>

        {/* Input */}
        <div className="flex items-center gap-3 p-3 bg-[#1f0f44]/60 backdrop-blur-md border-t border-gray-600">
          <div className="flex-1 flex items-center bg-[#2c0044]/50 px-3 py-2 rounded-full shadow-inner hover:shadow-purple-600/50 transition">
            <input
              type="text"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(e)}
              className="flex-1 bg-transparent outline-none text-white placeholder-gray-400 text-sm"
            />
            <input type="file" id="image" accept="image/png, image/jpeg" hidden onChange={handleSendImage} />
            <label htmlFor="image" className="cursor-pointer">
              <img src={assets.gallery_icon} alt="" className="w-5 hover:scale-110 transition"/>
            </label>
          </div>
          <button onClick={handleSendMessage} className="bg-gradient-to-r from-purple-500 to-fuchsia-500 p-3 rounded-full shadow-lg hover:scale-110 transition">
            <img src={assets.send_button} alt="" className="w-6"/>
          </button>
        </div>
      </div>
    )
  }

  // Empty state with attractive logo and shapes
  return (
    <div className="relative flex flex-col items-center justify-center gap-6 text-white backdrop-blur-xl bg-[#1a0c33]/50 rounded-3xl p-12 border border-white/20 shadow-[0_0_40px_rgba(127,93,255,0.35)] overflow-hidden">

      {/* Decorative floating gradient blobs */}
      <div className="absolute top-[-40px] left-[-40px] w-40 h-40 bg-purple-500/30 rounded-full blur-3xl animate-blob"></div>
      <div className="absolute bottom-[-30px] right-[-50px] w-48 h-48 bg-fuchsia-400/30 rounded-full blur-2xl animate-blob animation-delay-2000"></div>
      <div className="absolute top-20 right-[-30px] w-32 h-32 bg-cyan-400/40 rounded-full blur-2xl animate-blob animation-delay-4000"></div>

      {/* Logo */}
      <img 
        src={assets.logo_icon} 
        className="w-70 sm:w-74 md:w-84 hover:scale-110 transition-transform duration-500 rounded-xl drop-shadow-[0_0_50px_rgba(168,85,247,0.8)]" 
        alt="Logo" 
      />

      {/* Text */}
      <p className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-violet-400 via-cyan-300 to-fuchsia-400 bg-clip-text text-transparent animate-pulse text-center">
        Chat anytime, anywhere
      </p>

      {/* Blob animation styles */}
      <style>
        {`
          @keyframes blob {
            0%, 100% { transform: translate(0, 0) scale(1); }
            33% { transform: translate(15px, -10px) scale(1.1); }
            66% { transform: translate(-10px, 15px) scale(0.9); }
          }
          .animate-blob { animation: blob 8s infinite; }
          .animation-delay-2000 { animation-delay: 2s; }
          .animation-delay-4000 { animation-delay: 4s; }
        `}
      </style>
    </div>
  )
}

export default ChatContainer
