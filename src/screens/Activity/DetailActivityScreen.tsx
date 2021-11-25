import React, { useState, useContext } from "react";
import Constants from "expo-constants";
import axios from "axios";
import * as Linking from "expo-linking";
import {
  ScrollView,
  Box,
  Icon,
  Circle,
  Text,
  Button,
  HStack,
  useToast,
  IconButton,
} from "native-base";
import { useFetchGet } from "../../Hooks";
import { activityMainUrl, registerAnActivityUrl } from "../../apis";
import { AuthContext } from "../../contexts/AuthContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ImageBackground, RefreshControl } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { WithTopNavigation } from "../../components/NavigationApp";
import { ErrorMessage, LoadingStateDisplay } from "../../components/General";
import {
  BulanLibFromDate,
  HariLibFromDate,
} from "../../constants/bulanLib.const";

export const DetailActivityScreen = ({ route }) => {
  const { eventId } = route.params;
  const [refreshing, setRefreshing] = useState(false);
  const detailActivity = useFetchGet(
    `${activityMainUrl}/${eventId}`,
    refreshing
  );
  const [registerLoading, setRegisterLoading] = useState(false);
  const { state } = useContext(AuthContext);
  const toast = useToast();

  const handleRegister = async () => {
    setRegisterLoading(true);
    const registerData = {
      eventId: detailActivity.data.id_acara,
      userId: state.id_pengguna,
    };

    try {
      const response = (await axios.post(registerAnActivityUrl, registerData))
        .data;
      toast.show({
        title: "Berhasil",
        size: "0.5",
        status: "success",
        placement: "top",
        description: response.message,
      });
    } catch (error) {
      toast.show({
        title: "Gagal",
        size: "0.5",
        status: "danger",
        placement: "top",
        description: error.response.data.message,
      });
    } finally {
      setRegisterLoading(false);
    }
  };

  const MainElement = () => {
    return (
      <>
        <ImageBackground
          source={{
            uri: `${Constants.manifest?.extra?.apiBaseUrl}/assets/images/cover/${detailActivity.data.cover}`,
          }}
          resizeMode="cover"
          style={{
            height: 350,
          }}>
          <Box p="4" style={{ position: "absolute", zIndex: 3 }} height="100%">
            <WithTopNavigation name="Detail Aktivitas" />
            <Box px="1" flex={1} justifyContent="space-between">
              <Text fontSize="xl" lineHeight="sm">
                {HariLibFromDate(detailActivity.data.tanggal_acara)}, {"\n"}
                {BulanLibFromDate(detailActivity.data.tanggal_acara)}
              </Text>
              <Box mb="12" pb="4">
                <Text
                  fontSize="2xl"
                  fontWeight="bold"
                  width="80%"
                  color="white"
                  lineHeight="sm">
                  {detailActivity.data.judul_acara}
                </Text>
                <Text fontSize="md" width="65%" color="white">
                  {detailActivity.data.nama}
                </Text>
              </Box>
              <HStack>
                <Icon
                  as={MaterialCommunityIcons}
                  name="map-marker"
                  color="white"
                  size={4}
                  mr="3px"
                />
                <Text fontSize="xs" color="white" isTruncated>
                  {detailActivity.data.lokasi}
                </Text>
              </HStack>
            </Box>
          </Box>
          <LinearGradient
            // Background Linear Gradient
            colors={["rgba(255,255,255,0.9)", "rgba(0,0,0,0.5)"]}
            locations={[0.1, 0.7]}
            style={{ width: "100%", height: "100%" }}
          />
        </ImageBackground>
        <Box p="5">
          <HStack alignItems="center" mb="4" w="100%" flex={1}>
            <Circle size="10" bg="#065f46">
              G
            </Circle>
            <Circle size="10" bg="primary.800" ml="-2">
              S
            </Circle>
            <Circle size="10" bg="light.800" ml="-2" _text={{ fontSize: 11 }}>
              {`+${detailActivity.data.total_pendaftar}`}
            </Circle>
            <Text ml="3" fontWeight="bold" fontSize="xs" flex={1}>
              {detailActivity.data.total_pendaftar}+ relawan mengikuti aktivitas
              ini
            </Text>
          </HStack>
          <Text fontWeight="bold">
            Jenis Aktivitas : {detailActivity.data.nama_jenis_acara}
          </Text>
          <Text fontWeight="bold">
            Relawan Dibutuhkan : {detailActivity.data.jumlah_kebutuhan} Orang
          </Text>
          <Text fontWeight="bold">Deskripsi Acara : </Text>
          <Text>{detailActivity.data.deskripsi_acara}</Text>
          <HStack my="5">
            <Icon
              as={MaterialCommunityIcons}
              name="alert-circle"
              size={5}
              color="red.600"
            />
            <Text fontWeight="bold" color="red.600" ml="1">
              Batas pendaftaran{" "}
              {BulanLibFromDate(detailActivity.data.tanggal_batas_registrasi)}
            </Text>
          </HStack>
          <HStack>
            <IconButton
              onPress={() =>
                Linking.openURL(
                  `https://wa.me/${
                    detailActivity.data.nomor_telepon?.split("")[0] == "0"
                      ? "62"
                      : ""
                  }${detailActivity.data.nomor_telepon}`
                )
              }
              icon={<Icon as={MaterialCommunityIcons} name="whatsapp" />}
              // borderRadius="full"
              borderRadius="sm"
              _icon={{
                color: "green.500",
                size: "md",
              }}
              _pressed={{
                bg: "green.600:alpha.20",
              }}
              mx="2"
            />
            <Button
              variant="RK_solidRed"
              shadow={1}
              isLoading={registerLoading}
              onPress={handleRegister}
              flex={1}>
              Daftar
            </Button>
          </HStack>
        </Box>
      </>
    );
  };

  return (
    <Box safeArea flex={1} bgColor="light.50">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing((prevState) => !prevState);

              setTimeout(() => {
                if (!detailActivity.isLoading) {
                  setRefreshing((prevState) => !prevState);
                }
              }, 1000);
            }}
          />
        }>
        {detailActivity.isLoading && (
          <Box p="4" flex={1}>
            <WithTopNavigation name="Detail Aktivitas" />
            <LoadingStateDisplay />
          </Box>
        )}
        {!detailActivity.isLoading && detailActivity.error && (
          <Box p="4" flex={1}>
            <WithTopNavigation name="Detail Aktivitas" />
            <ErrorMessage errorMsg={detailActivity.error} additionalMsg="Swipe kebawah untuk refresh"/>
          </Box>
        )}
        {!detailActivity.isLoading && !detailActivity.error && <MainElement />}
      </ScrollView>
    </Box>
  );
};