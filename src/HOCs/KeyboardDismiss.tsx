import React, { FC } from 'react';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';

const DismissKeyboard: FC = ({children}) =>{
  return(
  <TouchableWithoutFeedback style={{flex: 1}} onPress={Keyboard.dismiss} accessible={false}>
      {children}
  </TouchableWithoutFeedback>
);
}

export default DismissKeyboard