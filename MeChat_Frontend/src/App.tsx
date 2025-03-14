
import { useEffect, useState } from 'react'
import './App.css'
function App() {

  const  [messages, setMessages] = useState(['hi there', 'webcuiwrc', 'uvhbubiiiiibjbj']);

  useEffect(() => {
    const ws = new WebSocket("http://localhost:3000");
    ws.onmessage = (event) => {
      setMessages(m => [...m, event.data])
    }
  }, [])

  return (
    <div className='h-screen bg-black'>
      <br />
     <div className='h-[85vh]'>
     {messages.map(messages => <div className='flex gap-2'> 
      <span className='bg-white text-black rounded p-4 m-4'>{messages}</span>
      </ div>)}
     </div>
     <div className='w-full bg-white flex p-4'>
        <input type="text" className='flex-1'></input>
        <button className='bg-purple-600 text-white'>Send Message</button>
     </div>
    </div>
  )
}

export default App
