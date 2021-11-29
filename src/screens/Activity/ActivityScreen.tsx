import React, { useState } from "react";
import { RefreshControl } from "react-native";
import { useFetchGet } from "../../Hooks";
import { activityMainUrl } from "../../apis";
import { ActivityCard } from "../../components";
import { FlatList, Box, ScrollView } from "native-base";
import { ErrorMessage, LoadingStateDisplay } from "../../components/General";

export const ActivityScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const activityData = useFetchGet(
    `${activityMainUrl}?start=0&amount=100`,
    refreshing
  );

  return (
    <Box flex={1} bgColor="light.50">
      {activityData.isLoading && <LoadingStateDisplay />}
      {!activityData.isLoading && activityData.error && (
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
          <ErrorMessage
            errorMsg={activityData.error}
            additionalMsg="Swipe kebawah untuk refresh"
          />
        </ScrollView>
      )}
      {!activityData.isLoading && !activityData.error && (
        <FlatList
          style={{ padding: 10 }}
          data={activityData.data}
          keyExtractor={(item, index) => index}
          showsVerticalScrollIndicator={false}
          refreshing={refreshing}
          onRefresh={() => {
            setRefreshing((prevState) => !prevState);

            setTimeout(() => {
              if (!activityData.isLoading) {
                setRefreshing((prevState) => !prevState);
              }
            }, 1000);
          }}
          renderItem={({ item, index }) => (
            <ActivityCard data={item} key={index} navigation={navigation} />
          )}
        />
      )}
    </Box>
  );
};
