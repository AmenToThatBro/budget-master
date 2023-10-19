const express = require('express');
const router = express.Router();

// Import the Transaction model
const Transaction = require('../models/Transaction');
// Either return all transactions or return a specific category of transactions custom sorted
router.get('/', async (req, res) => {

    if(!req.body) {
        console.log('Body doesn\'t exist. returning all transactions')
        try {
            const transactions = await Transaction.find();
            res.status(200).json(transactions);
            return;

        }   catch (err) {
            res.status(500).json({ message: err.message })
        }        
    }
    
    const {category, sortBy, sortDirection} = req.body;

    if(!category) {category = ''};
    if(!sortBy) {sortBy = 'name'};
    if(!sortDirection) {sortDirection = 'asc'};

    try {
        const transactions = await Transaction.find().where({ category: [category] }).sort({ [sortBy]: [sortDirection] })
        res.status(200).json(transactions)
    } catch (err) {
         res.status(500).json({ message: err.message })
    }
})

// Pulling a TYPE and grabbing a lower range and upper range.
router.get('/range', async (req, res) => {
    console.log('hit /range')
    
    const acceptedTypes = [
        'transactionDate',
        'amount',
        'createdAt',
        'updatedAt'
    ]

    const { type, lowerRange, upperRange, sortBy } = req.body;
    console.log(acceptedTypes.includes(type));
    if (acceptedTypes.includes(type)) {
        if(!sortBy) sortBy = 'asc';
        if(lowerRange && upperRange) {
            try {
                const transactions = await Transaction.find({ [type]: { $gte: lowerRange, $lte: upperRange } })
                .sort({ [type]: [sortBy] })
                res.status(200).json(transactions);

            }   catch (err) {
                    res.status(500).json({ message: err.message })
            }
        }
        else res.status(300).json({ message: 'Must include low and high range'})

    }
    else res.status(300).json({ message: 'TYPE of request not accepted'})
})

// TODO //
// Pulling an array of transactions for a specific time period based on a field parameter


// router.get('/month', async (req, res) => {
//     let month = req.body.month
//     console.log(month)
//      try {        
//          // syntax find( expression: { equals: [ argument1, argument2 ] } )
//         const transaction = await Transaction.find().where({ "$expr": { "$eq": [{ "$month": "$transactionDate" }, month] }});
//         res.json(transaction)

//      } catch (err) {
//          res.status(500).json({ message: err.message })
//      }
// })

// Getting one
router.get('/single/:id', getTransaction, (req, res) => {
    console.log('getting one')
    res.json(res.transaction)
})

// Creating one

router.post('/', async (req, res) => {
    const body = req.body;
    const transaction = new Transaction({        
        name: body.name,
        description: body.description,
        category: body.category,
        amount: body.amount,
        transactionDate: body.transactionDate,
    })

    try {
        const newTransaction = await transaction.save()
        res.status(201).json(newTransaction)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Updating One
router.patch('/single/:id', getTransaction, async (req, res) => {
    if (req.body.name != null) {
        res.transaction.name = req.body.name,
        res.transaction.transactionDate = req.body.transactionDate
    }
    try {
        const updatedTransaction = await res.transaction.save()
        res.json(updatedTransaction)
    }   catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Deleting One

router.delete('/single/:id', getTransaction, async (req, res) => {
    try {
        await res.transaction.deleteOne()
        res.json({ message: 'Deleted Transaction' })
    }   catch(err) {
        res.status(500).json({ message: err.message })
    }
})

async function getTransaction(req, res, next) {
    let transaction
    try {
        transaction = await Transaction.findById(req.params.id);
        if (transaction == null){
            return res.status(404).json({ message: 'Cannot find transaction'})
        }
    }   catch(err) {
        res.status(500).json({ message: err.message })
    }

    res.transaction = transaction
    next()
}


module.exports = router;