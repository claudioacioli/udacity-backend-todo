import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'

export class S3Access {
  
  constructor(
    private readonly s3: AWS.S3 = createS3Object(),
    private readonly bucketName = process.env.TODOS_IMAGES_S3_BUCKET,
    private readonly urlExpiration = 300
  ) {
  }
  
  async getAttachmentUrl(todoId: string): Promise<string> {
    try{
      await this.s3.headObject({
        Bucket: this.bucketName,
        Key: todoId
      }).promise()
      return `https://${this.bucketName}.s3.amazonaws.com/${todoId}`
    } catch(err) {
      console.error(err)
      return null
    }
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
  const XAWS = AWSXRay.captureAWS(AWS)
  return new XAWS.S3({
    signatureVersion: 'v4'
  })
}
