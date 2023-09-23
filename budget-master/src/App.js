import Navbar from './Navbar';
import Home from './Home';
import Transaction from './Transaction';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {

  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Switch>
            
            <Route exact path="/">
              <Home />
            </Route>
            
            <Route path="/transaction">
              <Transaction />
            </Route>

            {/* <Route path="/expenses">
              <Expense />
            </Route> */}

          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
