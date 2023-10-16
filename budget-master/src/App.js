import Navbar from './Navbar';
import Home from './Home';
import Transaction from './Transactions';
import { BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
  console.log("app loaded")

  return (
    <BrowserRouter>
      <Navbar />

        <Routes>

          <Route path='/' element={<Home />}>
          </Route>

          <Route path='/transactions' element={<Transaction />}>

          </Route>

        </Routes>
    </BrowserRouter>
  );
}

export default App;
