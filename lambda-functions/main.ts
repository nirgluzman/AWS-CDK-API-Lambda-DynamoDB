import { type APIGatewayEvent } from 'aws-lambda';
import { DynamoDBClient, ScanCommand } from '@aws-sdk/client-dynamodb';

const tableName = process.env.TABLE_NAME || '';
const client = new DynamoDBClient({});

const getAllItems = async () => {
	const command = new ScanCommand({
		TableName: tableName,
	});

	const scanResult = await client.send(command);
	return scanResult.Items; // an array of objects
};

export const handler = async (event: APIGatewayEvent) => {
	console.log('Received event:', event);

	const response = await getAllItems();

	return {
		statusCode: 200,
		body: JSON.stringify(response, null, 2),
	};
};
