import { useState } from 'react';
import useFetch from './useFetch.js'

export default function AddTransactionWindow(props) {

    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [category, setCategory] = useState('income');
    const { post } = useFetch('http://localhost:8000');

    function handleSubmit(e) {

        e.preventDefault();

        let body = {};
        setCategory(document.getElementById('category').value)

        if(name && amount && date && category) {
            body.name = name;
            body.amount = amount;
            body.transactionDate = date;
            body.category = category;
            if(description) body.description = description;
        }
        else return console.log('All transactions must include Name, Amount, and Date')

        post('/transactions/create', body)
        .then(response => response.json)
        .then((data) => {console.log(data);})
        .catch(err => console.log(err.message))
        
        document.getElementById('add-trans-btn').removeAttribute('disabled');
        props.onWindowVisible();
    }

    function handleCancel(e) {
        console.log('Cancel has been hit')
        setName('');
        setAmount('');
        setDescription('');
        setDate('');
        document.getElementById('add-trans-btn').removeAttribute('disabled');
        props.onWindowVisible();

    }

    return (<>
        <div className="popup-window">
            <div className="popup-header">
                Add Transaction
            </div>
            <div className="popup-body">
                <form onSubmit={handleSubmit}>

                    <label htmlFor='name'>Name</label><br />
                    <input name='name' type="text" onChange={(e) => setName(e.target.value)}/><br /><br />

                    <label htmlFor='amount'>Amount</label><br />
                    <input name='amount' type="text" onChange={(e) => setAmount(e.target.value)}/><br /><br />

                    <label htmlFor='date'>Date</label><br />
                    <input name='date' type="date" onChange={(e) => setDate(e.target.value)}/><br /><br />

                    <label htmlFor='description'>Description</label><br />
                    <textarea onChange={(e) => setDescription(e.target.value)} name='description' id="description" row='4' columns='100'></textarea><br /><br />

                    <label htmlFor='category'>Category</label><br />
                    <select value='income' name='category' id='category' onChange={(e) => setCategory(e.target.value) }>
                        <option value="income">Income</option>
                        <option value='expense'>Expense</option>
                    </select><br /><br />

                    <input className='transaction-submit-btn' type='submit' value="Create Transaction" />
                    <button className='transaction-cancel-btn' onClick={handleCancel}>Cancel</button>

                </form>
            </div>
            
        </div>    
    </>)
}