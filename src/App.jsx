import { useEffect, useRef, useState } from "react"
import Header from "./components/Header"
import Main from "./components/Main"
import FileDisplay from "./components/FileDisplay"
import Information from "./components/Information"
import Transcribing from "./components/Transcribing"
import { MessageTypes } from "./utils/presets"

function App() {
  const [file, setFile] = useState(null)
  const [audistream, setAudiostream] = useState(null)
  const [output, setOutput] = useState(false)
  const [loading, setLoading] = useState(false)
  const [downloading, setDownloading] = useState(false)
  const [finished, setFinished] = useState(false)


  const isAudioAvailabe = file || audistream

  const handleAudioReset = () =>{
    setFile(null)
    setAudiostream(null)
  }

  const worker = useRef(null)

  useEffect(()=>{
    if(!worker.current){
      worker.current = new Worker(new URL('./utils/Worker.js', import.meta.url), {
        type: 'module'
      })
    }

    const onMessageReceived = async (e) => {
      switch(e.data.type){
        case 'DOWNLOADING':
          setDownloading(true)
          console.log('DOWNLOADING')
          break;
        case 'LOADING':
          setLoading(true)
          console.log('LOADING')
          break;
        case 'RESULT':
          setOutput(e.data.results)
          console.log(e.data.results);
          
          break;
        case 'INFERENCE_DONE':
          setFinished(true)
          console.log('DONE')
          break;  
      }
    }
    
    worker.current.addEventListener('message', onMessageReceived)

    return () => worker.current.removeEventListener('message', onMessageReceived)
  })

  const readAudio = async (file) => {
    const samplingRate = 16000
    const audioContext = new AudioContext({ sampleRate: samplingRate })
    const response = await file.arrayBuffer()
    const decoded = await audioContext.decodeAudioData(response)
    const audio = decoded.getChannelData(0)
    return audio
  }

  const handleFileSubmission = async() => {
    if (!file && !audistream) { return }

    let audio = await readAudio(file ? file : audistream)
    const model_name = 'openai/whisper-tiny.en'

    worker.current.postMessage({
      type: MessageTypes.INFERENCE_REQUEST,
      audio,
      model_name,
    })
  }

  return (
    <div className="flex flex-col p-4 mx-auto w-full">
      <section className="min-h-screen flex flex-col">
        <Header />
        {output ? <Information /> : 
        loading ? <Transcribing /> : 
        isAudioAvailabe ? <FileDisplay 
          file={file} 
          audistream={audistream} 
          handleAudioReset={handleAudioReset}
          handleFileSubmission={handleFileSubmission}
        />
        : 
        (<Main 
          setFile={setFile} 
          setAudiostream={setAudiostream} 
        />)}
       
        
      </section>
    </div>
  )
}

export default App
