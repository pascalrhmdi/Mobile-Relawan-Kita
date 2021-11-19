import React, { FC, useState, useEffect } from "react";
import { RefreshControl } from "react-native";
import {
  ScrollView,
  Box,
  Heading,
  VStack,
  Icon,
  Circle,
  Text,
  Pressable,
} from "native-base";
import { activityMainUrl, allActivityCategoryUrl } from "../apis";
import { ActivityCard, CategoryBox, SearchBar } from "../components";
import { MaterialIcons } from "@expo/vector-icons";
import { useFetchGet } from "../Hooks";
import { UserDataInterface } from ".";
import { CategoryDataInterface, ActivityDataInterface } from "../components";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen: FC = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  let categoryData = useFetchGet(allActivityCategoryUrl, refreshing);
  let activityData = useFetchGet(
    `${activityMainUrl}?start=0&amount=6`,
    refreshing
  );
  let [userData,setUserData] = useState({id_pengguna:"",nama:"Relawan"} as UserDataInterface);

  useEffect(()=>{
    (async () => {
      try {
        const value = await AsyncStorage.getItem("user_data");
        setUserData(value !== null ? JSON.parse(value) : null);
      } catch (e) {
        console.log(e);
      }
    })();
  },[]);

  let loadCondition = {
    isLoading: categoryData.isLoading || activityData.isLoading,
    error: categoryData.error || activityData.error,
  };

  const doRefresh = () => {
    setRefreshing((prevState) => !prevState);

    if (!categoryData.isLoading && !activityData.isLoading) {
      setRefreshing((prevState) => !prevState);
    }
  };

  let CategoryContainer = () => {
    return (
      <Box flexDir="row" flexWrap="wrap" mb="2">
        {categoryData?.items?.slice(0, 7).map((item:CategoryDataInterface, index:number) => (
          <CategoryBox data={item} navigation={navigation} key={index + 1} />
        ))}

        <Pressable flexBasis="25%" alignItems="center" mb="3">
          <Circle size={50} bg="#FFD4D4" mb="1.5">
            <Icon
              as={<MaterialIcons name="format-list-bulleted" />}
              color="#E07575"
              size={8}
            />
          </Circle>
          <Text fontSize="2xs" lineHeight="xs" textAlign="center">
            Lihat Semua
          </Text>
        </Pressable>
      </Box>
    );
  };

  const renderElement = () => {
    if (loadCondition.isLoading) {
      return <Box>loading</Box>;
    } else if (loadCondition.error) {
      return <Box>{loadCondition.error}</Box>;
    } else {
      return (
        <>
          <Pressable mb="4" onPress={() => console.log("search bar clicked")}>
            <SearchBar />
          </Pressable>

          <CategoryContainer />

          <Heading size="sm" color="red.600" mb="2">
            Aktivitas Terbaru
          </Heading>
          <VStack>
            {activityData?.items?.map((item:ActivityDataInterface, index:number) => (
              <ActivityCard data={item} key={index} navigation={navigation} />
            ))}
          </VStack>
        </>
      );
    }
  };

  console.log('render');

  return (
    <Box safeArea flex={1} bgColor="light.50">
      <ScrollView
        px="3"
        flex={1}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={doRefresh} />
        }>
        <Box _text={{ color: "red" }} mb="3" mt="3" width="65%">
          <Heading isTruncated size="lg" color="red.600" mb="0px" style={{ textTransform:"capitalize" }}>
            Halo, {(userData.nama)}!
          </Heading>
          Selamat Datang..
        </Box>

        {renderElement()}
      </ScrollView>
    </Box>
  );
};

export { HomeScreen };
