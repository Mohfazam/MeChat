
import { useEffect, useState, useRef } from 'react'
import './App.css'
function App() {

  const  [messages, setMessages] = useState(['hi there', 'webcuiwrc']);
  const wsRef = useRef();

  useEffect(() => {
    const ws = new WebSocket("http://localhost:8080");
    ws.onmessage = (event) => {
      setMessages(m => [...m, event.data])
    }
    wsRef.current = ws;
    ws.onopen = () => {
      ws.send(JSON.stringify(
        {
          type: "join",
          payload: {
            roomid: "red"
          }
        }
      ))
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
        <input id='message' type="text" className='flex-1'></input>
        <button onClick={() => {
          const message = document.getElementById("message")?.value;
          wsRef.current.send(JSON.stringify({
            type:"chat",
            payload:{
              message: message
            }
          }))
        }} className='bg-purple-600 text-white'>Send Message</button>
     </div>
    </div>
  )
}

export default App
