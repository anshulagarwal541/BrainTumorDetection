import React from 'react'

function GenerateReport() {
  return (
    <div className='bg-secondary min-h-[100vh] flex flex-col justify-center items-center gap-10'>
      <div className='flex flex-col justify-center items-center'>
        <p className='font-bold text-pink-200 text-xl'>To Know :-</p>
        <p className='text-pink-100 text-center text-sm w-[80%]'>
          Brain tumors disrupt brain function and increase pressure, requiring accurate detection and localization for better outcomes. 
          MRI is the primary diagnostic tool, but manual segmentation is labor-intensive and inconsistent. 
          Machine-operated segmentation addresses these issues with precision and reliability. 
          Advances in deep learning, particularly architectures like U-Net, have revolutionized brain tumor segmentation by extracting hierarchical features effectively.
          These methods ensure reproducible and efficient results, meeting the growing diagnostic demands.
        </p>
      </div>
      <div className='text-pink-100 font-bold text-3xl border-2 border-pink-100 rounded-xl w-fit px-5 py-2 bg-primary'>
        Report Generation
      </div>
      <div className='bg-primary text-pink-100  w-[70%]'>
        <form action="POST" className='p-5 rounded-xl border-2 border-pink-100 flex flex-col gap-5'>
          <div className='flex flex-col gap-1'>
            <label className='font-bold text-2xl text-center' htmlFor="mriScan">Add MRI Scan image :</label>
            <input type="file" placeholder='add image' className='bg-secondary rounded-xl px-5 py-4 border-1 border-pink-100' />
          </div>
          <button className='border-2 border-pink-100 w-full font-bold text-2xl rounded-xl py-3 bg-secondary'>
            Generate
          </button>
        </form>
      </div>
    </div>
  )
}

export default GenerateReport