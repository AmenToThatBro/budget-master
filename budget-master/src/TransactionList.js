import Moment from 'moment';
import { useState, useEffect } from 'react';
import useFetch from './useFetch.js'

export default function TransactionList (props) {

    const {post, remove, loading} = useFetch(`http://localhost:8000`)
    const [transactions, setTransactions] = useState([]);
    const [sortDirection, setSortDirection] = useState('asc');
    const [sortBy, setSortBy] = useState('transactionDate');
    const [transactionType, setTransactionType] = useState(props.transactionType);
    const [errMsg, setErrMsg] = useState('');

    // Load initial transaction list for the component
    useEffect(() => {
        post(`/transactions/`, {
            category: transactionType,
            sortBy: sortBy,
            sortDirection: sortDirection,
        })
        .then(data => setTransactions(data))
        .catch(err => console.log(err.message))
    }, [sortBy, sortDirection])

    function handleDeleteClick (event) {
        // Grab the item ID
        const itemId = event.target.parentElement.parentElement.getAttribute('id');
        remove(`/transactions/${itemId}`)
        .then(data => setErrMsg(data.message))
        .catch(err => setErrMsg(err.message))
        event.target.parentElement.parentElement.remove();


        setTimeout(() => {
            setErrMsg('')
        }, 3000)
    }
    
    function handleSortButton(event) {

        const customSort = event.target.innerText.toLowerCase();

        console.log(`${customSort} ${transactionType}`)

        setSortBy(customSort);

        if(sortDirection === 'asc') setSortDirection('desc')
        else setSortDirection('asc')

        const customBody = {
            'category': transactionType,
            'sortBy': sortBy,
            'sortDirection': sortDirection
        }

        post('/transactions/', customBody)
        .then(data => setTransactions(data))
        .catch(err => console.log(err.message))
    }

    function handleEditClick(event) {
        event.target.setAttribute('disabled', 'true')
        const customDate = document.createElement('input')
        const customAmount = document.createElement('input')
        const customName = document.createElement('input')
        const target = event.target.parentElement;
        const dateElement = target.previousSibling;
        const amountElement = target.previousSibling.previousSibling;
        const nameElement = target.previousSibling.previousSibling.previousSibling.previousSibling;
        const dateData = dateElement.innerText;
        const amountData = amountElement.innerText;
        const nameData = nameElement.innerText;
        customDate.setAttribute('value', dateData)
        customAmount.setAttribute('value', amountData)
        customName.setAttribute('value', nameData)
        dateElement.replaceWith(customDate)
        nameElement.replaceWith(customName)
        amountElement.replaceWith(customAmount)
    }
    
    return (
    <>
        {errMsg && <><p></p><p></p><p>{errMsg}</p><p></p><p></p></>}
        <div className='transaction-preview table-header'>
            <button onClick={handleSortButton}>Name</button>
            <button>Category</button>
            <button onClick={handleSortButton}>Amount</button>
            <button onClick={handleSortButton}>Date</button>
            <p></p>  
        </div>                         
        {transactions.map((item) => {
            return(
                <div className='transaction-preview' key={ item._id } id={ item._id }>
                    <p>{ item.name }</p>
                    <p>{ item.category }</p>
                    <p>${ item.amount }</p>
                    <p>{ Moment(Date.parse(item.transactionDate)).format('MM[/]DD[/]YY') }</p>
                    <div>
                        <button onClick={handleEditClick}>E</button>
                        <button onClick={handleDeleteClick}>X</button>
                    </div>
                </div>
            )
            })
        }
    </>)
}