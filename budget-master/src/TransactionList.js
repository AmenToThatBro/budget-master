import Moment from 'moment';
import { useState } from 'react';

export default function TransactionList (props) {
    const { transactions } = props;

    
        return (
            <div className="transaction-list">
                
                    {transactions.map((item) => {
                    return(
                    <div className="transaction-preview" key={item._id}>
                        <p>{ item.name }</p>
                        <p>{ item.category }</p>
                        <p>${ item.amount }</p>
                        <p>{ Moment(Date.parse(item.transactionDate)).format('MM[/]DD[/]YY') }</p>
                        <div><button>D</button><button>E</button><button>X</button></div>
                    </div>)})}
            </div>
            
    )
}