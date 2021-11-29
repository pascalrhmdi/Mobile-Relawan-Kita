import React from "react";
import Constants from "expo-constants";
import {
  ScrollView,
  Box,
  Heading,
  Text,
  Divider,
  HStack,
  VStack,
  Icon,
} from "native-base";
import { WithTopNavigation } from "../../components/NavigationApp";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const TentangScreen = () => {
  return (
    <Box safeArea bgColor="light.50" flex={1}>
      <Box px="4" pt="3" bgColor="white">
        <WithTopNavigation name="Tentang" />
      </Box>
      <ScrollView>
        <Box px="4" py="5">
          <Heading color="red.600" mb="3" size="xl">
            Tentang
          </Heading>
          <Text bold fontSize="sm" mb="3">
            Apa Itu Relawan Kita?
          </Text>
          <Text bold fontSize="sm" mb="4" lineHeight="2xl">
            Relawan Kita adalah wadah online untuk mempertemukan relawan dan
            organisasi/komunitas sosial.
          </Text>
          <Text fontSize="xs" mb="5" textAlign="justify" lineHeight="3xl">
            Relawan Kita adalah platform untuk membuat kolaborasi antara relawan
            dan organisasi yang terkadang sulit untuk mencari relawan di
            Indonesia, sehingga harapannya kami dapat memudahkan organisasi di
            Indonesia untuk mengembangkan acaranya.
          </Text>
          <Text bold fontSize="sm" mb="3">
            Mengapa Relawan Kita?
          </Text>
          <Box
            bgColor="red.200"
            borderLeftColor="red.400"
            borderLeftWidth="10px"
            borderRadius="md"
            p="5"
            mb="2">
            <Text bold fontSize="sm" mb="3">
              Info Event Lengkap
            </Text>
            <Text fontSize="xs" textAlign="justify" lineHeight="3xl">
              Kini tidak perlu bingung lagi cara untuk berprestasi dan menjadi
              produktif, kamu dapat mengakses berbagai info event kerelawanan
              dalam satu platform.
            </Text>
          </Box>
          <Divider my="5" />
          <Text bold fontSize="sm" mb="5">
            Kontak
          </Text>
          <VStack space="3.5">
            <HStack space="2">
              <Icon
                size="7"
                as={MaterialCommunityIcons}
                name="whatsapp"
                color="green.500"
              />
              <Text alignSelf="center" >
                081234567890
              </Text>
            </HStack>
            <HStack space="2">
              <Icon
                size="7"
                as={MaterialCommunityIcons}
                name="email-outline"
                color="red.400"
              />
              <Text alignSelf="center" >
                halo@relawankita.id
              </Text>
            </HStack>
            <HStack space="2">
              <Icon
                size="7"
                as={MaterialCommunityIcons}
                name="instagram"
                color="#f58529"
              />
              <Text alignSelf="center" >
                @relawankita
              </Text>
            </HStack>
          </VStack>
          <Divider my="5" />
          <Text bold fontSize="sm" mb="3">
            Versi
          </Text>
          <Text>{Constants.manifest?.version}</Text>
          <Divider my="5" />
          <Text bold fontSize="sm" mb="3">
            Copyright
          </Text>
          <Text>PT. Relawan Kita Indonesia</Text>
        </Box>
      </ScrollView>
    </Box>
  );
};

export default TentangScreen;
