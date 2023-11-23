
import { createContext, useEffect, useReducer, useState, ReactNode, } from "react";


interface AuthState {
  user: string | null;
  loading: boolean;
  error: any;
}

interface AuthAction {
  type: string;
  // payload?: User | any; 
  payload: string | any;
}

interface AuthContextProps {
  user: string | null;
  loading: boolean;
  error: any;
}

const INITIAL_STATE: AuthState = {
  user: localStorage.getItem("user" || ""),
  loading: false,
  error: null,
};

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

const AuthReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        loading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        loading: false,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        loading: false,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        user: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", state?.user || '');
  }, [state?.user]);

  return (
    <>
      <AuthContext.Provider value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}>
        {children}
      </AuthContext.Provider>
    </>
  );
};
