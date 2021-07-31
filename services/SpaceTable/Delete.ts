import { DynamoDB } from 'aws-sdk';
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';

const dbClient = new DynamoDB.DocumentClient();
const TABLE_NAME = process.env.TABLE_NAME as string;
const PRIMARY_KEY = process.env.PRIMARY_KEY as string;

async function handler(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {
  const result: APIGatewayProxyResult = {
    statusCode: 200,
    body: 'Hello from DynamoDB',
  };

  const spaceId = event.queryStringParameters?.[PRIMARY_KEY];

  if (spaceId) {
    const deleteResult = await dbClient
      .delete({
        TableName: TABLE_NAME,
        Key: {
          [PRIMARY_KEY]: spaceId,
        },
      })
      .promise();
    result.body = `spaceId ${spaceId} deleted`;
  }

  return result;
}

export { handler };
