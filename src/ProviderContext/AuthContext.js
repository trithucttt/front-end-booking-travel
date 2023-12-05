import { createContext, useContext, useState } from "react"

const AuthContext = createContext();

export function useAuth(){

    return useContext(AuthContext);

}

export function AuthProvide({children}){
      const [hdRegis,setHdRegis] = useState(false);
      return (
        <AuthContext.Provider value={{hdRegis, setHdRegis}}>
            {children}
        </AuthContext.Provider>
      )
}


