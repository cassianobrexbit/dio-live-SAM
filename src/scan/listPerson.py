#!/usr/bin/python3
import json
import boto3

def lambda_handler(event, context):

    dynamodb = boto3.resource('dynamodb')

    table = dynamodb.Table('personTable')

    try:

        response = table.scan()
        statusCode = 200
        responseBody = response['Items']
    
    except:

        statusCode = 400
        responseBody = "Error"

    return {
        'statusCode': statusCode,
        'body': json.dumps(responseBody)
    }
