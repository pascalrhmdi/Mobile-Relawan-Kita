import React, { useState } from "react";
import { Input, Icon, Pressable } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";

const SearchBar = () => {
  let navigation = useNavigation();
  let [inputValue, setInputValue] = useState("");

  const handleSubmit = () => {
    navigation.navigate("SearchScreen", { key: inputValue });

    setInputValue("");
  };

  return (
    <Input
      placeholder="Cari Aktivitas"
      bg="#FFD4D4"
      width="100%"
      borderRadius="10"
      value={inputValue}
      py="3"
      px="1"
      fontSize="14"
      color="#E07575"
      placeholderTextColor="#E07575"
      borderWidth="0"
      onChangeText={(value) => setInputValue(value)}
      onSubmitEditing={handleSubmit}
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
        <Pressable onPress={() => setInputValue("")} pr={2}>
          <Icon
            m="2"
            mr="3"
            size="6"
            color="#E07575"
            as={
              <MaterialIcons
                name={inputValue.trim() == "" ? "filter-list-alt" : "cancel"}
              />
            }
          />
        </Pressable>
      }
    />
  );
};

export default SearchBar;
