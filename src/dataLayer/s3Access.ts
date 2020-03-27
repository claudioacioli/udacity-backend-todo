import * as AWS from 'aws-sdk'

export class S3Access {
  
  constructor(
    private readonly s3: AWS.S3 = createS3Object(),
    private readonly bucketName = process.env.TODOS_IMAGES_S3_BUCKET,
    private readonly urlExpiration = 300
  ) {
  }

  getUploadUrl(todoId: string): string {
    return this.s3.getSignedUrl('putObject', {
      Bucket: this.bucketName,
      Key: todoId,
      Expires: this.urlExpiration
    }) as string
  }

}

const createS3Object = (): AWS.S3 => {
  return new AWS.S3({
    signatureVersion: 'v4'
  })
}
