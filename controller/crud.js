
const AWS = require('aws-sdk');
const fs = require('fs');

AWS.config.update({
  region: 'us-east-2',
  //endpoint : 'http://localhost:8000'
  accessKeyId:'AKIAIP75QAE4QZMCGZAQ',
  secretAccessKey:'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'
})

const dynamodb = new AWS.DynamoDB();

var docClient = new AWS.DynamoDB.DocumentClient();

exports.getall=(req,res)=>{
    let params ={
        TableName:'News'
      };
      docClient.scan(params,(err,data)=>{
        if(err){
          obj.err;
        }else{
          console.log("du lieu ", data);
            res.render('index', {
              title: 'Express',
              result: data.Items
              });     
        }
        
      });
}

exports.themsv =(req,res)=>{
    const{tenbaibao,tentacgia,isbn,sotrang,nam}=req.body;
    let params={
      TableName:'News',
      Item:{
        tenbaibao: String(tenbaibao),
        tentacgia: String(tentacgia),
        isbn: String(isbn),
        sotrang:Number(sotrang),
        nam:Number(nam)
      }
    };
    console.log(params);
    docClient.put(params,(err,data)=>{
      if(err){
        console.log(err);
        res.render('formthem',{message:"Them k thanh cong"});
      }else{
        res.redirect('/');
        console.log(data);
        res.render('formthem',{message:"Them thanh cong"});
      }
    })
}

exports.xoa =(req,res)=>{

    let id = req.params.id;
  let params={
    TableName:'News',
    Key:{
      "tenbaibao":String(id)
    }
  };
  docClient.delete(params,(err,data)=>{
    if(err){
      console.log(err);
    }else{
      res.redirect('/');
    }
  });

    
}
exports.sua =(req,res)=>{
    const{tenbaibao,tentacgia,isbn,sotrang,nam}=req.body;
    let params={
        TableName:'News',
        Key:{
          "tenbaibao":tenbaibao
        },
        UpdateExpression:"set #tg=:tentacgia, #isbn=:isbn, #sotrang=:sotrang,#nam=:nam",
        ExpressionAttributeNames:{
            '#tg':'tentacgia',
            '#isbn':'isbn',
            '#sotrang':'sotrang',
            '#nam':'nam'
        },
        ExpressionAttributeValues:{
            ':tentacgia':String(tentacgia),
            ':isbn': String(isbn),
            ':sotrang':Number(sotrang),
            ':nam': Number(nam)
        },
        ReturnValues:"UPDATED_NEW"
      };
      docClient.update(params,(err,data)=>{
        if(err){
          console.log(err);
        }else{
          res.redirect('/');
        }
      })

    
}
