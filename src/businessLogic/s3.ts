import { S3Access } from '../dataLayer/s3Access'

const s3Access = new S3Access()

export function getUploadUrl(todoId: string): string {
  return s3Access.getUploadUrl(todoId)
}
