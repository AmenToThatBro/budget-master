import useFetch from "./useFetch";
import TransactionList from './TransactionList';
import { useEffect, useState } from 'react';

export default function Transactions() {

    const { get, loading } = useFetch('http://localhost:8000')

    const [incomeTransactions, setIncomeTransactions] = useState([]);
    const [expenseTransactions, setExpenseTransactions] = useState([]);
    const [sortType, setSortType] = useState('asc');
    const [paramType, setParamType] = useState('transactionDate');

    useEffect(() => {
        get('/transactions/income')
            .then(data => setIncomeTransactions(data))
            .catch(err => console.log(err.message))       
    })


    useEffect(() => {
        get('/transactions/expense')
            .then(data => setExpenseTransactions(data))
            .catch(err => console.log(err.message))
    })

    function handleSortButton(event) {
        let newSortType = '';
        let newParamType = event.target.innerHTML.toLowerCase();
        let transactionType = event.target.parentElement.id;

        if(newParamType == 'date'){
            newParamType = 'transactionDate';
        }
        setParamType('newParamType');

        //Flip sort type
        if(sortType === 'asc') newSortType = 'desc'
        else newSortType = 'asc'

        setSortType('newSortType');

        get(`/transactions/${transactionType}/${paramType}/${sortType}`)
            .then(data => setIncomeTransactions(data))
            .catch(err => console.log(err.message))

    }

    return (
        <>
            {loading && <p>Loading...</p>}
            <div className='transaction-grid'>
                <div className='transaction-preview table-header' id='incomes'>
                    <button onClick={handleSortButton}>Name</button>
                    <button>Category</button>
                    <button onClick={handleSortButton}>Amount</button>
                    <button onClick={handleSortButton}>Date</button>
                    <p></p>
                    {incomeTransactions.length > 0 && <TransactionList transactions={incomeTransactions} />}
                </div>
                <div className='transaction-preview table-header' id='expenses'>
                    <button onClick={handleSortButton}>Name</button>
                    <button>Category</button>
                    <button onClick={handleSortButton}>Amount</button>
                    <button onClick={handleSortButton}>Date</button>
                    <p></p>
                    {expenseTransactions.length > 0 && <TransactionList transactions={expenseTransactions} />}
                </div>
            </div>
        </>
      );
}
 