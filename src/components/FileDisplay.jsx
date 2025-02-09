import React from 'react'

const FileDisplay = ({ file, audiostream, handleAudioReset, handleFileSubmission }) => {
  return (
    <main className="main flex-1 flex flex-col w-100 sm:w-96 max-w-full justify-center p-4 gap-3 md:gap-4 sm:gap-5 text-center pb-20">
        <h1 className='margin-bottom text-5xl md:text-6xl sm:text-7xl font-semibold'>Your <span className='text-blue-400'>File</span></h1>
        <div className=" flex flex-col text-left">
            <h3 className="text-[19px] font-semibold">Name</h3>
            <p>{file?file.name:'Custom audio'}</p>
        </div>
        <div className="margin flex items-center justify-between gap-4" >
            <button onClick={handleAudioReset} className='text-slate-400 duration-200 hover:text-blue-400 text-[19px]'>Reset</button>
            <button onClick={handleFileSubmission} className="special-button rounded-lg text-blue-400">Transcribe</button>
        </div>
    </main>
  )
}

export default FileDisplay