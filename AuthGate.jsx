import { useEffect, useState } from "react"
import { supabase } from "./supabase"

export default function AuthGate({ sendSession, children }) {
  const [session, setSession] = useState(null);
  // сразу при запуске сайта
  useEffect(() => {
    async function getSession() {
      const { data } = await supabase.auth.getSession();
      setSession(data.session); // session - или null или объект
    }

    getSession();

    const {data: sub} = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
      setSession(newSession)
    }
  )
  }, []);

  //автоотправка в приложение инфы о сессии
  //сессию отправляем только когда она изменилась
  useEffect(() => {

    async function createProfileNote() {
      const {error} = await supabase.from("Profiles").upsert([
        {
          id: session.user.id,
          email: session.user.email,
          updated_at: new Date().toISOString(),
        }
    ])

    if (error) {
      console.error(error)
    }
    }

    if (session?.user) {
      createProfileNote()
    }

    sendSession(session);
  }, [session]);
  
  return <div>{children}</div>;
}