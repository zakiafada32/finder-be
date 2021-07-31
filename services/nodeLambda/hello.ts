import { v4 } from 'uuid';
import { S3 } from 'aws-sdk';

const s3Client = new S3();

async function handler(event: any, context: any) {
  console.log('event log:');
  console.log(event);

  console.log('context log:');
  console.log(context);

  const buckets = await s3Client.listBuckets().promise();

  return {
    statusCode: 200,
    body: 'Hello from lambda: ' + JSON.stringify(buckets.Buckets),
  };
}

export { handler };
