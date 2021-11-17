import { MaterialIcons } from '@expo/vector-icons'
import RNDateTimePicker from '@react-native-community/datetimepicker'
import axios from 'axios'
import { Box, Button, FormControl, Heading, HStack, Icon, Input, Radio, ScrollView, Text, TextArea, useToast, VStack } from 'native-base'
import React, { useContext, useEffect, useState } from 'react'
import { FormDataRegisterInterface, UserResponseInterface } from '.'
import { registerUrl } from '../../apis'
import { storeStorageData } from '../../constants/asyncStorage.const'
import { BulanLibFromDate } from '../../constants/bulanLib.const'
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
  const [showDate, setShowDate] = useState(false)

  useEffect(() => {
    dispatch({type: "set_loading", payload: false});
  }, [])

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
    dispatch({type: "set_loading", payload: true})
    try {
      const data: UserResponseInterface  = (await axios.post(registerUrl, formData)).data;
      
      toast.show({
        title: data.message,
        status: "success",
      })
      dispatch({type: "set_loading", payload: false})
      dispatch({type: "set_user_data", payload: data.data})
      storeStorageData('id_pengguna', data.data.id_pengguna)
      // Ini akan otomatis pindah ke halaman selanjutnya
      // yakni halaman pertama di logika !isLoggedIn
      dispatch({type: "set_logged_in", payload: true})
    } catch (e) { 
      toast.show({
        title: "Register Gagal",
        size: '0.5',
        status: "danger",
        description: e.message,
      })
      dispatch({type: "set_loading", payload: false})
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
      <ScrollView alwaysBounceVertical showsVerticalScrollIndicator={false}>
        <Box safeArea flex={1} py="8" px="4" bgColor="rose.50">
          <Heading>
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
                    <FormControl.HelperText alignSelf="flex-end">
                      Email harus valid
                    </FormControl.HelperText>
              }
            </FormControl>
            <FormControl isRequired isInvalid={'password' in errors}>
              <FormControl.Label>
                Password
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
              />
              {'password' in errors 
                  ?
                    <FormControl.ErrorMessage>
                      {errors.password}
                    </FormControl.ErrorMessage>
                  : 
                    <FormControl.HelperText alignSelf="flex-end">
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
                    <FormControl.HelperText alignSelf="flex-end">
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
                placeholder="Jl. Sesama"
                textAlignVertical="top"
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
                    <FormControl.HelperText alignSelf="flex-end">
                      Nomor telepon harus valid
                    </FormControl.HelperText>
              }
            </FormControl>
            <FormControl isRequired isInvalid={'tanggal_lahir' in errors}>
              <FormControl.Label>
                Tanggal Lahir
              </FormControl.Label>
              <Input 
                showSoftInputOnFocus={false}
                value={`${BulanLibFromDate(
									formData.tanggal_lahir,
									false
								)}`} 
                onPressIn={() => setShowDate(true)}
                onChangeText={(value) => handleInputChange(value, 'tanggal_lahir')}
                InputRightElement={
                  <Icon
                    as={<MaterialIcons name="today" />}
                    onPress={() => setShowDate(true)}
                    size={6}
                    mr="2"
                  />  
                }/>
              {'tanggal_lahir' in errors
                  ?
                    <FormControl.ErrorMessage>
                      {errors.tanggal_lahir}
                    </FormControl.ErrorMessage>
                  : 
                    <FormControl.HelperText alignSelf="flex-end">
                      Sesuai KTP
                    </FormControl.HelperText>
              }
            </FormControl>
            {showDate && 
              <RNDateTimePicker
                testID="dateTimePicker"
                value={new Date(formData.tanggal_lahir)}
                // Maximun adalah Hari ini new Date()
                maximumDate={new Date()}
                minimumDate={new Date(1950, 0, 1)}
                onChange={handleDateOnChange}
              />
            }
            <Button variant="RK_solidRed" shadow={0} onPress={handleSubmit} isLoading={state.loading}>
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
        </Box>
      </ScrollView>
    </DismissKeyboard>
  )
}

export default RegisterScreen
