import React, { useState } from 'react'
import Transcription from './Transcription'
import Translation from './Translation'

const Information = () => {
    const [tab, setTab] = useState('transcription')
  return (
    <main className="main flex-1 flex flex-col w-100 max-w-pros max-w-full justify-center p-4 gap-3 md:gap-4 sm:gap-4 w-full text-center pb-20">
        <h1 className='margin-bottom text-center text-5xl md:text-6xl sm:text-7xl font-semibold whitespace-nowrap'>
            Your <span className='text-blue-400'>Transcription</span>
        </h1>
        <div className="grid grid-cols-2 items-center  main boarder bg-white border-3 border-blue-300 rounded-full border-solid shadow overflow-hidden ">
            <button onClick={()=>setTab('transcription')} className={'btn duration-200 text-medium ' + (tab === 'transcription'? 'bg-blue-300 text-white' : 'text-blue-400 hover:text-blue-500')}>Transcribe</button>
            <button onClick={()=>setTab('translation')} className={'btn duration-200 text-medium ' + (tab === 'translation'? 'bg-blue-300 text-white' : 'text-blue-400 hover:text-blue-500')}>Translate</button>
        </div>
        {tab === 'transcription' && <Transcription/>}
        {tab === 'translation' && <Translation/>}
    </main>
  )
}

export default Information