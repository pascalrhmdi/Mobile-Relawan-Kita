import { MaterialIcons } from '@expo/vector-icons'
import { Box, Button, FormControl, Heading, HStack, Icon, Input, Text, useToast, VStack } from 'native-base'
import React, { FC, useContext, useEffect, useState } from 'react'
import { FormDataLoginInterface } from '.'
import { loginUrl } from '../../apis'
import { loginValidate } from '../../constants'
import { AuthContext } from '../../contexts/AuthContext'
import { DismissKeyboard } from '../../HOCs'

const initialState: FormDataLoginInterface = {
  email: '',
  password: ''
}

const LoginScreen: FC = ({ navigation }) => {
  const {state, dispatch} = useContext(AuthContext)
  const toast = useToast()
  const [formData, setFormData] = useState(initialState)
  const [errors, setErrors] = useState({} as FormDataLoginInterface);
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    dispatch({type: "set_loading", payload: false});
  }, [])

  function handlePasswordIcon(): void {
    setShowPassword((prevValue) => !prevValue)
  }
  
  function handleInputChange(value: string, fieldName: string): void {
    setFormData({ ...formData, [fieldName]: value})
  }
  
  async function login(formData: FormDataLoginInterface) {
    dispatch({type: "set_loading", payload: true})

    const config = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    }

    try {
      console.log(loginUrl)
      // const {data}  = (await axios.post(loginUrl, formData));
      const data = (await fetch(loginUrl, config)).json();
      
      console.log(data);
      
      toast.show({
        title: data.message,
        status: "success",
      })
      dispatch({type: "set_loading", payload: false})
    } catch (e) { 
      toast.show({
        title: "Login Gagal",
        size: '0.5',
        status: "danger",
        description: e.message,
      })
      dispatch({type: "set_loading", payload: false})
    }
  }

  function handleSubmit(): void {
    const isValid = loginValidate(formData);
    
    // Jika hasilnya object kosong, ini akan dieksekusi
    // kosongin
    if (Object.keys(isValid).length === 0 && Object.getPrototypeOf(isValid) === Object.prototype) {
      login(formData)
      setErrors({});
    } 
    // Jika ada error, ganti errornya jadi hasil isValid
    else {
      setErrors( () => ({...isValid}))
    }
  }

  return (
    <DismissKeyboard>
      <Box safeArea flex={1} py="8" px="4" bgColor="rose.50">
        <Heading>
          Selamat Datang Kembali,
        </Heading>
        <Heading mt="1" color="coolGray.600" fontWeight="medium" size="xs">
          Masuk untuk lanjut!
        </Heading>

        <VStack space={3} mt="5">
          <FormControl isRequired isInvalid={'email' in errors}>
            <FormControl.Label
              _text={{
                color: 'coolGray.800',
              }}>
              Email
            </FormControl.Label>
            <Input 
              textContentType="emailAddress"
              autoCapitalize="none"
              keyboardType="email-address"
              value={formData.email} 
              placeholder="johndoe@gmail.com" 
              onChangeText={(value) => handleInputChange(value, 'email')} />
            {'email' in errors && 
                <FormControl.ErrorMessage>
                  {errors.email}
                </FormControl.ErrorMessage>
            }
          </FormControl>
          <FormControl isRequired isInvalid={'password' in errors}>
            <FormControl.Label
              _text={{
                color: 'coolGray.800',
              }}>
              Password
            </FormControl.Label>
            <Input 
              value={formData.password}
              onChangeText={(value) => handleInputChange(value, 'password' )}
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
            {'password' in errors && 
                <FormControl.ErrorMessage>
                  {errors.password}
                </FormControl.ErrorMessage>
            }
            <Button
              _text={{ fontSize: 'xs', fontWeight: '500', color: 'red.600' }}
              alignSelf="flex-end"
              mt="2.5"
              variant="ghost"
              p={0}>
              Lupa Password?
            </Button>
          </FormControl>
          <Button variant="RK_solidRed" shadow={1} onPress={handleSubmit} isLoading={state.loading}>
            Masuk
          </Button>
          <HStack mt="6" justifyContent="center">
            <Text fontSize="sm" color="muted.700" fontWeight={400}>
              Belum punya akun?{' '}
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
              onPress={() => navigation.navigate('Register')}>
              Yuk Daftar!
            </Button>
          </HStack>
        </VStack>
    </Box>
    </DismissKeyboard>
  )
}

export default LoginScreen
