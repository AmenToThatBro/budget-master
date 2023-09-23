const express = require('express');
const router = express.Router();

// Import the Transaction model
const Transaction = require('../models/Transaction');

// Getting all
router.get('/', async (req, res) => {
    console.log('/transactions/ ... hit')
    try {
        const transactions = await Transaction.find();
        res.json(transactions);
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Getting range based on paramType
router.get('/params/:paramType/:param1/:param2', async (req, res) => {
    const acceptedTypes = [
        'transactionDate',
        'amount',
        'createdAt',
        'updatedAt'
    ]
    const paramType = req.params.paramType

    let typeAccepted = false
    
    acceptedTypes.map((type) => {
        if (type == paramType) {
            return typeAccepted = true           
        }
    })

    if(typeAccepted){
        try{
            const transaction = await Transaction.find({ [paramType]: { $gte: req.params.param1, $lte: req.params.param2 }})
                .sort({ [paramType]: 'asc' })

            res.json(transaction)
        } catch (err) {
            res.status(500).json({ message: err.message })
        }
    }
    else {
        res.json({ message: 'Lookup parameter is not an accepted value.'})
    }
})

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