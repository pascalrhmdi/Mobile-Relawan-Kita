import React, { useState, useEffect } from "react";
import { Box, FlatList, Text } from "native-base";
import { searchActivityUrl } from "../../apis";
import { ActivityCard } from "../../components";
import { TopNavigationSearchBar } from "../../components/NavigationApp";
import axios from "axios";
import { ApiResponse } from "../../Hooks";
import { ErrorMessage, LoadingStateDisplay } from "../../components/General";

const initialState: ApiResponse = {
  data: [],
  isLoading: false,
  error: false,
};

export const SearchScreen = ({ navigation, route }) => {
  let [inputValue, setInputValue] = useState("");
  let [keyword, setKeyword] = useState("");
  let [activityData, setActivityData] = useState(initialState);

  const resetSearch = () => {
    setInputValue("");
    setKeyword("");
    setActivityData(initialState);
  };

  const fetchData = (searchKeyword: string) => {
    setKeyword(searchKeyword);
    setActivityData({ ...activityData, isLoading: true });
    let stringUrlEncode = searchKeyword.replace(/\s/g, "+");

    axios
      .get(`${searchActivityUrl}/${stringUrlEncode}?start=0&amount=100`)
      .then((response) => {
        setActivityData({
          data: response.data.data,
          isLoading: false,
          error: false,
        });
      })
      .catch((err) => {
        setActivityData({ data: [], isLoading: false, error: err.message });
      });
  };

  const handleSubmit = () => {
    if (inputValue.trim() != "") {
      fetchData(inputValue);
    }
  };

  // untuk handle search dari widget searchbar screen home
  useEffect(() => {
    if (typeof route.params?.key != "undefined") {
      setInputValue(route.params.key);
      fetchData(route.params.key);
    }
  }, []);

  const renderElement = () => {
    if (activityData.isLoading) {
      return <LoadingStateDisplay />;
    } else if (activityData.error != false) {
      return <ErrorMessage errorMsg={activityData.error} additionalMsg="Silahkan coba lagi nanti" />;
    } else if (
      activityData.error == false &&
      activityData.data.length == 0 &&
      keyword != ""
    ) {
      return <ErrorMessage errorMsg="Aktivitas yang kamu cari tidak ditemukan :(" additionalMsg="" />;
    } else {
      return (
        <FlatList
          style={{ padding: 10 }}
          data={activityData.data}
          keyExtractor={(item, index) => index}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <ActivityCard data={item} key={index} navigation={navigation} />
          )}
        />
      );
    }
  };

  return (
    <Box safeArea flex={1} bgColor="light.50">
      <TopNavigationSearchBar
        inputValue={inputValue}
        setInputValue={setInputValue}
        setActivityData={setActivityData}
        handleSubmit={handleSubmit}
        resetSearch={resetSearch}
      />
      {renderElement()}
    </Box>
  );
};
