import AsyncStorage from "@react-native-async-storage/async-storage"
import { ToastAndroid } from "react-native"

export const storeStorageData = async (key: string, value: string | object) => {
  try {
    if (typeof value === 'object') {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(key, jsonValue)
    } else {
      await AsyncStorage.setItem(key, value)
    }
  } catch (e) {
    ToastAndroid.show(`Failed to store Data ${key}` , ToastAndroid.SHORT);
  }
}