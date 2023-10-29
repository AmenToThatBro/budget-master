import Moment from 'moment';
import { useState, useEffect } from 'react';
import useFetch from './useFetch.js'

export default function TransactionList (props) {

    const {post, remove, patch, loading} = useFetch(`http://localhost:8000`)    
    const [sortDirection, setSortDirection] = useState('asc');
    const [sortBy, setSortBy] = useState('transactionDate');
    const {setTransactions, transactions, onSort, onDirection, dir} = props;
    const [editClicked, setEditClicked] = useState(false);

    let oldName, oldAmount, oldDate;

    function handleDeleteClick (event) {
        // Grab the item ID
        const itemId = event.target.parentElement.parentElement.getAttribute('id');
        remove(`/transactions/${itemId}`)
        .then(data => console.log(data.message))
        .catch(err => console.log(err.message))
        event.target.parentElement.parentElement.remove();
    }
    
    function handleSortButton(event) {

        const customSort = event.target.innerText.toLowerCase();
        
        if(customSort === 'date'){
            onSort('transactionDate');
        }
        else onSort(customSort);
        

        if(dir === 'asc') onDirection('desc')
        else onDirection('asc')
    }

    function handleEditClick(event) {

        // Grab parent node
        const parent = event.target.parentElement.parentElement;

        // Grab the correct children for the form fields
        const dateElement = parent.childNodes[3];
        const amountElement = parent.childNodes[2];
        const nameElement = parent.childNodes[0];       
        
        // Grab button elements
        const editButtonElement = event.target;
        const deleteButtonElement = event.target.nextSibling;        

        if(!editClicked) {

            // setOldName(nameElement.innerText);
            // setOldAmount(amountElement.innerText);
            // setOldDate(dateElement.innerText);
            oldName = nameElement.innerText;
            oldAmount = amountElement.innerText;
            oldDate = dateElement.innerText;

            // let oName = nameElement.innerText;
            // let oAmount = amountElement.innerText;
            // let oDate = dateElement.innerText;
        
            // Create the new elements and populate values
            const newNameElement = document.createElement('input');
            const newAmountElement = document.createElement('input');
            const newDateElement = document.createElement('input');
            // Insert placeholder text
            newNameElement.setAttribute('placeholder', oldName)
            newAmountElement.setAttribute('placeholder', oldAmount)            
            newDateElement.setAttribute('placeholder', oldDate)
            // Update onChange function
            // newNameElement.addEventListener('keyup', (e) => setPhName(e.target.value))
            // newAmountElement.addEventListener('keyup', (e) => setPhAmount(e.target.value))
            // newDateElement.addEventListener('keyup', (e) => setPhDate(e.target.value))
            // newNameElement.addEventListener('keyup', (e) => phName = e.target.value)
            // newAmountElement.addEventListener('keyup', (e) => phAmount = e.target.value)
            // newDateElement.addEventListener('keyup', (e) => phDate = e.target.value)
            // Replace with new elements
            dateElement.replaceWith(newDateElement)
            nameElement.replaceWith(newNameElement)
            amountElement.replaceWith(newAmountElement)
            
            // Replace inner text of buttons
            editButtonElement.innerText = 'C';
            deleteButtonElement.innerHTML = '&#10003';

            // Edit button has been clicked
            setEditClicked(true);
        }
        else {
            
            // Create elements that will replace the inputs
            const oldNameElement = document.createElement('p');
            const oldAmountElement = document.createElement('p');
            const oldDateElement = document.createElement('p');
            // Insert old information back into their innerText
            oldNameElement.innerText = nameElement.placeholder;            
            oldAmountElement.innerText = amountElement.placeholder;
            oldDateElement.innerText = dateElement.placeholder;            
            // Replace inputs with original elements
            dateElement.replaceWith(oldDateElement);
            amountElement.replaceWith(oldAmountElement);
            nameElement.replaceWith(oldNameElement);
            // Revert buttons to their original state
            editButtonElement.innerText = 'E';
            deleteButtonElement.innerHTML = 'X';
            // Edit and delete button returns to original state
            setEditClicked(false);
            // setPhName('');
            // setPhAmount('');
            // setPhDate('');
        }
        

    }

    function handleSubmit(event) {

        event.preventDefault();
        // Grab the parent element
        const parent = event.target.parentElement.parentElement;

        // Grab the correct children for the form fields
        const dateElement = parent.childNodes[3];
        const amountElement = parent.childNodes[2];
        const nameElement = parent.childNodes[0];       
        
        // Grab button elements
        const editButtonElement = event.target.previousSibling;
        const deleteButtonElement = event.target; 

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
        oldNameElement.innerText = nameElement.value;            
        oldAmountElement.innerText = `$${amountElement.value}`;
        oldDateElement.innerText = oldDate;            
        // Replace inputs with original elements
        dateElement.replaceWith(oldDateElement);
        amountElement.replaceWith(oldAmountElement);
        nameElement.replaceWith(oldNameElement);
        // Revert buttons to their original state
        editButtonElement.innerText = 'E';
        deleteButtonElement.innerHTML = 'X';
        // Set the edit button to not be clicked
        setEditClicked(false);
        // Reset placeholder variables to empty        
        oldName = '';
        oldAmount = '';
        oldDate = '';
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
                            <button onClick={handleEditClick}>E</button>
                            <button onClick={!editClicked ? handleDeleteClick : handleSubmit}>X</button>
                        </div>
                    </div>
                )
                })
            }
        </>)
}