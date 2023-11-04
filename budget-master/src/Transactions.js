import TransactionList from './TransactionList';
import AddTransactionWindow from './AddTransactionWindow.js'
import { useState } from 'react';

export default function Transactions() {

    const [windowVisible, setWindowVisible] = useState(false);
    const [refresh, setRefresh] = useState(false);
    // const { loading } = useFetch('http://localhost:8000');
    // const [incomeTransactions, setIncomeTransactions] = useState([]);
    // const [expenseTransactions, setExpenseTransactions] = useState([]);
    // const [sortBy, setSortBy] = useState('transactionDate');
    // const [sortDirection, setSortDirection] = useState('asc');

    // useEffect(() => {
    //     post(`/transactions/`, {
    //         category: 'income',
    //         sortBy: sortBy,
    //         sortDirection: sortDirection,
    //     })
    //     .then(data => setIncomeTransactions(data))
    //     .catch(err => console.log(err.message))

    //     post(`/transactions/`, {
    //         category: 'expense',
    //         sortBy: sortBy,
    //         sortDirection: sortDirection,
    //     })
    //     .then(data => setExpenseTransactions(data))
    //     .catch(err => console.log(err.message))
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [sortBy, sortDirection, windowVisible])


    function handleAddTransactionButton (e) {
        setWindowVisible(!windowVisible);
        e.target.setAttribute('disabled', true);
    }

    return (
        <>
            <div className='transaction-grid' id='transaction-grid'>
                <button className="add-trans-btn" id="add-trans-btn" onClick={handleAddTransactionButton} disabled={false}>Add Transaction</button>

                {windowVisible && <AddTransactionWindow onWindowVisible={() => setWindowVisible(!windowVisible)} setRefresh={setRefresh} refresh={refresh}/>}
                <div id='income'>
                    <TransactionList refresh={refresh}></TransactionList>
                </div>    
                <div id='expense'>          
                    <TransactionList refresh={refresh}></TransactionList>
                </div>      
            </div>
        </>
      );
}
 