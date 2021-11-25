import React from "react";
import { Center, Text } from "native-base";

type Props = {
  errorMsg: string | boolean;
  additionalMsg: string;
};

export const ErrorMessage = ({ errorMsg, additionalMsg }: Props) => {
  return (
    <Center flex={1}>
      <Text fontSize="xs">{errorMsg}</Text>
      <Text fontSize="xs">{additionalMsg}</Text>
    </Center>
  );
};
