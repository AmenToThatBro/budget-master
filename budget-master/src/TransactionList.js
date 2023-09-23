const Transactionlist = ({ transaction }) => {

    return (
       <div className="transaction-list">
            {transaction.map((item) => (
                <div className="transaction-preview" key={item.id}>
                    <h2>{ item.name }</h2>
                    <h3>${ item.description }</h3>
                    <h3>${ item.category }</h3>
                    <h3>${ item.amount }</h3>
                    <h4>{ item.transactionDate }</h4>
                </div>
            ) )}
        </div>
      );
}
 
export default Transactionlist;