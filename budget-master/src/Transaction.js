import Transactionlist from "./TransactionList";
import useFetch from "./useFetch";

const Transaction = () => {

    
    const { data: transaction, isPending, error } = useFetch('http://localhost:8000/transaction')


    return (
        <div className="transaction-list">
            { error && <h1>{ error.message }</h1>}
            { isPending && <h1>Loading...</h1>}
            { transaction && <Transactionlist transaction={ transaction } />} 
        </div>
      );
}
 
export default Transaction;