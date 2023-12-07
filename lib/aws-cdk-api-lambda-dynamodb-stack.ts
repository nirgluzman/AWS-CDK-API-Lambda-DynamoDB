import * as cdk from 'aws-cdk-lib';
import { type Construct } from 'constructs';

import * as s3 from 'aws-cdk-lib/aws-s3';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';

import { join } from 'path';

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

		// create a DynamoDB table
		const table = new dynamodb.Table(this, 'myTable', {
			removalPolicy: cdk.RemovalPolicy.DESTROY, // resource should be deleted when the stack that created it is deleted.
			partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
			billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
		});

		// create a Lambda function
		const myLambda = new NodejsFunction(this, 'myLambda', {
			runtime: lambda.Runtime.NODEJS_LATEST,
			entry: join(__dirname, '..', 'lambda-functions', 'main.ts'), // path to the Lambda function source code
			handler: 'handler',
			environment: {
				TABLE_NAME: table.tableName,
			},
		});

		// grant the Lambda function full access to the DynamoDB table
		table.grantFullAccess(myLambda);

		// create an API Gateway REST API with Lambda proxy integration
		const api = new apigateway.LambdaRestApi(this, 'myApi', {
			handler: myLambda, // the default Lambda function that handles all requests from this API.
		});
	}
}
