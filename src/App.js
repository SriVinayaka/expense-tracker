import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import ExpenseTracker from './components/ExpenseTracker';
import ShowData from './components/ShowData';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ShowData></ShowData>}></Route>
          <Route path='/add' element={<ExpenseTracker></ExpenseTracker>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

