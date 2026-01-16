import './App.css'
import { useAuth } from "react-oidc-context";
import { AppRoutes } from './app/routes';
import { useLoader } from './app/contexts/LoaderContext';
import { Loader } from './app/components/loader/loader';

function App() {


  const auth = useAuth();

  const loader = useLoader()

  auth.events.addUserSignedIn(() => {
    alert("Sign in")
  })

  if (auth.isLoading ) {
    return <div>Loading...</div>;
  }

  if (auth.error) {
    return <div>Encountering error... {auth.error.message}</div>;
  }

  if (auth.isAuthenticated) {
    return <>
      { loader.loading && <Loader /> }
      <AppRoutes/>
    </>
  }

    return (
    <div>
      <button onClick={() => auth.signinRedirect()}>Sign in</button>
    </div>
  );

}

export default App
