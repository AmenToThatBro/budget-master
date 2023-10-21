import useFetch from "./useFetch";
import TransactionList from './TransactionList';
import { useEffect, useState } from 'react';

export default function Transactions() {

    return (
        <>
            <div className='transaction-grid'>
                <div id='income'>
                    <TransactionList transactionType='income'></TransactionList>
                </div>    
                <div id='expense'>          
                    <TransactionList transactionType='expense'></TransactionList>
                </div>               
            </div>
        </>
      );
}
 