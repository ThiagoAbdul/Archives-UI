import { useAuth as useOidcAuth } from "react-oidc-context";




export function useAuth(){
  const { user, removeUser } = useOidcAuth()

    const signOutRedirect = () => {
      removeUser().then(() => {
        localStorage.clear()
        sessionStorage.clear()
        const clientId = import.meta.env.VITE_COGNITO_CLIENT_ID;
        const logoutUri = import.meta.env.VITE_LOGOUT_URI;
        const cognitoDomain = import.meta.env.VITE_COGNITO_DOMAIN;
        window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
      })
  };


  const idToken = user?.id_token
  const sub = user?.profile.sub

  const accessToken = user?.access_token
  
  return { idToken, sub, signOutRedirect, accessToken }
}