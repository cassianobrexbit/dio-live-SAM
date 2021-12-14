const AWS = require('aws-sdk');

exports.handler = async (event) => {

    const ddb = new AWS.DynamoDB.DocumentClient();

    const {id, name} = JSON.parse(event.body);

    var data;

    var statusCode = 0;

    const newPerson = {
        id : id, 
        name : name
    }

    const params = {
        TableName:'personTable',
        Item: newPerson
    };

    try {

        await ddb.put(params).promise();
        data = newPerson
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

}