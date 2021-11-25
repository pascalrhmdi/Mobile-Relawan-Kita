import React from "react";
import { Center, Spinner } from "native-base";

export const LoadingStateDisplay = () => {
  return (
    <Center flex={1}>
      <Spinner color="rose.500" size="lg" />
    </Center>
  );
};
