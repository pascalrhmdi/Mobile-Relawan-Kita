import React, { useContext, useState } from "react";
import { RefreshControl } from "react-native";
import { ScrollView, Box, Divider, FlatList } from "native-base";
import { useFetchGet } from "../../Hooks";
import { AuthContext } from "../../contexts/AuthContext";
import { volunteerHistoryUrl } from "../../apis";
import { WithTopNavigation } from "../../components/NavigationApp";
import { ErrorMessage, LoadingStateDisplay } from "../../components/General";
import { ActivityHistoryCard } from "../../components";

const VolunteerHistory = ({ navigation }) => {
  const { state } = useContext(AuthContext);
  const [refreshing, setRefreshing] = useState(false);
  let volunteerHistory = useFetchGet(
    `${volunteerHistoryUrl}/${state.id_pengguna}?start=0&amount=100`,
    refreshing
  );

  return (
    <Box safeArea bgColor="light.50" flex={1}>
      <Box px="4" pt="3" bgColor="white">
        <WithTopNavigation name="Riwayat Aktivitas" />
      </Box>
      <Divider />

      {volunteerHistory.isLoading && <LoadingStateDisplay />}
      {!volunteerHistory.isLoading && volunteerHistory.error && (
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
                  if (!volunteerHistory.isLoading) {
                    setRefreshing((prevState) => !prevState);
                  }
                }, 1000);
              }}
            />
          }>
          <ErrorMessage
            errorMsg={volunteerHistory.error}
            additionalMsg="Swipe kebawah untuk refresh"
          />
        </ScrollView>
      )}
      {!volunteerHistory.isLoading && !volunteerHistory.error && (
        <FlatList
          style={{ padding: 10 }}
          data={volunteerHistory.data}
          keyExtractor={(item, index) => index}
          showsVerticalScrollIndicator={false}
          refreshing={refreshing}
          onRefresh={() => {
            setRefreshing((prevState) => !prevState);

            setTimeout(() => {
              if (!volunteerHistory.isLoading) {
                setRefreshing((prevState) => !prevState);
              }
            }, 1000);
          }}
          renderItem={({ item, index }) => (
            <ActivityHistoryCard
              data={item}
              key={index}
              navigation={navigation}
            />
          )}
        />
      )}
    </Box>
  );
};

export default VolunteerHistory;
