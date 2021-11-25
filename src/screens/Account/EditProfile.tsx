import axios from 'axios'
import { Button, FormControl, Heading, Input, Radio, ScrollView, TextArea, useToast, VStack } from 'native-base'
import React, { useContext, useState } from 'react'
import { FormDataEditProfileInterface } from '.'
import { UserDataInterface, UserResponseInterface } from '..'
import { profileUrl } from '../../apis'
import { InputDateApp } from '../../components/InputApp'
import { WithTopNavigation } from '../../components/NavigationApp'
import { EditProfileValidate } from '../../constants/formValidation.const'
import { AuthContext } from '../../contexts/AuthContext'
import { DismissKeyboard } from '../../HOCs'

interface EditProfileResponseInterface extends Omit<UserResponseInterface, "data"> {
  data: Omit<UserDataInterface, "role" | "email">
}

const EditProfile = ({ navigation }) => {
  const {state, dispatch} = useContext(AuthContext)
  const [formData, setFormData] = useState({
    nama: state.nama,
    jenis_kelamin: state.jenis_kelamin,
    alamat: state.alamat,
    nomor_telepon: state.nomor_telepon,
    tanggal_lahir: state.tanggal_lahir
  })
  const [errors, setErrors] = useState({} as Partial<FormDataEditProfileInterface>);
  const [showDate, setShowDate] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()
  
  function handleInputChange(value: string, fieldName: string): void {
    setFormData({ ...formData, [fieldName]: value})
  }

  const handleDateOnChange = (event, selectedDate: Date|undefined) => {
    const currentDate = selectedDate?.toISOString().substring(0,10) || formData.tanggal_lahir;
    setShowDate(false);
    handleInputChange(currentDate, 'tanggal_lahir');
  };

  async function editProfile(formData: FormDataEditProfileInterface) {
    setIsLoading((prev) => !prev)
    try {
      const data: EditProfileResponseInterface  = (await axios.put(`${profileUrl}/${state.id_pengguna}`, JSON.stringify(formData))).data;
      
      dispatch({type: "set_user_data", payload: data.data})

      toast.show({
        title: data.message,
        status: "success",
      })
      navigation.navigate('Home')
    } catch (e) {
      toast.show({
        title: "Edit Profil Gagal",
        size: '0.5',
        status: "danger",
        description: e.response.data.message,
      })
    } finally {
      setIsLoading((prev) => !prev)
    }
  }

  function handleSubmit():void {
    const isValid = EditProfileValidate(formData);
    
    // Jika hasilnya object kosong, ini akan dieksekusi
    // kosongin
    if (Object.keys(isValid).length === 0 && Object.getPrototypeOf(isValid) === Object.prototype) {
      editProfile(formData)
      setErrors({});
    } 
    // Jika ada error, ganti errornya jadi hasil isValid
    else {
      setErrors( () => ({...isValid}))
    }
  }

  return (
    <DismissKeyboard>
      <WithTopNavigation name="Register" bgColor="light.50">
        <ScrollView showsVerticalScrollIndicator={false}>
          <Heading color="red.600">
            Edit Profil
          </Heading>
          <VStack space={2} mt="5">
            <FormControl isRequired isDisabled>
              <FormControl.Label>
                Email
              </FormControl.Label>
              <Input 
                textContentType="emailAddress"
                autoCapitalize="none"
                keyboardType="email-address"
                value={state.email} />
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
              {'nama' in errors &&
                <FormControl.ErrorMessage>
                  {errors.nama}
                </FormControl.ErrorMessage>
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
                placeholder="Jl. Sesama"
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
              {'nomor_telepon' in errors &&
                <FormControl.ErrorMessage>
                  {errors.nomor_telepon}
                </FormControl.ErrorMessage>
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
              SIMPAN
            </Button>
          </VStack>
        </ScrollView>
      </WithTopNavigation>
    </DismissKeyboard>
  )
}

export default EditProfile
