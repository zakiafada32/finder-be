import { APIGatewayProxyEvent } from 'aws-lambda';
import { handler } from '../services/SpaceTable/Delete';

const event: APIGatewayProxyEvent = {
  queryStringParameters: {
    spaceId: '737e179b-5d96-494b-a569-dd691ffc913e',
  },
} as any;

handler(event as any, {} as any).then((apiResult) => {
  console.log('123');
});
