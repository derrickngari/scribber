import React, { useEffect, useRef, useState } from 'react'

const Main = ({ setFile, setAudiostream }) => {
  const [recordingStatus, setRecordingStatus] = useState('inactive')
  const [audioChunks, setAudioChunks] = useState([])
  const [duration, setDuration] = useState(0)

  const mediaRecorderRef = useRef(null)

  const mimeType = 'audio/webm'

  const startRecording = async () => {
    let tempStream
    try {
      const streamData = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false
      })
      tempStream = streamData
    } catch (error) {
      console.log(error)
      return
    }

    setRecordingStatus('recording')

    ///create new recording instance using the stream data
    const media = new MediaRecorder(tempStream, {type: mimeType})
    mediaRecorderRef.current = media

    mediaRecorderRef.current.start()
    let localAudioChunks = []
    mediaRecorderRef.current.ondataavailable = (event) => {
      if (typeof event.data === 'undefined') 
      if (event.data.size === 0) return
      localAudioChunks.push(event.data)
    }

    setAudioChunks(localAudioChunks)
  
  }

  const stopRecording = async () => {
    setRecordingStatus('inactive')
    console.log("Stopped recording")

    mediaRecorderRef.current.stop()
    mediaRecorderRef.current.onstop = () => {
      const audioBlob = new Blob(audioChunks, {type: mimeType})
      setAudiostream(audioBlob)
      setAudioChunks([])
      setDuration(0)
    }   
  }

  //counter for recording time nfor every second
  useEffect(() => {
    if (recordingStatus === 'inactive') {return}

    const timer = setInterval(() => {
      setDuration(prevDuration=>prevDuration + 1)
    }, 1000)

    return () => clearInterval(timer)
  })

  return (
    <main className="flex-1 flex flex-col justify-center p-4 gap-3 md:gap-4 sm:gap-5 text-center pb-20">
        <h1 className='text-blue-400 text-5xl md:text-6xl sm:text-7xl font-semibold'>Scribber</h1>
        <h3 className='font-medium text-[20px] md:text-lg'>
            Record
            <span className='text-blue-500'>&rarr;</span>
            Transcibe
            <span className='text-blue-500'>&rarr;</span>
            Translate
        </h3>
        <button onClick={recordingStatus === 'inactive'? startRecording: stopRecording} className='ctn flex justify-between text-[17px] my-10 items-center text-base gap-4 mx-auto max-w-full w-72 special-button rounded-xl'>
            <p className='text-[17px] text-blue-500 cursor-pointer'>{recordingStatus === 'inactive'?'Record':'Stop recording'}</p>
            <div className='flex items-center gap-2'>
              {duration !== 0 && (
                <p className='text-sm text-slate-800'>{duration}s</p>
              )}
                <i className={"fa fa-microphone hover:text-blue-500 duration-200 text-slate-800 cursor-pointer" + 
                  (recordingStatus === 'recording' ? 'text-rose-300':'')}></i>
             </div>
        </button>
        <p>Or <label className='text-blue-500 hover:text-blue-600 cursor-pointer duration-200'>
                Upload <input onChange={(e)=>setFile(e.target.files[0])} type="file" className='' hidden accept='.mp3,.wave'/></label> a mp3 file</p>
    </main>
  )
}

export default Main