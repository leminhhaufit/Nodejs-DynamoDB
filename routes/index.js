var express = require('express');
var router = express.Router();
const AWS = require('aws-sdk');
const fs = require('fs');
const api = require('../controller/crud');

AWS.config.update({
  region: 'us-east-2',
  //endpoint : 'http://localhost:8000'
  accessKeyId:'AKIAIP75QAE4QZMCGZAQ',
  secretAccessKey:'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'
})

const dynamodb = new AWS.DynamoDB();

var docClient = new AWS.DynamoDB.DocumentClient();



/* GET home page. */
router.get('/', api.getall);


router.get('/them',function(req,res){
  res.render('formthem',{title:'Them News'});
})
router.post('/them',api.themsv);
router.get('/sua/:id',function(req,res){
    let id = req.params.id;
    console.log(id);
    let params={
      TableName:'News',
      Key:{
        "tenbaibao":String(id)
      }
    };
    docClient.get(params,(err,data)=>{
      if(err){
        console.log(err);
      }else{
        console.log(data+" sua");
        res.render('formsua',{title:'Sua new', result:data});
      }
    });
})
router.get('/xoa/:id',api.xoa)
router.post('/sua',api.sua)

module.exports = router;
