import { useEffect, useState } from "react"
import { supabase } from "./supabase"
import Login from "./login"
import AuthGate from "./AuthGate";
import Profile from "./Profile";

function App() {
    const [session, setSession] = useState(undefined)

    function handleSession(send) {
      setSession(send)
    }

    return <AuthGate sendSession={handleSession}>
      {session === undefined ? (
        <div>Loading...</div>
      ) : session ? (
        <Profile session={session}/>
      ) : (
      <Login />
      )}
        </AuthGate>
}

export default App;

// Set-ExecutionPolicy Unrestricted (windows powershell от имени админа)
// npm install делается 1 раз для проекта(node_modules)
// npm run dev
// Set-ExecutionPolicy Restricted
// npm install @supabase/supabase-js

// Сессия пользователя:
// 1) вошёл в лк
// 2) не вошёл
