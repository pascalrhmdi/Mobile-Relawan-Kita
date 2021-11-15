import React, { createContext, FC, useReducer } from "react";

interface AuthContextInterface {
  // LoginAuth
  isLoggedIn: boolean,
  // Loading
  loading: boolean,
}

const initialState: AuthContextInterface = {
  isLoggedIn: false,
  loading: false
};

enum ActionType {
  SET_LOADING = 'set_loading',
  SET_LOGGED_IN = 'set_logged_in',
}

type Action =
  | {type: ActionType.SET_LOADING; payload: boolean }
  | {
      type: ActionType.SET_LOGGED_IN;
      payload: boolean;
    }

const authReducer = (state: AuthContextInterface, action: Action): AuthContextInterface => {
	switch (action.type) {
    case "set_logged_in":
			return {
				...state,
				isLoggedIn: action.payload,
			};
    case "set_loading":
      return {
        ...state,
        loading: action.payload
      }
		default:
			return state;
	}
};

const AuthContext = createContext<{state: AuthContextInterface; dispatch: React.Dispatch<any>;}>
({state: initialState,
  dispatch: () => null
});

const AuthProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return(
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
};

export { AuthContext };
export default AuthProvider