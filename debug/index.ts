import { APIGatewayProxyEvent } from 'aws-lambda';
import { handler } from '../services/SpaceTable/Read';

const event: APIGatewayProxyEvent = {
  queryStringParameters: {
    spaceId: '38d02802-8415-4e8a-9783-5d816abd6060',
  },
} as any;

handler(event as any, {} as any).then((apiResult) => {
  const item = JSON.parse(apiResult.body);
  console.log('123');
});
