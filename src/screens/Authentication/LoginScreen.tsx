import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import {
  Button,
  FormControl,
  Heading,
  HStack,
  Icon,
  Input,
  Text,
  useToast,
  VStack
} from "native-base";
import React, { FC, useContext, useState } from "react";
import {
  FormDataLoginInterface,
  UserResponseInterface
} from ".";
import { loginUrl } from "../../apis";
import { WithTopNavigation } from "../../components/NavigationApp";
import { loginValidate } from "../../constants";
import { storeStorageData } from "../../constants/asyncStorage.const";
import { AuthContext } from "../../contexts/AuthContext";
import { DismissKeyboard } from "../../HOCs";

const initialState: FormDataLoginInterface = {
  email: "",
  password: "",
};

const LoginScreen: FC = ({ navigation }) => {
  const { state, dispatch } = useContext(AuthContext);
  const toast = useToast();
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({} as FormDataLoginInterface);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function handlePasswordIcon(): void {
    setShowPassword((prevValue) => !prevValue);
  }

  function handleInputChange(value: string, fieldName: string): void {
    setFormData({ ...formData, [fieldName]: value });
  }

  async function login(formData: FormDataLoginInterface) {
    setIsLoading((prev) => !prev)
    try {
      const data: UserResponseInterface = (
        await axios.post(loginUrl, JSON.stringify(formData))
      ).data;

      dispatch({ type: "set_user_data", payload: data.data });
      storeStorageData('id_pengguna', data.data.id_pengguna)

      toast.show({
        title: data.message,
        status: "success",
      })

      // Ini akan otomatis pindah ke halaman selanjutnya
      // yakni halaman pertama di logika !isLoggedIn
      dispatch({ type: "set_logged_in", payload: true });
    } catch (e) {
      toast.show({
        title: "Login Gagal",
        size: "0.5",
        status: "danger",
        description: e.response.data.message,
      });
    } finally {
      setIsLoading((prev) => !prev)
    }
  }

  function handleSubmit(): void {
    const isValid = loginValidate(formData);

    // Jika hasilnya object kosong, ini akan dieksekusi
    // kosongin
    if (
      Object.keys(isValid).length === 0 &&
      Object.getPrototypeOf(isValid) === Object.prototype
    ) {
      login(formData);
      setErrors({});
    }
    // Jika ada error, ganti errornya jadi hasil isValid
    else {
      setErrors(() => ({ ...isValid }));
    }
  }

  return (
    <DismissKeyboard>
      <WithTopNavigation safeArea name="Login" bgColor="red.50">
        <Heading color="red.600">Selamat Datang Kembali,</Heading>
        <Heading mt="1" color="coolGray.600" fontWeight="medium" size="xs">
          Masuk untuk lanjut!
        </Heading>

        <VStack space={3} mt="5">
          <FormControl isRequired isInvalid={"email" in errors}>
            <FormControl.Label
              _text={{
                color: "coolGray.800",
              }}
            >
              Email
            </FormControl.Label>
            <Input
              textContentType="emailAddress"
              autoCapitalize="none"
              keyboardType="email-address"
              value={formData.email}
              placeholder="johndoe@gmail.com"
              onChangeText={(value) => handleInputChange(value, "email")}
            />
            {"email" in errors && (
              <FormControl.ErrorMessage>
                {errors.email}
              </FormControl.ErrorMessage>
            )}
          </FormControl>
          <FormControl isRequired isInvalid={"password" in errors}>
            <FormControl.Label>Kata Sandi</FormControl.Label>
            <Input
              value={formData.password}
              onChangeText={(value) => handleInputChange(value, "password")}
              type={showPassword ? "text" : "password"}
              autoCapitalize="none"
              placeholder="********"
              InputRightElement={
                <Button
                  size="xs"
                  mr={2}
                  onPress={handlePasswordIcon}
                  bgColor="transparent"
                  p={2}
                >
                  <Icon
                    as={
                      <MaterialIcons
                        name={showPassword ? "visibility-off" : "visibility"}
                      />
                    }
                    size={5}
                  />
                </Button>
              }
            />
            {"password" in errors && (
              <FormControl.ErrorMessage>
                {errors.password}
              </FormControl.ErrorMessage>
            )}
            <Button
              _text={{ fontSize: "xs", fontWeight: "500", color: "red.600" }}
              alignSelf="flex-end"
              mt="2.5"
              variant="ghost"
              p={0}
            >
              Lupa Password?
            </Button>
          </FormControl>
          <Button
            variant="RK_solidRed"
            shadow={1}
            onPress={handleSubmit}
            isLoading={isLoading}
          >
            Masuk
          </Button>
          <HStack mt="6" justifyContent="center">
            <Text fontSize="sm" color="muted.700" fontWeight={400}>
              Belum punya akun?{" "}
            </Text>
            <Button
              variant="ghost"
              p={0}
              m={0}
              _text={{
                color: "red.600",
                fontWeight: "medium",
                fontSize: "sm",
              }}
              onPress={() => navigation.navigate("Register")}
            >
              Yuk Daftar!
            </Button>
          </HStack>
        </VStack>
      </WithTopNavigation>
    </DismissKeyboard>
  );
};

export default LoginScreen;
