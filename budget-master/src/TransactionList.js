import Moment from 'moment';
import { useState, useEffect } from 'react';
import useFetch from './useFetch.js';

export default function TransactionList (props) {

    const {post, remove, patch, loading} = useFetch(`http://localhost:8000`)    
    const {transactions, onSort, onDirection, dir} = props;
    const [editClicked, setEditClicked] = useState(false);
    const [oldInfo, setOldInfo] = useState({});
    
    function handleSortButton(event) {

        const customSort = event.target.innerText.toLowerCase();
        
        if(customSort === 'date'){
            onSort('transactionDate');
        }
        else onSort(customSort);
        

        if(dir === 'asc') onDirection('desc')
        else onDirection('asc')
    }
    function handleEdit(event) {
        // Edit has been clicked
        setEditClicked(true);
        // Grab parent node
        const parent = event.target.parentElement.parentElement;

        // Grab the correct children for the form fields
        const dateElement = parent.childNodes[3];
        const amountElement = parent.childNodes[2];
        const nameElement = parent.childNodes[0];

        let transInfo = {}       

        transInfo.name = nameElement.innerText;
        transInfo.amount = amountElement.innerText;
        transInfo.transactionDate = dateElement.innerText
        setOldInfo(transInfo);

        // Create the new elements and populate values
        const newNameElement = document.createElement('input');
        const newAmountElement = document.createElement('input');
        const newDateElement = document.createElement('input');
        // // Insert placeholder text
        // newNameElement.setAttribute('placeholder', transInfo.name)
        // newAmountElement.setAttribute('placeholder', transInfo.amount)            
        // newDateElement.setAttribute('placeholder', transInfo.transactionDate)
        console.log(transInfo.transactionDate)
        const date = Moment(transInfo.transactionDate).format('YYYY-MM-DD');
        console.log(date)
        newDateElement.setAttribute('type', 'date')
        newNameElement.setAttribute('value', transInfo.name)
        newAmountElement.setAttribute('value', transInfo.amount)            
        newDateElement.setAttribute('value', date)
        newNameElement.setAttribute('class', 'item-name')
        newAmountElement.setAttribute('class', 'item-amount')            
        newDateElement.setAttribute('class', 'item-date')


        // Replace with new elements
        dateElement.replaceWith(newDateElement)
        nameElement.replaceWith(newNameElement)
        amountElement.replaceWith(newAmountElement)
    }
    function handleDelete (event) {
        // Grab the item ID
        const itemId = event.target.parentElement.parentElement.getAttribute('id');
        remove(`/transactions/${itemId}`)
        .then(data => console.log(data.message))
        .catch(err => console.log(err.message))
        event.target.parentElement.parentElement.remove();
    }
    function handleSubmit(event) {
        event.preventDefault();
        // Grab the parent element
        const parent = event.target.parentElement.parentElement;

        // Grab the correct children for the form fields
        const nameElement = parent.childNodes[0];
        const amountElement = parent.childNodes[2];
        const dateElement = parent.childNodes[3];     

        // Create the body object
        var body = {};
        
        // Determine which fields contain strings and add those to the body
        if(nameElement.value) body.name = nameElement.value;
        if(amountElement.value) body.amount = amountElement.value;
        if(dateElement.value) body.transactionDate = dateElement.value;

        // Send the patch through the API
        patch(`/transactions/${parent.id}`, body)
        .then(data => console.log(data))
        .catch(err => console.log(err.message))  

        // Revert input fields back to <p>
        // Create original elements
        const oldNameElement = document.createElement('p');
        const oldAmountElement = document.createElement('p');
        const oldDateElement = document.createElement('p');
        // Insert old information back those elements
        if(!body.name) oldNameElement.innerText = oldInfo.name;
        else oldNameElement.innerText = nameElement.value;

        if(!body.amount) oldAmountElement.innerText = oldInfo.amount;
        else oldAmountElement.innerText = `$${amountElement.value}`;

        if(!body.transactionDate) oldDateElement.innerText = oldInfo.transactionDate;
        else oldDateElement.innerText = dateElement.value;            
        // Replace inputs with original elements
        dateElement.replaceWith(oldDateElement);
        amountElement.replaceWith(oldAmountElement);
        nameElement.replaceWith(oldNameElement);
        // Set the edit button to not be clicked
        setEditClicked(false);
        // Reset placeholder variables to empty
        setOldInfo({});        
    }    
    function handleCancel(e) {
        setEditClicked(false);  
        const parent = e.target.parentElement.parentElement;

        // Grab the correct children for the form fields
        const dateElement = parent.childNodes[3];
        const amountElement = parent.childNodes[2];
        const nameElement = parent.childNodes[0];         
        // Create elements that will replace the inputs
        const oldNameElement = document.createElement('p');
        const oldAmountElement = document.createElement('p');
        const oldDateElement = document.createElement('p');
        // Insert old information back into their innerText

        // oldNameElement.innerText = nameElement.placeholder;            
        // oldAmountElement.innerText = amountElement.placeholder;
        // oldDateElement.innerText = dateElement.placeholder;
        
        oldNameElement.innerText = oldInfo.name;
        oldAmountElement.innerText = oldInfo.amount;
        oldDateElement.innerText = oldInfo.transactionDate;

        // Replace inputs with original elements
        dateElement.replaceWith(oldDateElement);
        amountElement.replaceWith(oldAmountElement);
        nameElement.replaceWith(oldNameElement);
    }
    return (
        <>
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
                            {!editClicked && <>
                            <button className="trans-list-button" onClick={handleEdit}>E</button>
                            <button className="trans-list-button" onClick={handleDelete}>X</button>
                            </>}

                            {editClicked && <>
                            <button className="trans-list-button" onClick={handleCancel}>C</button>
                            <button className="trans-list-button" onClick={handleSubmit}>&#10003;</button>
                            </>}

                        </div>
                    </div>
                )
                })
            }
        </>)
}