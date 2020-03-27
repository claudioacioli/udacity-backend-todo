import * as uuid from 'uuid'
import { TodoItem } from '../models/TodoItem'
import { TodoAccess } from '../dataLayer/todoAccess'
import { CreateTodoRequest, UpdateTodoRequest } from '../requests/CreateTodoRequest'
import { parseUserId } from '../auth/utils'

const todoAccess = new TodoAccess()
const bucketName = process.env.TODOS_IMAGES_S3_BUCKET

export async function getTodosByUser(jwtToken: string): Promise<TodoItem[]> {
  return todoAccess.getTodosByUser(parseUserId(jwtToken))
}

export async function createTodo(
  createTodoRequest: CreateTodoRequest,
  jwtToken: string
): Promise<TodoItem> {
  const todoId = uuid.v4()
  const userId = parseUserId(jwtToken)

  return await todoAccess.createTodo({
    todoId: todoId,
    userId: userId,
    createdAt: new Date().toISOString(),
    name: createTodoRequest.name,
    dueDate: false,
    done: createTodoRequest.done === true ? true : false,
    imageUrl: `https://${bucketName}.s3.amazonaws.com/${todoId}`
  })
}

export async function updateTodo(
  todoId: string,
  updateTodoRequest: UpdateTodoRequest
): Promise<TodoItem> {
  return await todoAccess.updateTodo(
    todoId,
    {
      name: updateTodoRequest.name,
      dueDate: updateTodoRequest.dueDate,
      done: updateTodoRequest.done
    }
  )
}

export async function deleteTodo(
  todoId: string
): void {
  await todoAccess.deleteTodo(todoId)
}
