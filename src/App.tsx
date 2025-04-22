import { useState } from 'react';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  async function handleSubmit(e:any) {
    e.preventDefault();
    const res = await axios.post('http://localhost:8000/chats', { message });
    setResponse(res.data.response);
  }



  return (
    <div style={{ padding: 20 }}>
      <form onSubmit={handleSubmit}>
        <textarea value={message} onChange={e => setMessage(e.target.value)} />
        <button type="submit">Send</button>
      </form>
      <p><strong>LLM:</strong> {response}</p>
    </div>
  );
}

export default App;
