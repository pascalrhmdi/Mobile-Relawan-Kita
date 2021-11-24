import React, { createContext, FC, useReducer } from "react";
import { UserDataInterface } from "../../screens";

interface AuthContextInterface extends UserDataInterface {
  // LoginAuth
  isLoggedIn: boolean,
}

const initialState: AuthContextInterface = {                         
  isLoggedIn: false,
  id_pengguna: "",
  email: "",
  nama: "",
  role: "",
  alamat: "",
  nomor_telepon: "",
  jenis_kelamin: "Laki-laki",
  tanggal_lahir: Date()
};

type Action =
    {type: 'set_loading'; payload: boolean }
  | {type: 'set_logged_out' }
  | {type: 'set_logged_in'; payload: true }
  | {
      type:  'set_user_data';
      payload: Partial<UserDataInterface>;
    }

const authReducer = (state: AuthContextInterface, action: Action): AuthContextInterface => {
	switch (action.type) {
    case "set_logged_in":
			return {
				...state,
				isLoggedIn: action.payload,
			};
    case "set_logged_out":
			return initialState;
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