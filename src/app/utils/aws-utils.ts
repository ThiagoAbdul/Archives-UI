import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";

export function getAwsCredentialsProvider(idToken: string) {
  return fromCognitoIdentityPool({
    identityPoolId: import.meta.env.VITE_IDENTITY_POOL_ID,
    clientConfig: {
      region: import.meta.env.VITE_REGION
    },
    logins: {
      [`cognito-idp.${import.meta.env.VITE_REGION}.amazonaws.com/${import.meta.env.VITE_USER_POOL_ID}`]:
        idToken
    }
  });
}
