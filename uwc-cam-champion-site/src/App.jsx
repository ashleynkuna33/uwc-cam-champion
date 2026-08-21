import { AuthScreen, Body, ModuleDetail } from "./screens";
import { UserProvider } from "./context/UserContext";
import { Routes,Route } from "react-router-dom";
import Progress from "./screens/Progress"; 
//import ModuleDetail from "./screens/ModuleDetail";


function App() {
  return (
    <UserProvider>
      <AuthScreen />
      <Body />
      <Routes>
        <Route path="/" element={<Body />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/ModuleDetail/" element={<ModuleDetail />} />
      </Routes>
    </UserProvider>
  )
}

export default App;