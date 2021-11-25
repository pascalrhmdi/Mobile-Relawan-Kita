import { useNavigation } from "@react-navigation/core";
import { ArrowBackIcon, Box, HStack, Pressable, Text } from "native-base";
import React, { FC } from "react";

type Props = {
  name: string
  safeArea?: boolean
}
const WithTopNavigation: FC<Props> = (props) => {
  const navigation = useNavigation();

  if (props.safeArea) return (
    <Box safeArea py="4" px="4" bgColor="rose.50" flex={1}>
      <HStack alignItems="center" mb="4">
        <Pressable  onPress={() => navigation.goBack()} p="0.5" pr="2"> 
          <ArrowBackIcon size="6" />
        </Pressable>
        <Text fontSize="md" bold>{props.name}</Text>
      </HStack>
      {props.children}
    </Box>
  )
  return (
    <HStack alignItems="center" mb="4">
      <Pressable  onPress={() => navigation.goBack()} p="0.5" pr="2"> 
        <ArrowBackIcon size="6" />
      </Pressable>
      <Text fontSize="md" bold>{props.name}</Text>
    </HStack>
  )
}

export default WithTopNavigation;