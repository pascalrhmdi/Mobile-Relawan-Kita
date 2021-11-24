import EditProfileScreen from './EditProfile';
import ListAktivitasScreen from './ListAktivitas';
import ProfileScreen from "./ProfileScreen";
import TentangScreen from './TentangScreen';
import UbahKataSandiScreen from './UbahKataSandi';

export interface FormDataUbahKataSandiInterface {
  userId?: string,
  password: string,
  password_baru: string,
  password_verifikasi: string
}

export interface FormDataEditProfileInterface {
  nama: string,
  jenis_kelamin: "Laki-laki" | "Perempuan",
  alamat: string,
  nomor_telepon: string,
  tanggal_lahir: string
}

export {
  ProfileScreen,
  EditProfileScreen,
  UbahKataSandiScreen,
  ListAktivitasScreen,
  TentangScreen,
};

