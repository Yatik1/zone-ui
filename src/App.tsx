import { useState } from 'react';
import axios from 'axios';
import Header from './components/Header';
import ChatBox from './components/ChatBox';
import ChatContainer from './components/ChatContainer';

function App() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  async function handleSubmit(e:any) {
    e.preventDefault();
    const res = await axios.post('http://localhost:8000/chats', { message });
    setResponse(res.data.response);
  }



  return (
    <div className='min-h-screen bg-gray-50'>
      <ChatContainer />
    </div>
    // <div style={{ padding: 20 }}>
    //   <form onSubmit={handleSubmit}>
    //     <textarea value={message} onChange={e => setMessage(e.target.value)} />
    //     <button type="submit">Send</button>
    //   </form>
    //   <p><strong>LLM:</strong> {response}</p>
    // </div>
  );
}

export default App;
