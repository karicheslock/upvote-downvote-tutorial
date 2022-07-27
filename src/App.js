import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Signin from './pages/Signin';
import CreatePost from './pages/CreatePost';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Dashboard />} />
        <Route path='/sign-in' element={<Signin />} />
        <Route path='/create-post' element={<CreatePost />} />
      </Routes>
    </Router>
  );
}

export default App;
