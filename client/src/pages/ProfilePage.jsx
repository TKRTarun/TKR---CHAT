import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import assets from '../assets/assets';
import { AuthContext } from '../../context/AuthContext';

const ProfilePage = () => {

  const {authUser, updateProfile} = useContext(AuthContext)

  const [selectedImg, setSelectedImg] = useState(null)
  const navigate = useNavigate();
  const [name, setName] = useState(authUser.fullName)
  const [bio, setBio] = useState(authUser.bio)

  const handleSubmit = async (e)=>{
    e.preventDefault();
    if(!selectedImg){
      await updateProfile({fullName: name, bio});
      navigate('/');
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(selectedImg);
    reader.onload = async ()=>{
      const base64Image = reader.result;
      await updateProfile({profilePic: base64Image, fullName: name, bio});
      navigate('/');
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-[#1b002c] via-[#2c0044] to-[#12001f]'>
      
      {/* Animated Background Blobs */}
      <div className="absolute w-[500px] h-[500px] bg-purple-600/40 blur-[180px] rounded-full top-[-10%] left-[-10%] animate-pulse"></div>
      <div className="absolute w-[450px] h-[450px] bg-violet-500/30 blur-[160px] rounded-full bottom-[-10%] right-[-10%] animate-pulse"></div>

      <div className='w-5/6 max-w-3xl backdrop-blur-xl border border-white/20 flex items-center justify-between max-sm:flex-col-reverse rounded-2xl shadow-[0_0_30px_rgba(127,93,255,0.4)] relative z-10 bg-white/5 p-8 gap-10'>

        {/* Profile Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 flex-1 animate-fadeIn">
          <h3 className="text-2xl font-semibold text-white tracking-wide">Profile Details</h3>

          {/* Upload Avatar */}
          <label htmlFor="avatar" className='flex items-center gap-3 cursor-pointer group'>
            <input onChange={(e)=>setSelectedImg(e.target.files[0])} type="file" id='avatar' accept='.png, .jpg, .jpeg' hidden/>
            <div className="relative w-14 h-14 rounded-full overflow-hidden group-hover:scale-110 transition-transform duration-500 shadow-[0_0_15px_rgba(168,85,247,0.6)] hover:shadow-[0_0_25px_rgba(217,70,239,0.8)]">
              <img 
                src={selectedImg ? URL.createObjectURL(selectedImg) : assets.avatar_icon} 
                alt="" 
                className='w-full h-full object-cover'
              />
            </div>
            <span className='text-white text-sm tracking-wide'>Upload Profile Image</span>
          </label>

          {/* Name Input */}
          <input 
            onChange={(e)=>setName(e.target.value)} 
            value={name}
            type="text" 
            required 
            placeholder='Your name' 
            className='p-3 border border-purple-400/50 rounded-xl bg-white/10 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-1 transition-all duration-300'
          />

          {/* Bio Input */}
          <textarea 
            onChange={(e)=>setBio(e.target.value)} 
            value={bio} 
            placeholder="Write profile bio" 
            required 
            className="p-3 border border-purple-400/50 rounded-xl bg-white/10 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-1 transition-all duration-300" 
            rows={4}>
          </textarea>

          {/* Save Button */}
          <button 
            type="submit" 
            className="bg-gradient-to-r from-purple-400 to-violet-600 text-white p-3 rounded-full text-lg cursor-pointer font-semibold shadow-[0_0_20px_rgba(217,70,239,0.5)] hover:shadow-[0_0_35px_rgba(168,85,247,0.8)] transition-all duration-300"
          >
            Save
          </button>
        </form>

        {/* Profile Image Display */}
        <div className="relative max-sm:mb-8">
          <div className="w-44 h-44 max-sm:w-36 max-sm:h-36 rounded-full overflow-hidden border-4 border-violet-500/40 shadow-[0_0_25px_rgba(168,85,247,0.5)] hover:shadow-[0_0_45px_rgba(217,70,239,0.8)] transition-all duration-500 animate-pulse">
            <img 
              className="w-full h-full object-cover" 
              src={selectedImg ? URL.createObjectURL(selectedImg) : authUser?.profilePic || assets.logo_icon} 
              alt="profile"
            />
          </div>
          {/* Hologram Ring */}
          <div className="absolute inset-0 rounded-full border-2 border-gradient-to-br from-purple-500 via-pink-400 to-violet-500 animate-spin-slow pointer-events-none"></div>
        </div>

      </div>
    </div>
  )
}

export default ProfilePage;
