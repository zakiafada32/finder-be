import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { join } from 'path';
import { LambdaIntegration, RestApi } from 'aws-cdk-lib/lib/aws-apigateway';
import { GenericTable } from './GenericTable';
import { NodejsFunction } from 'aws-cdk-lib/lib/aws-lambda-nodejs';
import { PolicyStatement } from 'aws-cdk-lib/lib/aws-iam';

export class SpaceBeStack extends Stack {
  private api = new RestApi(this, 'SpaceApi');
  private spaceTable = new GenericTable(this, {
    tableName: 'SpaceTable',
    primaryKey: 'spaceId',
    createLambdaPath: 'Create',
    readLambdaPath: 'Read',
    secondaryIndexes: ['location'],
  });

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    // The code that defines your stack goes here

    const helloLambdaNodeJs = new NodejsFunction(this, 'helloLambdaNodeJs', {
      entry: join(__dirname, '..', 'services', 'nodeLambda', 'hello.ts'),
      handler: 'handler',
    });

    const s3ListPolicy = new PolicyStatement();
    s3ListPolicy.addActions('s3:ListAllMyBuckets');
    s3ListPolicy.addResources('*');
    helloLambdaNodeJs.addToRolePolicy(s3ListPolicy);

    const helloLambdaIntegration = new LambdaIntegration(helloLambdaNodeJs);
    const helloLambdaResource = this.api.root.addResource('hello');
    helloLambdaResource.addMethod('GET', helloLambdaIntegration);

    // space api integration
    const spaceResource = this.api.root.addResource('spaces');
    spaceResource.addMethod('POST', this.spaceTable.createLambdaIntegration);
    spaceResource.addMethod('GET', this.spaceTable.readLambdaIntegration);
  }
}
