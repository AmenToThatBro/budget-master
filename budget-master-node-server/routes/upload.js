const express = require('express');
const router = express.Router();

var ImageKit = require("imagekit");
var fs = require('fs');

var imagekit = new ImageKit({
    publicKey : "public_Zu6cqVJ9z1L9QP/GLPo2+N653DU=",
    privateKey : "private_zFaan8IEgjSJ71Cgallf3REIrqY=",
    urlEndpoint : "https://ik.imagekit.io/AmenToThatBrother"
});



// Getting all
router.get('/', async (req, res) => {
    var authentication = imagekit.getAuthenticationParameters();
    console.log(authentication)
    res.status(200).json(authentication);
    
})

module.exports = router;