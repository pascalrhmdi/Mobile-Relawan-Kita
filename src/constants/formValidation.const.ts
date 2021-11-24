import { FormDataEditProfileInterface, FormDataLoginInterface, FormDataRegisterInterface, FormDataUbahKataSandiInterface } from "../screens";

const validation = {
	email: {
		presence: {
			message: "Alamat email wajib diisi",
		},
    validate: {
      isValid: (email: string) => /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email),
      message: "Alamat email tidak valid!"
    }
	},

	password: {
		presence: {
			message: "Password wajib diisi",
		},
		length: {
			minimum: 5,
			message: "Panjang password minimal 6 karakter",
		},
	},
  
  nama: {
    message: "Nama wajib diisi"
  },

  alamat: {
    message: "Alamat rumah wajib diisi"
  },

  nomor_telepon: {
    message: "Nomor telepon wajib diisi"
  },

  jenis_kelamin: {
    message: "Jenis kelamin wajib diisi"
  },

  tanggal_lahir: {
    message: "Tanggal lahir wajib diisi"
  }
};

export const loginValidate = (formData: FormDataLoginInterface) => {
  const errors: Partial<FormDataLoginInterface> = {}

  if (!validation.email.validate.isValid(formData.email)){
    errors.email = validation.email.validate.message
  }
  
  if (formData.password.length < validation.password.length.minimum){
    errors.password = validation.password.length.message;
  }
  
  if (formData.email === '') {
    errors.email = validation.email.presence.message;
  }
  if (formData.password === ''){
    errors.password = validation.password.presence.message;
  }

  return errors
};

export const daftarValidate = (formData: FormDataRegisterInterface) => {
  let errors: Partial<FormDataRegisterInterface> = loginValidate(formData);

  if (formData.nama === '') {
    errors.nama = validation.nama.message;
  }

  if (formData.alamat === '') {
    errors.alamat = validation.alamat.message;
  }
  
  if (formData.nomor_telepon === '') {
    errors.nomor_telepon = validation.nama.message;
  }
  
  if (formData.tanggal_lahir === '') {
    errors.tanggal_lahir = validation.tanggal_lahir.message;
  }

  return errors
}

export const ubahKataSandiValidate = (formData: FormDataUbahKataSandiInterface) => {
  const errors: Partial<FormDataUbahKataSandiInterface> = {}
  
  if (formData.password.length < validation.password.length.minimum){
    errors.password = validation.password.length.message;
  }

  if (formData.password_baru.length < validation.password.length.minimum){
    errors.password_baru = validation.password.length.message;
  }

  if (formData.password === ''){
    errors.password = validation.password.presence.message;
  }
  
  if (formData.password_baru === '') {
    errors.password_baru = validation.password.presence.message;
  }
  
  if (formData.password_verifikasi === '') {
    errors.password_verifikasi = validation.password.presence.message;
  }

  return errors
}

export const EditProfileValidate = (formData: FormDataEditProfileInterface) => {
  let errors: Partial<FormDataEditProfileInterface> = {};

  if (formData.nama === '') {
    errors.nama = validation.nama.message;
  }

  if (formData.alamat === '') {
    errors.alamat = validation.alamat.message;
  }
  
  if (formData.nomor_telepon === '') {
    errors.nomor_telepon = validation.nama.message;
  }
  
  if (formData.tanggal_lahir === '') {
    errors.tanggal_lahir = validation.tanggal_lahir.message;
  }

  return errors
}
