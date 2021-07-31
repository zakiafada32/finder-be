import { APIGatewayProxyEvent } from 'aws-lambda';
import { handler } from '../services/SpaceTable/Create';

const event: APIGatewayProxyEvent = {
  body: {
    name: 'Kelud',
    location: 'Kediri',
  },
} as any;

handler(event as any, {} as any).then((apiResult) => {
  const result = JSON.parse(apiResult.body);
  console.log('123');
});
