import React from 'react'

const Transcribing = ({ downloading }) => {
  return (
    <div className='flex items-center flex-col justify-center gap-10 md:gap-14 padding'>
        <div className='flex flex-col text-center gap-2 sm:gap-4'>
            <h1 className='text-blue-400 text-5xl md:text-6xl sm:text-7xl font-bold'>Transcribing</h1>
            <p>{!downloading ? 'Getting ready to transcibe' : 'Audio transcibed'}</p>
        </div>
        <div className="flex flex-col gap-3 sm:gap-4 max-w-[500px] w-full main">
            {[0, 1, 2].map(value => {
                return (
                    <div key={value} className={'bg-linear-to-r from-cyan-500 to-blue-400 rounded-full h-2 sm:h-3 loading ' + `loading${value}`}></div>
                )
            })}
        </div>
    </div>
  )
}

export default Transcribing