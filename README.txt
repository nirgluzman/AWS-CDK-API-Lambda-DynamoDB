Building on AWS with TypeScript and Cloud Development Kit 
https://www.youtube.com/watch?v=hxdcSJAbygg

*** AWS CDK Resources ***
(*) https://cdkpatterns.com/
(*) https://cdk.dev/
(*) https://www.cdkday.com/
(*) AWS Tech Talks


View a list of the available CDK templates:
cdk init --list


Template for a CDK Application:
cdk init app --language typescript


Type definitions for aws-lambda:
npm install --save @types/aws-lambda


NodejsFunction:
https://dev.to/binhbv/building-lambda-functions-with-typescript-in-aws-cdk-2om5
In order to write a Lambda function in TypeScript and provision it with CDK, we have to use 
the 'NodejsFunction' construct, which uses esbuild to automatically transpile and bundle our code.


Allow public read access to S3 bucket
https://repost.aws/questions/QU_J7Q6ULvQ8iJac5mBQ2paw/failure-to-create-an-s3-bucket-with-publicreadaccess-true-config
https://aws.amazon.com/blogs/aws/amazon-s3-block-public-access-another-layer-of-protection-for-your-accounts-and-buckets/