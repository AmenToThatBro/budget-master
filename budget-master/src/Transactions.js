import TransactionList from './TransactionList';
import AddTransactionWindow from './AddTransactionWindow.js'
import { useState } from 'react';

export default function Transactions() {

    const [windowVisible, setWindowVisible] = useState(false);
    const [refresh, setRefresh] = useState(false);

    function handleAddTransactionButton (e) {
        setWindowVisible(!windowVisible);
        e.target.setAttribute('disabled', true);
    }

    return (
        <>
            <div className='transaction-grid' id='transaction-grid'>
                <button className="add-trans-btn" id="add-trans-btn" onClick={handleAddTransactionButton} disabled={false}>Add Transaction</button>

                {windowVisible && <AddTransactionWindow onWindowVisible={() => setWindowVisible(!windowVisible)} setRefresh={setRefresh} refresh={refresh}/>}
                <div id='income' className='left-list transaction-bound'>
                    <TransactionList refresh={refresh}></TransactionList>
                </div>    
                <div id='expense' className='right-list transaction-bound'>          
                    <TransactionList refresh={refresh}></TransactionList>
                </div>      
            </div>
        </>
      );
}
 