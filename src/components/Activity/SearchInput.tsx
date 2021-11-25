import React from "react";
import { Input, Pressable } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

const SearchInput = (props) => {
  const {inputValue, setInputValue, handleSubmit, resetSearch} = props;

  return (
    <Input
      value={inputValue}
      flex={1}
      bg="#FFD4D4"
      fontSize="14"
      color="#E07575"
      placeholderTextColor="#E07575"
      borderWidth="0"
      placeholder="Cari Aktivitas..."
      onChangeText={(value) => setInputValue(value)}
      InputRightElement={
        <Pressable onPress={resetSearch} pr={2}>
          {inputValue.trim() != "" && (
            <MaterialIcons name="cancel" size={24} color="#E07575" />
          )}
        </Pressable>
      }
      onSubmitEditing={handleSubmit}
    />
  );
};

export default SearchInput;
