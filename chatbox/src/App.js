import './App.css';
import {BrowserRouter as Router,Routes, Route} from 'react-router-dom'
import Join from './component/join/Join';
import Chat from './component/join/Chat/Chat';


function App() {

  return (
    <div className="App">
  <Router>
    <Routes>
    <Route excat path='/' element={<Join/>} />
    <Route path='/chat' element={<Chat/>}/>
    </Routes>
  </Router>
    </div>
  );
}

export default App;
