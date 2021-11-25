import { MaterialIcons } from '@expo/vector-icons'
import axios from 'axios'
import { Button, FormControl, Heading, HStack, Icon, Input, Radio, ScrollView, Text, TextArea, useToast, VStack } from 'native-base'
import React, { useContext, useState } from 'react'
import { FormDataRegisterInterface, UserResponseInterface } from '.'
import { registerUrl } from '../../apis'
import { InputDateApp } from '../../components/InputApp'
import { WithTopNavigation } from '../../components/NavigationApp'
import { storeStorageData } from '../../constants/asyncStorage.const'
import { daftarValidate } from '../../constants/formValidation.const'
import { AuthContext } from '../../contexts/AuthContext'
import { DismissKeyboard } from '../../HOCs'

const initialState: FormDataRegisterInterface = {
  email: '',
  password: '',
  nama: '',
  alamat: '',
  nomor_telepon: '',
  jenis_kelamin: "Laki-laki",
  // return hari ini YYYY-MM-DD
  tanggal_lahir: new Date().toISOString().substring(0,10)
}

const RegisterScreen = ({ navigation }) => {
  const {state, dispatch} = useContext(AuthContext)
  const toast = useToast()
  const [formData, setFormData] = useState(initialState)
  const [errors, setErrors] = useState({} as FormDataRegisterInterface);
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showDate, setShowDate] = useState(false)

  function handlePasswordIcon(): void {
    setShowPassword((prevValue) => !prevValue)
  }
  
  function handleInputChange(value: string, fieldName: string): void {
    setFormData({ ...formData, [fieldName]: value})
  }

  const handleDateOnChange = (event, selectedDate: Date|undefined) => {
    const currentDate = selectedDate?.toISOString().substring(0,10) || formData.tanggal_lahir;
    setShowDate(false);
    handleInputChange(currentDate, 'tanggal_lahir');
  };

  async function daftar(formData: FormDataRegisterInterface) {
    setIsLoading((prev) => !prev)
    try {
      const data: UserResponseInterface  = (await axios.post(registerUrl, JSON.stringify(formData))).data;
      
      
      dispatch({type: "set_user_data", payload: data.data})
      const {id_pengguna,nama,role} = data.data;
      storeStorageData('user_data', {id_pengguna,nama,role});
      toast.show({
        title: data.message,
        status: "success",
      })
      // Ini akan otomatis pindah ke halaman selanjutnya
      // yakni halaman pertama di logika !isLoggedIn
      dispatch({type: "set_logged_in", payload: true})
    } catch (e) { 
      toast.show({
        title: "Register Gagal",
        size: '0.5',
        status: "danger",
        description: e.response.data.message,
      })
    } finally {
      setIsLoading((prev) => !prev)
    }
  }

  function handleSubmit():void {
    const isValid = daftarValidate(formData);
    
    // Jika hasilnya object kosong, ini akan dieksekusi
    // kosongin
    if (Object.keys(isValid).length === 0 && Object.getPrototypeOf(isValid) === Object.prototype) {
      daftar(formData)
      setErrors({});
    } 
    // Jika ada error, ganti errornya jadi hasil isValid
    else {
      setErrors( () => ({...isValid}))
    }
  }
  return (
    <DismissKeyboard>
      <WithTopNavigation name="Register" bgColor="red.50">
        <ScrollView showsVerticalScrollIndicator={false}>
          <Heading color="red.600">
            Selamat Datang,
          </Heading>
          <Heading mt="1" color="coolGray.600" fontWeight="medium" size="xs">
            Daftar untuk lanjut!
          </Heading>

          <VStack space={3} mt="5">
            <FormControl isRequired isInvalid={'email' in errors}>
              <FormControl.Label>
                Email
              </FormControl.Label>
              <Input 
                textContentType="emailAddress"
                autoCapitalize="none"
                keyboardType="email-address"
                value={formData.email} 
                placeholder="johndoe@gmail.com" 
                onChangeText={(value) => handleInputChange(value, 'email')} />
              {'email' in errors
                  ?
                    <FormControl.ErrorMessage>
                      {errors.email}
                    </FormControl.ErrorMessage>
                  : 
                    <FormControl.HelperText>
                      Email harus valid
                    </FormControl.HelperText>
              }
            </FormControl>
            <FormControl isRequired isInvalid={'password' in errors}>
              <FormControl.Label>
                Kata Sandi
              </FormControl.Label>
              <Input 
                value={formData.password}
                type={showPassword ? "text" : "password"}
                placeholder="********"
                InputRightElement={
                  <Button size="xs" mr={2} onPress={handlePasswordIcon} bgColor="transparent" p={2}>
                    <Icon
                      as={<MaterialIcons name={showPassword ? "visibility-off" : "visibility"} />}
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
            <FormControl isRequired isInvalid={'nama' in errors}>
              <FormControl.Label>
                Nama Lengkap
              </FormControl.Label>
              <Input 
                type="text"
                value={formData.nama} 
                placeholder="John Doe" 
                onChangeText={(value) => handleInputChange(value, 'nama')} />
              {'nama' in errors
                  ?
                    <FormControl.ErrorMessage>
                      {errors.nama}
                    </FormControl.ErrorMessage>
                  : 
                    <FormControl.HelperText>
                      Nama harus valid
                    </FormControl.HelperText>
              }
            </FormControl>
            <FormControl isRequired isInvalid={'jenis_kelamin' in errors}>
              <FormControl.Label>
                Jenis Kelamin
              </FormControl.Label>
              <Radio.Group
                name="jenis_kelamin"
                accessibilityLabel="jenis_kelamin"
                defaultValue={formData.jenis_kelamin}
                onChange={(value) => {
                  handleInputChange(value, 'jenis_kelamin')
                }}
                ml={5}
              >
                <Radio value="Laki-laki" mb={1} size="sm">
                  Laki-laki
                </Radio>
                <Radio value="Perempuan" size="sm">
                  Perempuan
                </Radio>
              </Radio.Group>
            </FormControl>
            <FormControl isRequired isInvalid={'alamat' in errors}>
              <FormControl.Label>
                Alamat
              </FormControl.Label>
              <TextArea
                aria-label="alamat"
                numberOfLines={4}
                value={formData.alamat}
                textAlignVertical="top"
                onChangeText={(value) => handleInputChange(value, 'alamat')}
              />
              {'alamat' in errors &&
                  <FormControl.ErrorMessage>
                    {errors.alamat}
                  </FormControl.ErrorMessage>
              }
            </FormControl>
            <FormControl isRequired isInvalid={'nomor_telepon' in errors}>
              <FormControl.Label>
                Nomor Telepon
              </FormControl.Label>
              
              <Input 
                autoCompleteType="tel"
                keyboardType="phone-pad"
                value={formData.nomor_telepon} 
                placeholder="081xxxxxxxxx" 
                onChangeText={(value) => handleInputChange(value, 'nomor_telepon')} />
              {'nomor_telepon' in errors
                  ?
                    <FormControl.ErrorMessage>
                      {errors.nomor_telepon}
                    </FormControl.ErrorMessage>
                  : 
                    <FormControl.HelperText>
                      Nomor telepon harus valid
                    </FormControl.HelperText>
              }
            </FormControl>
            <InputDateApp 
              label="Tanggal Lahir"
              inputValue={formData.tanggal_lahir}
              onChangeText={(value) => handleInputChange(value, 'tanggal_lahir')}
              onPress={() => setShowDate(true)}
              showDate={showDate}
              handleDateOnChange={handleDateOnChange}
              helperText="Sesuai KTP"
            />
            <Button variant="RK_solidRed" shadow={0} onPress={handleSubmit} isLoading={isLoading}>
              Daftar
            </Button>
            <HStack mt="6" justifyContent="center">
              <Text fontSize="sm" color="muted.700" fontWeight={400}>
                Sudah punya akun?{' '}
              </Text>
              <Button
                variant="ghost"
                p={0}
                m={0}
                _text={{
                  color: 'red.600',
                  fontWeight: 'medium',
                  fontSize: 'sm',
                }}
                onPress={() => navigation.navigate('Login')}>
                Masuk!
              </Button>
            </HStack>
          </VStack>
        </ScrollView>
      </WithTopNavigation>
    </DismissKeyboard>
  )
}

export default RegisterScreen
