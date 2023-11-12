import { useState } from 'react';
import useFetch from './useFetch.js';
import { IKContext, IKUpload} from 'imagekitio-react';

export default function AddTransactionWindow(props) {


    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [category, setCategory] = useState('income');
    const { post, patch } = useFetch('http://localhost:8000');
    const publicKey = 'public_Zu6cqVJ9z1L9QP/GLPo2+N653DU='
    const authenticationEndpoint = 'http://localhost:8000/upload'
    let urlEndpoint = 'https://ik.imagekit.io/AmenToThatBrother/'
    let img = '';
    const authenticator = () => {
        return fetch(authenticationEndpoint)
          .then((response) => response.json())
          .then((data) => data);
      };

    function handleSubmit(e) {

        e.preventDefault();

        let body = {};
        

        if(name && amount && date && category) {
            body.name = name;
            body.amount = amount;
            body.transactionDate = date;
            body.category = category;
            if(description) body.description = description;
            if(img) body.img = img;
        }
        else return console.log('All transactions must include Name, Amount, and Date')

        console.log(body)

        post('/transactions/create', body)
        .then(response => console.log(response))
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
    // On success patch the item document
    function onSuccess(res) {
        console.log('success', res)
        img = res.url;
    }
    function onError(e) {
        console.log('error', e)
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
                    <select name='category' id='category' onChange={(e) => setCategory(e.target.value)} defaultValue={"income"} >
                        <option value={"income"} >Income</option>
                        <option value={'expense'}>Expense</option>
                    </select>

                    <label htmlFor='image'>Image</label><br />
                    <IKContext publicKey={publicKey} urlEndpoint={urlEndpoint} authenticator={authenticator}>
                        <IKUpload onSuccess={onSuccess} onError={onError} fileName="abc.jpg" tags={["tag1"]} useUniqueFileName={true} isPrivateFile= {false}></IKUpload>
                    </IKContext>
                    <br /><br />

                    <input className='transaction-submit-btn' type='submit' value="Create Transaction" />
                    <button className='transaction-cancel-btn' onClick={handleCancel}>Cancel</button>

                </form>
            </div>
            
        </div>    
    </>)
}