import { useEffect, useState, useRef } from 'react'
import './App.css'

function App() {
  const [messages, setMessages] = useState(['hi there', 'webcuiwrc']);
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
    return () => {
      ws.close()
    }
  }, [])

  return (
    <div className='h-screen bg-black flex flex-col'>
      <div className='flex-1 overflow-y-auto p-4'>
        {messages.map((message, index) => (
          <div key={index} className='mb-12'>
            <span className='bg-gray-200 text-black rounded-lg p-3 shadow-md'>{message}</span>
          </div>
        ))}
      </div>
      <div className='bg-gray-800 p-4 flex items-center'>
        <input
          id='message'
          type="text"
          className='flex-1 bg-transparent border-b border-gray-400 text-white placeholder-gray-400 px-2 py-1'
          placeholder='Type a message...'
        />
        <button
          onClick={() => {
            const message = document.getElementById("message")?.value;
            wsRef.current.send(JSON.stringify({
              type: "chat",
              payload: {
                message: message
              }
            }))
          }}
          className='bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors ml-2'
        >
          Send Message
        </button>
      </div>
    </div>
  )
}

export default App