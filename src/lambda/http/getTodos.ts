import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { getTodosByUser } from '../../businessLogic/todo'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  
  const jwtToken = getToken(event.headers.Authorization)
  const todos = await getTodosByUser(jwtToken)

  for(const todo of todos) {
    todo["attachmentUrl"] = todo.imageUrl
  }

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      items: todos
    })
  }

}

function getToken(header: string) {
  return header.split(" ")[1]
}
