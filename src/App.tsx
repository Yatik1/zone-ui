import ChatContainer from './components/ChatContainer';

function App() {
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
