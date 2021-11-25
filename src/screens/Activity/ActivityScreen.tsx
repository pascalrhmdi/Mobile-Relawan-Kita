import React, { useState } from "react";
import { useFetchGet } from "../../Hooks";
import { activityMainUrl } from "../../apis";
import { ActivityCard } from "../../components";
import { FlatList, Box } from "native-base";
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
        <ErrorMessage
          errorMsg={activityData.error}
          additionalMsg="Swipe kebawah untuk refresh"
        />
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
