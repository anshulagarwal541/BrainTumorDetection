import React from 'react'
import NavBar from '../components/NavBar';
import { hero_image4 } from '../../public';

function Home() {
  return (
    <div className='min-h-[100vh] bg-extend-secondary'>
      <NavBar />
      <div
        style={{
          backgroundImage: `url(${hero_image4})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover'
        }}
        className='relative h-[100vh]'
      >
        <div className='absolute top-0 backdrop-brightness-[25%] text-extend-secondary flex justify-center items-center h-full w-full'>
          <div className='h-fit w-fit flex flex-col gap-5 justify-center items-center brightness-100 text-pink-200 text-5xl font-bold'>
            <p>Brain Tumor Detection</p>
            <p className='text-center  font-semibold text-sm w-[70%] text-pink-400'>A brain tumor is an abnormal growth of cells in or around the brain, which can be benign (non-cancerous) or malignant (cancerous). 
              It can arise from brain tissues or spread from other parts of the body.
               Symptoms may include headaches, seizures, vision problems, or changes in cognitive and motor functions. 
               Diagnosis typically involves imaging tests like MRI or CT scans, and treatment options include surgery, radiation therapy, chemotherapy, or targeted therapies.
                Early detection and intervention are crucial for improving outcomes.</p>
              <p className='text-pink-900 bg-pink-200 border-2 border-pink-900 px-5 py-2 rounded-full'>WELCOME</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home