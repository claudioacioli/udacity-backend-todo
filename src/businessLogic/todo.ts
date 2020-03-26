import * as uuid from 'uuid'
import { TodoItem } from '../models/TodoItem'
import { TodoAccess } from '../dataLayer/todoAccess'
import { CreateTodoRequest, UpdateTodoRequest } from '../requests/CreateTodoRequest'
import { parseUserId } from '../auth/utils'

const todoAccess = new TodoAccess()

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
    id: todoId,
    userId: userId,
    createdAt: new Date().toISOString(),
    name: createTodoRequest.name,
    dueDate: createTodoRequest.dueDate
  })
}

export async function updateTodo(
  id: string,
  updateTodoRequest: UpdateTodoRequest
): Promise<TodoItem> {
  return await todoAccess.updateTodo(
    id,
    {
      name: updateTodoRequest.name,
      dueDate: updateTodoRequest.dueDate,
      done: updateTodoRequest.done
    }
  )
}

export async function deleteTodo(
  id: string
): void {
  await todoAccess.deleteTodo(id)
}
