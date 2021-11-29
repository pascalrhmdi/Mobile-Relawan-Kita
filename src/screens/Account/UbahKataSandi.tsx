import { MaterialIcons } from '@expo/vector-icons'
import axios, { AxiosError } from 'axios'
import { Button, FormControl, Heading, Icon, Input, Text, useToast } from 'native-base'
import React, { useContext, useState } from 'react'
import { FormDataUbahKataSandiInterface } from '.'
import { UserResponseInterface } from '..'
import { ubahKataSandiUrl } from '../../apis'
import { WithTopNavigation } from '../../components/NavigationApp'
import { ubahKataSandiValidate } from '../../constants/formValidation.const'
import { AuthContext } from '../../contexts/AuthContext'
import { DismissKeyboard } from '../../HOCs'

interface showPasswordInterface {
  password: boolean,
  password_baru: boolean,
  password_verifikasi: boolean
}

const UbahKataSandi: React.FC = ({ navigation }) => {
  const {state, dispatch} = useContext(AuthContext)
  
  // aku taro sini soalnya userId diisi dulu
  // biar gausah assign lg di fungsi ubahKataSandi()
  const initialState: FormDataUbahKataSandiInterface = {
    userId: state.id_pengguna,
    password: '',
    password_baru: '',
    password_verifikasi: ''
  }

  const [formData, setFormData] = useState(initialState)
  const [errors, setErrors] = useState({} as FormDataUbahKataSandiInterface);
  const [showPassword, setShowPassword] = useState({} as showPasswordInterface)
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()

  function handleInputChange(value: string, fieldName: string): void {
    setFormData({ ...formData, [fieldName]: value})
  }

  function handleShowPassword(fieldName: string): void {
    const value = showPassword[fieldName] ? false : true;
    setShowPassword({ ...showPassword, [fieldName]: value})
  }

  async function ubahKataSandi(formData: FormDataUbahKataSandiInterface) {
    setIsLoading((prev) => !prev)
    try {
      // for restful api
      // const data: Omit<UserResponseInterface, "data">  = (await axios.put(ubahKataSandiUrl, JSON.stringify(formData))).data;

      // for non restful api
      const data: Omit<UserResponseInterface, "data">  = (await axios.post(`${ubahKataSandiUrl}-2`, JSON.stringify(formData))).data;
      
      toast.show({
        title: data.message,
        status: "success",
      })

      navigation.goBack()
      
    } catch (e: Error | AxiosError) {
      toast.show({
        description: e.response.data.message,
        title:'Gagal!',
        size: '0.5',
        status: "danger",
      })
    } finally {
      dispatch({type: "set_loading", payload: false});
      setIsLoading((prev) => !prev);
    }
  }

   function handleSubmit(): void {
    const isValid = ubahKataSandiValidate(formData);
    
    // Jika hasilnya object kosong, ini akan dieksekusi
    // kosongin
    if (Object.keys(isValid).length === 0 && Object.getPrototypeOf(isValid) === Object.prototype) {
       ubahKataSandi(formData)
    } 
    // Jika ada error, ganti errornya jadi hasil isValid
    else {
      setErrors( () => ({...isValid}))
    }
  }

  return (
    <DismissKeyboard>

      <WithTopNavigation safeArea name="Ubah Kata Sandi" bgColor="light.50">
        <Heading color="red.600">
          Ubah Kata Sandi
        </Heading>
        <Text fontSize="sm" mt={0.5}>
          {`Buat kata sandi yang baru!\nKata sandi baru tidak boleh sama dari sebelumnya.`} 
        </Text>
        <FormControl mt={4} isRequired isInvalid={'password' in errors}>
          <FormControl.Label>
            Kata Sandi
          </FormControl.Label>
          <Input
            value={formData.password}
            type={showPassword.password ? "text" : "password"}
            placeholder="********"
            InputRightElement={
              <Button size="xs" mr={2} onPress={() => handleShowPassword('password')} bgColor="transparent" p={2}>
                <Icon
                  as={<MaterialIcons name={showPassword.password ? "visibility-off" : "visibility"} />}
                  size={5}
                />
              </Button>
            }
            onChangeText={(value) => handleInputChange(value, 'password')} 
          />
          {'password' in errors 
              ?
                <FormControl.ErrorMessage>
                  {errors.password}
                </FormControl.ErrorMessage>
              : 
                <FormControl.HelperText>
                  Password harus lebih dari 6 karakter
                </FormControl.HelperText>
          }
        </FormControl>
        <FormControl isRequired isInvalid={'password_baru' in errors}>
          <FormControl.Label>
            Kata Sandi Baru
          </FormControl.Label>
          <Input
            value={formData.password_baru}
            type={showPassword.password_baru ? "text" : "password"}
            placeholder="********"
            InputRightElement={
              <Button size="xs" mr={2} onPress={() => handleShowPassword('password_baru')} bgColor="transparent" p={2}>
                <Icon
                  as={<MaterialIcons name={showPassword.password_baru ? "visibility-off" : "visibility"} />}
                  size={5}
                />
              </Button>
            }
            onChangeText={(value) => handleInputChange(value, 'password_baru')} 
          />
          {'password_baru' in errors 
              ?
                <FormControl.ErrorMessage>
                  {errors.password_baru}
                </FormControl.ErrorMessage>
              : 
                <FormControl.HelperText>
                  Password harus lebih dari 6 karakter
                </FormControl.HelperText>
          }
        </FormControl>
        <FormControl isRequired isInvalid={'password_verifikasi' in errors}>
          <FormControl.Label>
            Ulangi Kata Sandi Baru
          </FormControl.Label>
          <Input
            value={formData.password_verifikasi}
            type={showPassword.password_verifikasi ? "text" : "password"}
            placeholder="********"
            InputRightElement={
              <Button size="xs" mr={2} onPress={() => handleShowPassword('password_verifikasi')} bgColor="transparent" p={2}>
                <Icon
                  as={<MaterialIcons name={showPassword.password_verifikasi ? "visibility-off" : "visibility"} />}
                  size={5}
                />
              </Button>
            }
            onChangeText={(value) => handleInputChange(value, 'password_verifikasi')} 
          />
          {'password_verifikasi' in errors 
              ?
                <FormControl.ErrorMessage>
                  {errors.password_verifikasi}
                </FormControl.ErrorMessage>
              : 
                <FormControl.HelperText>
                  Harus sama dengan kata sandi baru
                </FormControl.HelperText>
          }
        </FormControl>
        <Button variant="RK_solidRed" mt={6} shadow={1} onPress={handleSubmit} isLoading={isLoading}>
          SIMPAN
        </Button>
      </WithTopNavigation>
    </DismissKeyboard>
  )
}

export default UbahKataSandi
