import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import History from './pages/History';
import NotFound from './components/NotFound';
import Login from './pages/Login';
import Register from './pages/Register';
import AddIncome from './pages/AddIncome';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/' element={<Dashboard />} />
        <Route path='/transactions/add/income' element={<AddIncome />} />
        <Route path='/history' element={<History />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
