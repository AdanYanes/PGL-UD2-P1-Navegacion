import React from 'react'

type LoginContextType = {
  isLoged: boolean;
  toggleIsLoged: Function;
}

const LoginContext = React.createContext({} as LoginContextType)

export {LoginContext, LoginContextType};