import React from "react";
import { ScrollView, Box, Divider } from "native-base";
import { useFetchGet } from "../../Hooks";
import { allActivityCategoryUrl } from "../../apis";
import { CategoryBox } from "../../components";
import { CategoryDataInterface } from "../../components";
import { WithTopNavigation } from "../../components/NavigationApp";
import { ErrorMessage, LoadingStateDisplay } from "../../components/General";

export const CategoryScreen = ({ navigation }) => {
  let categoryData = useFetchGet(`${allActivityCategoryUrl}`, false);

  return (
    <Box safeArea bgColor="light.50" flex={1}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Box px="4" pt="3" bgColor="white">
          <WithTopNavigation name="Kategori Aktivitas" />
        </Box>
        <Divider />

        {categoryData.isLoading && <LoadingStateDisplay />}
        {!categoryData.isLoading && categoryData.error && (
          <ErrorMessage errorMsg={categoryData.error} additionalMsg="Silahkan coba lagi nanti" />
        )}
        {!categoryData.isLoading && !categoryData.error && (
          <Box flexDir="row" flexWrap="wrap" my="4" mx="3">
            {categoryData?.data?.map(
              (item: CategoryDataInterface, index: number) => (
                <CategoryBox
                  data={item}
                  navigation={navigation}
                  key={index + 1}
                />
              )
            )}
          </Box>
        )}
      </ScrollView>
    </Box>
  );
};
