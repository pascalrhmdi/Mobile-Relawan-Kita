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
  Divider,
} from "native-base";
import { ActivityHistoryDataInterface } from ".";

type props = {
  data: ActivityHistoryDataInterface;
  navigation: any;
};

const ActivityHistoryCard = ({ data, navigation }: props) => {
  return (
    <Pressable
      unstable_pressDelay={75}
      onPress={() =>
        navigation.navigate("DetailActivityScreen", { eventId: data.id_acara })
      }>
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
              <Text
                color="coolGray.600"
                fontSize="2xs"
                lineHeight="xs"
                isTruncated>
                {data.nama_org}
              </Text>
              <Text
                color="coolGray.600"
                isTruncated
                fontSize="2xs"
                lineHeight="xs">
                {data.lokasi}
              </Text>
              <Divider my="1" />
              <HStack space="1">
                <Text fontSize="2xs" lineHeight="xs" bold>
                  Status :
                </Text>
                <Text
                  color={
                    data.status == "lolos"
                      ? "green.500"
                      : data.status == "menunggu"
                      ? "yellow.500"
                      : "red.500"
                  }
                  fontSize="2xs"
                  lineHeight="xs"
                  bold
                  textTransform="capitalize">
                  {data.status}
                </Text>
              </HStack>
            </VStack>
          </HStack>
        </Box>
      )}
    </Pressable>
  );
};

export default ActivityHistoryCard;
