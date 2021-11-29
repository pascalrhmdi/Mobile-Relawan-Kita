import { useNavigation } from "@react-navigation/core";
import { ArrowBackIcon, HStack, Pressable, Divider, Box } from "native-base";
import React, { FC } from "react";
import { SearchInput }  from "../Activity";

const TopNavigationSearchBar: FC = (props) => {
  const navigation = useNavigation();

  return (
    <Box background="white">
      <HStack alignItems="center" px="4" py="3">
        <Pressable onPress={() => navigation.goBack()} p="0.5" pr="5">
          <ArrowBackIcon size="6" color="#DF202E" />
        </Pressable>
        <SearchInput {...props} />
      </HStack>
      <Divider/>
    </Box>
  );
};

export default TopNavigationSearchBar;
