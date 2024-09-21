import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ListDetail from './pages/list/ListDetail'
import Navbar from './layout/Navbar';
import Home from './pages/Home';
function App() {

  return (
    <Router>
      <main className='  h-full max-w-[1280px] mx-auto overflow-hidden '>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/list/:slug" element={<ListDetail></ListDetail>} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;

