import React from 'react';
import { hero_image4 } from '../../../public';

function AdminHome() {
  return (
    <div className='min-h-[100vh] bg-secondary'>
      <div
        style={{
          backgroundImage: `url(${hero_image4})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover'
        }}
        className='relative h-[100vh]'
      >
        <div className='absolute top-0 backdrop-brightness-[15%] text-extend-secondary flex justify-center items-center h-full w-full'>
          <div className='h-fit w-fit flex flex-col gap-9 justify-center items-center text-pink-400 text-5xl font-bold px-4'>
            {/* Heading */}
            <p className='text-pink-500 text-center'>
              Brain Tumor Detection
            </p>
            <p className='text-pink-100 bg-primary px-5 py-3 rounded-full text-center'>
              Admin's Page
            </p>

            {/* Description */}
            <p className='text-center text-sm w-full sm:w-[80%] md:w-[70%] lg:w-[60%]'>
              Our Brain Tumor Detection platform offers AI-powered tools to analyze brain scans and detect potential tumors early. We provide educational resources, connect you with specialists, and ensure your privacy and security. Early diagnosis can save lives—take control of your health today.
            </p>

            {/* Quote */}
            <p className='text-center text-xl w-full sm:w-[80%] md:w-[70%] lg:w-[60%] text-pink-700'>
              "Early detection is the key to better outcomes—empower yourself with knowledge and take the first step towards a healthier future."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
