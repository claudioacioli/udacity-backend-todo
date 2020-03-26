import * as AWS from 'aws-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { TodoItem } from '../models/TodoItem'

export class TodoAccess {
  
  constructor(
    private readonly docClient: DocumentClient = createDynamoDBClient(),
    private readonly todosTable = process.env.TODOS_TABLE,
    private readonly todosUserIndex = process.env.TODOS_USER_INDEX
  ) {
  }

  async getTodosByUser(userId: string): Promise<TodoItem[]> {
    console.log('Getting all todos')
    
    const result = await this.docClient.query({
      TableName: this.todosTable,
      KeyConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: {
        ':userId': userId
      },
      IndexName: this.todosUserIndex
    }).promise()
    
    return result.Items as TodoItem[]
  }

  async createTodo(todoItem: TodoItem): Promise<TodoItem> {
    await this.docClient.put({
      TableName: this.todosTable,
      Item: todoItem
    }).promise()

    return todoItem
  }

}

const createDynamoDBClient = () => {
  return new AWS.DynamoDB.DocumentClient()
}
