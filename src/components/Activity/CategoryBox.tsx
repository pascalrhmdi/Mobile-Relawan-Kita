import React from "react";
import { Icon, Circle, Text, Pressable } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import {CategoryDataInterface} from ".";

type props = {
  data: CategoryDataInterface;
  navigation: any;
};

const CategoryBox = ({ data, navigation }: props) => {
  return (
    <Pressable
      unstable_pressDelay={75}
      flexBasis="25%"
      alignItems="center"
      mb="3"
      onPress={() => navigation.navigate("SearchScreen",{key:`kategori:${data.nama_jenis_acara}`})}>
      {({ isPressed }) => (
        <>
          <Circle size={50} bgColor={isPressed?"#f5bcbc":"#FFD4D4"} mb="1.5">
            <Icon
              as={<MaterialIcons name={data.icon} />}
              color="#E07575"
              size={8}
            />
          </Circle>
          <Text fontSize="2xs" lineHeight="xs" textAlign="center">
            {data.nama_jenis_acara}
          </Text>
        </>
      )}
    </Pressable>
  );
};

export default CategoryBox;
