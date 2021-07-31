import * as cdk from 'aws-cdk-lib';
import * as SpaceBe from '../lib/SpaceBeStack';

test('Empty Stack', () => {
  const app = new cdk.App();
  // WHEN
  const stack = new SpaceBe.SpaceBeStack(app, 'MyTestStack');
  // THEN
  const actual = app.synth().getStackArtifact(stack.artifactId).template;
  expect(actual.Resources ?? {}).toEqual({});
});
