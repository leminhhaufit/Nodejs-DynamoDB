const AWS = require('aws-sdk');
const fs = require('fs');
const { move } = require('./routes');


AWS.config.update({
    region: 'us-east-2',
    //endpoint : 'http://localhost:8000'
    accessKeyId:'AKIAIP75QAE4QZMCGZAQ',
    secretAccessKey:'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'
  })

const dynamodb = new AWS.DynamoDB();

const params = {
    TableName : "News",
    KeySchema: [       
        { AttributeName: "tenbaibao", KeyType: "HASH"}  //Partition key
        //{ AttributeName: "title", KeyType: "RANGE" }  //Sort key
    ],
    AttributeDefinitions: [       
        { AttributeName: "tenbaibao", AttributeType: "S" },
       // { AttributeName: "title", AttributeType: "S" }
    ],
    ProvisionedThroughput: {       
        ReadCapacityUnits: 1, 
        WriteCapacityUnits: 1
    }
};
dynamodb.createTable(params, function(err, data) {
    if (err) {
        console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
    }
});



