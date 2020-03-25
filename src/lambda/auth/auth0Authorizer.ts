import { CustomAuthorizerEvent, CustomAuthorizerResult } from 'aws-lambda'
import 'source-map-support/register'

import Axios from 'axios'
import { verify, decode } from 'jsonwebtoken'
import { createLogger } from '../../utils/logger'
import { Jwt } from '../../auth/Jwt'
import { JwtPayload } from '../../auth/JwtPayload'

const logger = createLogger('auth')
const jwksUrl = process.env.AUTH_URL

export const handler = async (
  event: CustomAuthorizerEvent
): Promise<CustomAuthorizerResult> => {
  logger.info('Authorizing a user', event.authorizationToken)
  try {
    const jwtToken = await verifyToken(event.authorizationToken)
    logger.info('User was authorized', jwtToken)

    return {
      principalId: jwtToken.sub,
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Allow',
            Resource: '*'
          }
        ]
      }
    }
  } catch (e) {
    logger.error('User not authorized', { error: e.message })

    return {
      principalId: 'user',
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Deny',
            Resource: '*'
          }
        ]
      }
    }
  }
}

async function getKeys(url) {
  try {
    const { data } = await Axios.get(url);
    return data.keys;
  } catch(err) {
    console.log(err)
    throw new Error("Erro request data")
  }
}

function getCert(x5c): string{
  return `-----BEGIN CERTIFICATE-----\n${x5c.match(/.{1,64}/g).join('\n')}\n-----END CERTIFICATE-----\n`
}

function getPublicKey(keys): string {

  if(!keys || !keys.length)
    throw new Error("Invalid Key")

  const publicKey = keys
    .filter(key => key.use === 'sig'
      && key.kty === 'RSA'
      && key.kid
      && ((key.x5c && key.x5c.length) || (key.n && key.e))
    ).map(key => getCert(key.x5c[0]))
  
  if (!publicKey.length)
    throw new Error("Invalid Public Key")

  return publicKey[0];
}

async function verifyToken(authHeader: string): Promise<JwtPayload> {
  const token = getToken(authHeader)
  const jwt: Jwt = decode(token, { complete: true }) as Jwt	

  if(!jwt)
    throw new Error("Invalid token")

  const keys = await getKeys(jwksUrl);
  const publicKey = getPublicKey(keys);
  const payload = verify(token, publicKey, { algorithms: ['RS256'] })
  return payload as JwtPayload
}

function getToken(authHeader: string): string {
  if (!authHeader) throw new Error('No authentication header')

  if (!authHeader.toLowerCase().startsWith('bearer '))
    throw new Error('Invalid authentication header')

  const split = authHeader.split(' ')
  const token = split[1]

  return token
}
