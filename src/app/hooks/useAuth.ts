import { useAuth as useOidcAuth } from "react-oidc-context";




export function useAuth(){
  const { user, removeUser } = useOidcAuth()

    const signOutRedirect = () => {
      removeUser().then(() => {
        const clientId = "itci4rf2edgbb71i85r7iv5ia";
        const logoutUri = "http://localhost:5173/logout";
        const cognitoDomain = "https://us-east-14vdcrduqn.auth.us-east-1.amazoncognito.com";
        window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
      })
  };


  const idToken = user?.id_token
  const sub = user?.profile.sub

  const accessToken = user?.access_token
  
  return { idToken, sub, signOutRedirect, accessToken }
}