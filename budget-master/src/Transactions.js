import TransactionList from './TransactionList';
import AddTransactionWindow from './AddTransactionWindow.js'
import { useState, useEffect } from 'react';
import { IKContext, IKUpload} from 'imagekitio-react';
import useFetch from './useFetch.js';

export default function Transactions() {

    const [windowVisible, setWindowVisible] = useState(false);
    const { get } = useFetch('http://localhost:8000')

    function handleAddTransactionButton (e) {
        setWindowVisible(!windowVisible);
        e.target.setAttribute('disabled', true);
    }

    function onSuccess() {
        console.log('YESSSS')
    }
    function onError(e) {
        console.log(e)
    }

    function getAuthenticator() {
        return get('/upload')
        .then(data => console.log(data))
        .catch(err => console.log(err.message))
    }
    useEffect(() => {
        getAuthenticator();
    }, [])
    console.log('transaction rendered')
    return (<>
            <div className='transaction-grid' id='transaction-grid'>
                <button className="add-trans-btn" id="add-trans-btn" onClick={handleAddTransactionButton} disabled={false}>Add Transaction</button>

                {windowVisible && <AddTransactionWindow onWindowVisible={() => setWindowVisible(!windowVisible)} />}
                
               <TransactionList></TransactionList>

               <TransactionList></TransactionList>
            </div>
        </>
      );
}
 