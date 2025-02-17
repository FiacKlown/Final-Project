/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import SessionContext from "../context/SessionContext";
import supabase from "../supabase/client";

export default function SessionContextProvider({ children }) {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        setSession(null);
      } else if (session) {
        setSession(session);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
}
