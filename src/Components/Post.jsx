import React from 'react'
import '../index.css';

const Post = () => {
  return (
    <div>
          <div className='post'>
        <div className='image'>
        <img src='https://techcrunch.com/wp-content/uploads/2024/11/GettyImages-2032109653-e.jpg?resize=1200,800' />
        </div>
      
        <div className="texts">
          <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit. c tempora quia.</h2>
          <p className="info">
            <a href="" className="author" > Hema</a>
            <time>2023-9-01 16:45</time>
          </p>
          <p className='summary'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officia velit nobis eius, .</p>
        </div>


      </div>
     
      
    </div>
  )
}

export default Post
