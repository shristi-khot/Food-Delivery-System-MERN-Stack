import React from 'react'
import './Header.css'



const Header = () => {
  return (
    <div className='Header'>
      <div className="Header-contents">
      <h2>Order Your Favourite Food Here</h2>
      <p>Choose from a diverse menu featuring a delectable array of Dishes crafted with finest ingredints and culinary expertise. Our Mission is to satisfy your cravings and elavte your dining experience, one delicious meal at a time</p>
      <button onClick={() => window.location.href = '#explore-menu'}>View Menu</button>
      </div>
    </div>
  )
}

export default Header
