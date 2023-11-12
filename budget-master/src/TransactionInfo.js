import useFetch  from './useFetch';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Moment from 'moment';
import { IKContext, IKImage} from 'imagekitio-react';


export default function TransactionInfo() {

    const { get } = useFetch('http://localhost:8000');
    const params = useParams();
    const [transaction, setTransaction] = useState({})
    const urlEndpoint = 'https://ik.imagekit.io/AmenToThatBrother/'

    useEffect(()=> {
        get(`/transactions/${params.id}/`)
        .then(data => setTransaction(data))
        .catch(err => console.log(err.message))
    }, [])
    console.log(transaction);
    return (<>
        <div class='item-info'>
            <IKImage urlEndpoint={urlEndpoint} src={transaction.img} width='100px' className='image'></IKImage>
            <div className='name'>{transaction.name}</div>
            <div className='amount'>Amount: ${transaction.amount}</div>
            <div className='item-category'>Category: {transaction.category}</div>
            <div className='date'>Transaction Date: {Moment(transaction.transactionDate).format('MM[/]DD[/]YYYY')}</div>
            <div className="created">Created: {Moment(transaction.createdAt).format('MM[/]DD[/]YYYY[--]hh[:]MM[:]SS')}</div>
            <div className='updated'>Updated: {Moment(transaction.updatedAt).format('MM[/]DD[/]YYYY[--]hh[:]MM[:]SS')}</div>
        </div>
    </>)
}