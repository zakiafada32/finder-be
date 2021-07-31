import { APIGatewayProxyEvent } from 'aws-lambda';
import { handler } from '../services/SpaceTable/Read';

const event: APIGatewayProxyEvent = {
  queryStringParameters: {
    location: 'Tuban',
  },
} as any;

handler(event as any, {} as any).then((apiResult) => {
  const item = JSON.parse(apiResult.body);
  console.log('123');
});
