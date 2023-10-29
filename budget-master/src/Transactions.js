import TransactionList from './TransactionList';
import AddTransactionWindow from './AddTransactionWindow.js'
import { useState, useEffect } from 'react';
import useFetch from './useFetch.js'

export default function Transactions() {

    const [windowVisible, setWindowVisible] = useState(false);
    const { post } = useFetch('http://localhost:8000');
    const [incomeTransactions, setIncomeTransactions] = useState([]);
    const [expenseTransactions, setExpenseTransactions] = useState([]);
    const [sortBy, setSortBy] = useState('transactionDate');
    const [sortDirection, setSortDirection] = useState('asc');

    useEffect(() => {
        post(`/transactions/`, {
            category: 'income',
            sortBy: sortBy,
            sortDirection: sortDirection,
        })
        .then(data => setIncomeTransactions(data))
        .catch(err => console.log(err.message))

        post(`/transactions/`, {
            category: 'expense',
            sortBy: sortBy,
            sortDirection: sortDirection,
        })
        .then(data => setExpenseTransactions(data))
        .catch(err => console.log(err.message))
    }, [sortBy, sortDirection, windowVisible])


    function handleAddTransactionButton (e) {
        setWindowVisible(!windowVisible);
        e.target.setAttribute('disabled', true);
    }

    return (
        <>
            <button id="addTransactionButton" onClick={handleAddTransactionButton} disabled={false}>Add Transaction</button>
            <div className='transaction-grid'>
                {windowVisible && <AddTransactionWindow onWindowVisible={() => setWindowVisible(!windowVisible)} />}
                <div id='income'>
                    <TransactionList transactions={incomeTransactions} setTransactions={setIncomeTransactions} transType="income" onSort={setSortBy} onDirection={setSortDirection} by={sortBy} dir={sortDirection}></TransactionList>
                </div>    
                <div id='expense'>          
                    <TransactionList transactions={expenseTransactions} setTransactions={setExpenseTransactions} transType="expense" onSort={setSortBy} onDirection={setSortDirection} by={sortBy} dir={sortDirection}></TransactionList>
                </div>            
            </div>
        </>
      );
}
 