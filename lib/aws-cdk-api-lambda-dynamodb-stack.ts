import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

import * as s3 from 'aws-cdk-lib/aws-s3';

export class AwsCdkApiLambdaDynamodbStack extends cdk.Stack {
	constructor(scope: Construct, id: string, props?: cdk.StackProps) {
		super(scope, id, props);

		// create an S3 bucket with public access
		const bucket = new s3.Bucket(this, 'myBucket', {
			autoDeleteObjects: true, // automatically delete objects when the bucket is deleted.
			removalPolicy: cdk.RemovalPolicy.DESTROY, // resource should be deleted when the stack that created it is deleted.
			versioned: false, // disable versioning for the bucket.
			// allow public read access to the bucket.
			publicReadAccess: true,
			blockPublicAccess: {
				blockPublicAcls: false,
				blockPublicPolicy: false,
				ignorePublicAcls: false,
				restrictPublicBuckets: false,
			},
		});
	}
}
