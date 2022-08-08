import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom' 
import Bootstrap from './components/Bootstrap/Bootstrap';
import Login from './components/Auth/Login';
import Navigation from './Navigation'
import ToDos from './components/ToDos/ToDos';
import Categories from './components/Categories/Categories'
import NotFound from './components/NotFound'
import AuthProvider from './contexts/AuthContexts'
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Welcome from './components/HoneyDo/Welcome';

function App() {
  return (
    <div className='App'>
      <AuthProvider>
      <Router>
        <Navigation />
        <Routes>
          <Route path='/' element={<Welcome />} />
          {/* <Route path='/Calendar' element={<Calendar />} /> TODO: If time permits, add a calendar page that shows ToDo's for that day*/ }
          <Route path='/ToDos' element={<ProtectedRoute><ToDos /></ProtectedRoute>} />
          <Route path='/Categories' element={<ProtectedRoute><Categories /></ProtectedRoute>} />
          <Route path='*' element={<NotFound />} />
        </Routes>
        <Footer/>
      </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
