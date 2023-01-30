import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { CfnOutput, CfnParameter, Duration } from 'aws-cdk-lib';

export class AwsCdkprojectStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'AwsCdkprojectQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
    const duration = new CfnParameter(this, 'duration', {
      type: 'Number',
      default: 2,
      minValue: 1,
      maxValue: 5,
    });

    const bucketOne = new Bucket(this, "awsCdkProjectFirstBucket", {
      lifecycleRules: [
        {
         // expiration: Duration.days(1),
          expiration: Duration.days(duration.valueAsNumber),
        }
      ]
    });

    new CfnOutput(this, "bucketOne", {
      value: bucketOne.bucketName,
    });
  }
}
