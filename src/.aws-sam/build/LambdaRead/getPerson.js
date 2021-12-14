const AWS = require('aws-sdk');

exports.handler = async (event) => {

    
    const ddb = new AWS.DynamoDB.DocumentClient();

    const {id} = event.pathParameters;

    var data;

    var statusCode = 0;

    const params = {
        TableName:'personTable',
        Key: {
            id : id
        }
    
    };

    try {

        const result = await ddb.get(params).promise();
        data = result.Item;

        statusCode = 200

    } catch (err) { 

        data = err;
        statusCode = 400
    }

    const response = {
        'statusCode': statusCode,
        'body': JSON.stringify({
            message: data
        })
    };

    return response;

};