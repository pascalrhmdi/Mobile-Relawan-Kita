import React, { useContext, useState } from "react";
import { ScrollView, Box, Divider } from "native-base";
import { useFetchGet } from "../../Hooks";
import { AuthContext } from "../../contexts/AuthContext";
import { volunteerHistoryUrl } from "../../apis";
import { WithTopNavigation } from "../../components/NavigationApp";
import { ErrorMessage, LoadingStateDisplay } from "../../components/General";

const VolunteerHistory = ({ navigation }) => {
  const { state } = useContext(AuthContext);
  const [refreshing, setRefreshing] = useState(false);
  let volunteerHistory = useFetchGet(`${volunteerHistoryUrl}/${state.id_pengguna}?start=0&amount=100`, refreshing);

  console.log(volunteerHistory);

  return (
    <Box safeArea bgColor="light.50" flex={1}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Box px="4" pt="3" bgColor="white">
          <WithTopNavigation name="Riwayat Pendaftaran Relawan" />
        </Box>
        <Divider />

        {volunteerHistory.isLoading && <LoadingStateDisplay />}
        {!volunteerHistory.isLoading && volunteerHistory.error && (
          <ErrorMessage
            errorMsg={volunteerHistory.error}
            additionalMsg="Swipe kebawah untuk refresh"
          />
        )}
        {!volunteerHistory.isLoading && !volunteerHistory.error && (
          <Box>riwayat pendaftaran</Box>
        )}
      </ScrollView>
    </Box>
  );
};

export default VolunteerHistory;
