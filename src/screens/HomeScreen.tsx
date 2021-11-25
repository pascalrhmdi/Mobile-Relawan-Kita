import React, { FC, useState, useContext } from "react";
import { RefreshControl } from "react-native";
import { AuthContext } from "../contexts/AuthContext";
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
import { CategoryDataInterface, ActivityDataInterface } from "../components";
import { ErrorMessage, LoadingStateDisplay } from "../components/General";

const HomeScreen: FC = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  let categoryData = useFetchGet(allActivityCategoryUrl, refreshing);
  let activityData = useFetchGet(
    `${activityMainUrl}?start=0&amount=5`,
    refreshing
  );

  const { state } = useContext(AuthContext);

  let loadCondition = {
    isLoading: categoryData.isLoading || activityData.isLoading,
    error: categoryData.error || activityData.error,
  };

  let CategoryContainer = () => {
    return (
      <Box flexDir="row" flexWrap="wrap" mb="2">
        {categoryData?.data
          ?.slice(0, 7)
          .map((item: CategoryDataInterface, index: number) => (
            <CategoryBox data={item} navigation={navigation} key={index + 1} />
          ))}

        <Pressable
          flexBasis="25%"
          alignItems="center"
          mb="3"
          onPress={() => navigation.navigate("CategoryScreen")}>
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

  const proceedUserName = (name: string) => {
    let splitString = name.split(" ")[0];
    return splitString.length < 9 ? splitString : name.slice(0, 9);
  };

  return (
    <Box safeArea flex={1} bgColor="light.50">
      <ScrollView
        px="3"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing((prevState) => !prevState);

              setTimeout(() => {
                if (!activityData.isLoading) {
                  setRefreshing((prevState) => !prevState);
                }
              }, 1000);
            }}
          />
        }>
        <Box _text={{ color: "red" }} mb="3" mt="3" width="65%">
          <Heading
            isTruncated
            size="lg"
            color="red.600"
            mb="0px"
            style={{ textTransform: "capitalize" }}>
            Hallo, {proceedUserName(state.nama)}!
          </Heading>
          <Text>Selamat Datang {":)"}</Text>
        </Box>

        {loadCondition.isLoading && <LoadingStateDisplay />}
        {!loadCondition.isLoading && loadCondition.error && (
          <ErrorMessage
            errorMsg="Terjadi kesalahan!"
            additionalMsg="Swipe kebawah untuk refresh"
          />
        )}
        {!loadCondition.isLoading && !loadCondition.error && (
          <>
            <Box mb="4">
              <SearchBar />
            </Box>

            <CategoryContainer />

            <Heading size="sm" color="red.600" mb="2">
              Aktivitas Terbaru
            </Heading>
            <VStack>
              {activityData?.data?.map(
                (item: ActivityDataInterface, index: number) => (
                  <ActivityCard
                    data={item}
                    key={index}
                    navigation={navigation}
                  />
                )
              )}
            </VStack>
          </>
        )}
      </ScrollView>
    </Box>
  );
};

export { HomeScreen };
