import React, { createContext, FC, useReducer } from "react";
import { UserDataInterface } from "../../screens";

interface AuthContextInterface extends UserDataInterface {
  // LoginAuth
  isLoggedIn: boolean,
  // Loading
  loading: boolean
}

const initialState: AuthContextInterface = {                         
  isLoggedIn: false,
  loading: false,
  id_pengguna: "",
  role: "",
  nama: "",
  jenis_kelamin: "Laki-laki",
  alamat: "",
  nomor_telepon: "",
  tanggal_lahir: Date()
};

type Action =
    {type: 'set_loading'; payload: boolean }
  | {type: 'set_logged_in'; payload: boolean }
  | {
      type:  'set_user_data';
      payload: UserDataInterface;
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
      };
    case 'set_user_data':
      return {
        ...state,
        ...action.payload
      }
		default:
			return state;
	}
};

const AuthContext = createContext<{state: AuthContextInterface; dispatch: React.Dispatch<Action>;}>
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