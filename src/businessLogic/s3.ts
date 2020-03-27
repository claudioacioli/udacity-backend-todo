import { S3Access } from '../dataLayer/s3Access'

const s3Access = new S3Access()

export async function getAttachmentUrl(todoId: string): Promise<boolean> {
  return await s3Access.getAttachmentUrl(todoId)
}

export function getUploadUrl(todoId: string): string {
  return s3Access.getUploadUrl(todoId)
}
