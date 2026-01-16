import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider, type AuthProviderProps } from "react-oidc-context";
import { BrowserRouter } from 'react-router-dom';
import { LoaderProvider } from './app/contexts/LoaderContext.tsx';



const cognitoAuthConfig: AuthProviderProps = {
  authority: "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_4VDCrDUqn",
  client_id: "itci4rf2edgbb71i85r7iv5ia",
  redirect_uri: "http://localhost:5173",
  response_type: "code",
  scope: "email openid profile"
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LoaderProvider>
      <AuthProvider {...cognitoAuthConfig}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </LoaderProvider>
  </StrictMode>,
)
