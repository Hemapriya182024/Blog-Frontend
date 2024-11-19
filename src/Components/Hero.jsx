import React from 'react'

const Hero = () => {
  return (
    <div className='flex flex-col sm:flex-row bg-gray-900  text-blue-500 hover:text-blue-400'>
        {/* Hero left side */}
        <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
            <div className=' text-blue-500 hover:text-blue-400'>
                <div className='flex items-center gap-2'>
                    <p className='w-8 md:w-11 h-[2px] bg-blue-500'></p>
                    <p className='font-medium text-sm md:text-base'>OUR LATEST POSTS</p>
                </div>
                <h1 className='text-3xl sm:py-3 lg:text-5xl leading-relaxed font-semibold'>EXPLORE OUR BLOG</h1>
                <div className='flex items-center gap-2'>

                    <p  className='font-semibold text-sm md:text-base'>Read More</p>
                    <p className='w-8 md:w-11 h-[2px] bg-blue-500'></p>
                </div>
            </div>
        </div>
        
        {/* Hero right side */}
        <div className='w-full sm:w-1/2  bg-gray-900'>
          <video className='w-full h-full object-cover rounded' autoPlay loop muted>
            <source src="/blog.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
    </div>
  )
}

export default Hero;
