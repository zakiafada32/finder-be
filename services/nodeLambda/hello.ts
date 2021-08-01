import { APIGatewayProxyEvent } from 'aws-lambda';
import { S3 } from 'aws-sdk';

const s3Client = new S3();

async function handler(event: APIGatewayProxyEvent, context: any) {
  if (isAuthorized(event)) {
    return {
      statusCode: 200,
      body: JSON.stringify('You are authorized'),
    };
  } else {
    return {
      statusCode: 401,
      body: JSON.stringify('You are NOT authorized'),
    };
  }
}

function isAuthorized(event: APIGatewayProxyEvent): boolean {
  const group = event.requestContext.authorizer?.claims['cognito:groups'];
  if (group) {
    return (group as string).includes('admins');
  } else {
    return false;
  }
}

export { handler };
