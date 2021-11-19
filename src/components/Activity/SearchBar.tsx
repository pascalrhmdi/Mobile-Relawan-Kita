import React from "react";
import { Input, Icon } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

const SearchBar = () => {
  return (
    <Input
      placeholder="Cari Aktivitas"
      bg="#FFD4D4"
      width="100%"
      borderRadius="10"
      py="3"
      px="1"
      fontSize="14"
      color="#E07575"
      placeholderTextColor="#E07575"
      borderWidth="0"
      InputLeftElement={
        <Icon
          m="2"
          ml="3"
          size="6"
          color="#E07575"
          as={<MaterialIcons name="search" />}
        />
      }
      InputRightElement={
        <Icon
          m="2"
          mr="3"
          size="6"
          color="#E07575"
          as={<MaterialIcons name="filter-list-alt" />}
        />
      }
    />
  );
};

export default SearchBar;
