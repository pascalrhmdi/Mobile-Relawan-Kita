import React from "react";
import Constants from "expo-constants";
import {
  Pressable,
  Box,
  Center,
  HStack,
  VStack,
  Image,
  Text,
} from "native-base";
import { ActivityDataInterface } from ".";
import {BulanLibFromDate} from "../../constants/bulanLib.const";

type props = {
  data: ActivityDataInterface;
  navigation: any;
};

const ActivityCard = ({ data, navigation }: props) => {
  return (
    <Pressable
      unstable_pressDelay={75}
      onPress={() => navigation.navigate("DetailActivityScreen",{eventId:data.id_acara})}>
      {({ isPressed }) => (
        <Box
          width="100%"
          rounded="lg"
          bgColor={isPressed ? "gray.200" : "white"}
          p="3"
          mb="3">
          <HStack space="1">
            <Center>
              <Image
                source={{
                  uri: `${Constants.manifest?.extra?.apiBaseUrl}/assets/images/cover/${data.cover}`,
                }}
                size="md"
                resizeMode="cover"
                borderRadius="lg"
                alt="Alternate Text"
              />
            </Center>
            <VStack space="1" pl="3" my="auto" flex={1}>
              <Text isTruncated fontSize="sm" lineHeight="xs" bold>
                {data.judul_acara}
              </Text>
              <Text color="coolGray.600" fontSize="xs" lineHeight="xs" isTruncated>
                {data.nama}
              </Text>
                <Text color="coolGray.600" fontSize="2xs" lineHeight="xs">
                  {BulanLibFromDate(data.tanggal_batas_registrasi,false)}
                </Text>
              <Text
                color="coolGray.600"
                isTruncated
                fontSize="2xs"
                lineHeight="xs">
                {data.lokasi}
              </Text>
            </VStack>
          </HStack>
        </Box>
      )}
    </Pressable>
  );
};

export default ActivityCard;
