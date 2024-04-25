import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './path/to/Home';
import Login from './path/to/Login';
import { createRoot } from 'react-dom';
const App = () => {
  const [isAuthenticated] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/home" element={isAuthenticated ? <Home /> : <Login />} />
        <Route path="/login" element={<Login />} />
        {/* Otras rutas de tu aplicación */}
      </Routes>
    </Router>
  );
};

createRoot(document.getElementById('root')).render(<App />);

export default App





