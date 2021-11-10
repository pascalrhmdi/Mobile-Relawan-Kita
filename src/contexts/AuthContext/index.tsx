import React, { createContext, useReducer } from "react";

interface AuthContextInterface {
  // Toasting
  isToast: boolean,
  description: String,
  // LoginAuth
  isLoggedIn: boolean,
  // Loading
  loading: boolean,
}

const initialState: AuthContextInterface = {
	isToast: false,
  description: "",
  isLoggedIn: false,
  loading: false
};

const authReducer = (state: AuthContextInterface, action: {type: unknown}) => {
	switch (action.type) {
		// Payload Set User : tipe object 
		// case ACTION_TYPES.SET_LOADING:
		// 	return {
		// 		...state,
		// 		loading: action.payload,
		// 	};
		default:
			return state;
	}
};

const AuthContext = createContext<AuthContextInterface | null>(initialState);

type Props= {
  children?: JSX.Element | JSX.Element[];
}
const AuthProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return(
    <AuthContext.Provider value={ state }>
      {children}
    </AuthContext.Provider>
  )
};

export { AuthContext };
export default AuthProvider