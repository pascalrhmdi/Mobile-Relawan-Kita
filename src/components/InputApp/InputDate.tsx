import { MaterialIcons } from '@expo/vector-icons'
import RNDateTimePicker from '@react-native-community/datetimepicker'
import { FormControl, Icon, Input } from 'native-base'
import React, { FC } from 'react'
import { BulanLibFromDate } from '../../constants/bulanLib.const'

interface InputDateInterface {
  label: string,
  inputValue: string,
  onChangeText: (value: string) => void,
  onPress: () => void,
  helperText: string,
  showDate: boolean,
  handleDateOnChange: (event, selectedDate: Date|undefined) => void
}

const InputDateApp:FC<InputDateInterface> =  (props) => {
 return (
   <>
    <FormControl isRequired>
      <FormControl.Label>
        {props.label}
      </FormControl.Label>
      <Input 
        showSoftInputOnFocus={false}
        value={`${BulanLibFromDate(
          props.inputValue,
          false
        )}`} 
        onPressIn={props.onPress}
        onChangeText={props.onChangeText}
        InputRightElement={
          <Icon
            as={<MaterialIcons name="today" />}
            onPress={props.onPress}
            size={6}
            mr="2"
          />  
        }/>
      <FormControl.HelperText alignSelf="flex-end">
        {props.helperText}
      </FormControl.HelperText>
    </FormControl>
    {props.showDate && 
      <RNDateTimePicker
        testID="dateTimePicker"
        value={new Date(props.inputValue)}
        // Maximun adalah Hari ini new Date()
        maximumDate={new Date()}
        minimumDate={new Date(1930, 0, 1)}
        onChange={props.handleDateOnChange}
      />
    }
  </>
 )
}

export default InputDateApp
