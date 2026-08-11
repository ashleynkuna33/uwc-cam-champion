import { AuthScreen, Body } from "./screens";
import { UserProvider } from "./context/UserContext";


function App() {
  return (
    <UserProvider>
      <AuthScreen />
      <Body />
    </UserProvider>
  )
}

export default App;