import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import History from './pages/History';
import Report from './pages/Report';
import NotFound from './components/NotFound';
import Login from './pages/Login';
import Register from './pages/Register';
import AddIncome from './pages/AddIncome';
import AddExpense from './pages/AddExpense';
import EditTransaction from './pages/EditTransaction';
import LineChart from './components/LineChart';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/linechart' element={<LineChart />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/' element={<Dashboard />} />
        <Route path='/transactions/add/income' element={<AddIncome />} />
        <Route path='/transactions/add/expense' element={<AddExpense />} />
        <Route path='/transactions/edit/:id' element={<EditTransaction />} />
        <Route path='/history' element={<History />} />
        <Route path='/report' element={<Report />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
