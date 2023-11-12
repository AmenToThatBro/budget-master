import Navbar from './Navbar';
import Home from './Home';
import Transactions from './Transactions';
import TransactionInfo from './TransactionInfo';
import { BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {

  return (
    <BrowserRouter>
    
      <Navbar />

        <Routes>

          <Route path='/' element={<Home />}></Route>
          <Route path='/transactions' element={<Transactions />}></Route>
          <Route path='/transactions2' element={<Transactions />}></Route>
          <Route path='/transaction/:id' element={<TransactionInfo />}></Route>

        </Routes>
    </BrowserRouter>
  );
}

export default App;
