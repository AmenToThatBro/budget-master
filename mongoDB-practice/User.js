const mongoose = require('mongoose');


const addressSchema = new mongoose.Schema({
    street: String,
    city: String
})

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 1,
        maxLength: 64,
        // validate: {
        //     validator: name => name === 'Josh',
        //     message: props => `${props.type} is not Josh`,
        // }
    },
    age: {
        type: Number,
        min: 1,
        max: 100,
        validate: {
            validator: v => v % 2 === 0,
            message: props => `${props.value} is not an even number`,
        }
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
    },
    createdAt: {
        type: Date,
        default: () => Date.now(),
    },
    updatedAt: {
        type: Date,
        default: () => Date.now(),
    },
    updatedAt: Date,
    bestFriend: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
    },
    hobbies: [String],
    address: addressSchema,    
})

// Adds a method that can be used with an instance of the object
userSchema.methods.sayHi = function() {
    console.log(`Hi. My name is ${this.name}!`)
}

// Adds methods that can be used by the schema
userSchema.statics.findByName = function(name) {
    return this.find({ name: new RegExp(name, 'i') })
}

// Adds chainable queries
userSchema.query.byName = function (name) {
    return this.where({ name: new RegExp(name, 'i') })
}

// Adds virtual properties that can be accessed via an instanced object
userSchema.virtual('namedEmail').get(function () {
    return `${this.name} <${this.email}>`
})

// fires before the first argument is completed
userSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
})
// fires after the first argument is completed
userSchema.post('save', function(doc, next) {
    doc.sayHi();
    next();
})

mongoose.model("User", userSchema);

module.exports = mongoose.model("User", userSchema);