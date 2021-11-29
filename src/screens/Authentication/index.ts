import ChooseLoginRegisterScreen from "./ChooseLoginRegisterScreen";
import LoginScreen from "./LoginScreen";
import RegisterScreen from "./RegisterScreen";

interface FormDataLoginInterface {
  email: string,
  password: string
}
interface FormDataRegisterInterface extends FormDataLoginInterface {
  nama: string,
  alamat: string,
  nomor_telepon: string,
  jenis_kelamin: "Laki-laki" | "Perempuan"
  tanggal_lahir: string
}

interface UserDataInterface  {
  id_pengguna: string,
  email: string,
  role: "" | "volunteer",
  nama: string,
  alamat: string,
  nomor_telepon: string,
  jenis_kelamin: "Laki-laki" | "Perempuan",
  tanggal_lahir: string
}

interface UserResponseInterface {
  status: number,
  message: string,
  data: UserDataInterface
}

export {
  ChooseLoginRegisterScreen,
  LoginScreen,
  RegisterScreen,
  FormDataLoginInterface,
  FormDataRegisterInterface,
  UserResponseInterface,
  UserDataInterface
};

