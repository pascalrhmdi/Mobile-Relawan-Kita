import { useNavigation } from "@react-navigation/core";
import { ArrowBackIcon, Box, HStack, Pressable, Text } from "native-base";
import { IColors } from "native-base/lib/typescript/theme/base/colors";
import React, { FC } from "react";

type Props = {
  name: string
  bgColor: IColors
}
const WithTopNavigation: FC<Props> = (props) => {
  const navigation = useNavigation();
  
  return (
    <Box safeArea py="4" px="4" bgColor={props.bgColor}>
      <HStack alignItems="center" mb="4">
        <Pressable  onPress={() => navigation.goBack()} p="0.5" pr="2"> 
          <ArrowBackIcon size="6" />
        </Pressable>
        <Text fontSize="sm" bold color="muted.600">{props.name}</Text>
      </HStack>
      {props.children}
    </Box>
  )
 
}

export default WithTopNavigation;