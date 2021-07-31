import { DynamoDB } from 'aws-sdk';
import {
  APIGatewayProxyEvent,
  APIGatewayProxyEventQueryStringParameters,
  APIGatewayProxyResult,
  Context,
} from 'aws-lambda';

const dbClient = new DynamoDB.DocumentClient();
const TABLE_NAME = process.env.TABLE_NAME;
const PRIMARY_KEY = process.env.PRIMARY_KEY;

async function handler(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {
  const result: APIGatewayProxyResult = {
    statusCode: 200,
    body: 'Hello from DynamoDB',
  };

  try {
    if (event.queryStringParameters) {
      if (PRIMARY_KEY! in event.queryStringParameters) {
        result.body = await queryWithPrimaryPartition(event.queryStringParameters);
      } else {
        result.body = await queryWithSecondaryPartition(event.queryStringParameters);
      }
    } else {
      result.body = await scanTable();
    }
  } catch (error) {
    result.body = error.message;
  }

  return result;
}

async function queryWithPrimaryPartition(queryParams: APIGatewayProxyEventQueryStringParameters): Promise<string> {
  const keyValue = queryParams[PRIMARY_KEY!];
  const queryResponse = await dbClient
    .query({
      TableName: TABLE_NAME!,
      KeyConditionExpression: '#id = :value',
      ExpressionAttributeNames: {
        '#id': PRIMARY_KEY!,
      },
      ExpressionAttributeValues: {
        ':value': keyValue,
      },
    })
    .promise();
  return JSON.stringify(queryResponse.Items);
}

async function queryWithSecondaryPartition(queryParams: APIGatewayProxyEventQueryStringParameters): Promise<string> {
  const queryKey = Object.keys(queryParams)[0];
  const queryValue = queryParams[queryKey];
  const queryResponse = await dbClient
    .query({
      TableName: TABLE_NAME!,
      IndexName: queryKey,
      KeyConditionExpression: '#id = :value',
      ExpressionAttributeNames: {
        '#id': queryKey,
      },
      ExpressionAttributeValues: {
        ':value': queryValue,
      },
    })
    .promise();
  return JSON.stringify(queryResponse.Items);
}

async function scanTable(): Promise<string> {
  const queryResponse = await dbClient
    .scan({
      TableName: TABLE_NAME!,
    })
    .promise();

  return JSON.stringify(queryResponse);
}

export { handler };
