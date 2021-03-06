import { MaterialIcons } from '@expo/vector-icons'
import { Avatar, Box, ChevronRightIcon, Divider, FlatList, HStack, Icon, Pressable, Switch, Text, useToast, VStack } from 'native-base'
import React, { useContext } from 'react'
import { TouchableOpacity } from 'react-native'
import { BulanLibFromDate } from '../../constants/bulanLib.const'
import { AuthContext } from '../../contexts/AuthContext'
import AsyncStorage from "@react-native-async-storage/async-storage"

interface ListInterface {
  iconName: string,
  text: string,
  desc?: string,
  isChevron?: true,
  isSwitch?: true
  navigate?: string
}

interface ListComponentInterface extends ListInterface {
  onPress: (() => void) | null
}

const list: ListInterface[] = [
  {
    iconName: "lock-outline",
    text: "Ubah Kata Sandi",
    isChevron: true,
    navigate: 'UbahKataSandi'
  },
  {
    iconName: "notifications-none",
    text: "Notifikasi",
    isSwitch: true,
  },
  {
    iconName: "info-outline",
    text: "Tentang Relawan Kita",
    navigate: "Tentang",
    isChevron: true
  },
]

const ListComponent = ({text, onPress, iconName, desc, isChevron, isSwitch}: ListComponentInterface) => {
  return (
  <TouchableOpacity activeOpacity={0.5}  onPress={onPress} style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, paddingLeft: 20}} >
    <HStack alignItems="center">
      <Icon as={MaterialIcons} color="light.700"  name={iconName}  size={30} />
      <Text bold ml="2">{text}</Text>
      {desc && <Text>{desc}</Text> }
    </HStack>
    {isChevron && <ChevronRightIcon size={30} color="light.600" />}
    {isSwitch && 
      <Switch
        size="md"
        boxSize="8"
        defaultIsChecked
        offTrackColor="blue.100"
        onTrackColor="blue.200"
        onThumbColor="blue.500"
        offThumbColor="blue.50"
        // offTrackColor="orange.100"
        // onTrackColor="orange.200"
        // onThumbColor="orange.500"
        // offThumbColor="orange.50"
      />}
  </TouchableOpacity>
)}


const ProfileScreen = ({navigation}) => {
  const {state, dispatch} = useContext(AuthContext)
  const toast = useToast()

  function logoutHandle() {
    AsyncStorage.removeItem('id_pengguna');
    dispatch({type: 'set_logged_out'})
    toast.show({
      title: "Sukses keluar",
      status: "success",
    })
  }

  return (
    <Box flex={1} safeArea pt="4" bgColor="light.50">
      <HStack mx="5"  alignItems="center" justifyContent="space-between">
        <HStack alignItems="center" flex={1}>
          <Avatar
            alignSelf="center"
            bg="red.200"
            size="lg"
            mr="2"
          >
           {state.nama.split("")[0]}
          </Avatar>
          <VStack flex={1}>
            <Text bold isTruncated width="100%" pr="2">{state.nama}</Text>
            <Text>{state.nomor_telepon}</Text>
            <Text>{BulanLibFromDate(state.tanggal_lahir, false)}</Text>
          </VStack>
        </HStack>
        <Pressable borderRadius="md" shadow={0} bgColor="red.50" onPress={() => navigation.navigate('EditProfile')} alignItems="center" justifyContent="center" p="2">
          <MaterialIcons name="edit" size={24}/>
        </Pressable>
      </HStack>
      <Box mx="5">
        <Text bold mt="4">Info Akun</Text>
        <HStack my="3">
          <Pressable onPress={() => navigation.navigate('VolunteerHistory')} bgColor="red.50" shadow={2} justifyContent="center" alignItems="center" p="2" px="3" borderRadius="md">
            <MaterialIcons name="people" size={35}/>
            <Text color="light.600" fontSize="2xs" lineHeight="xs" textAlign="center" bold>Riwayat{"\n"}Aktivitas</Text>
          </Pressable>
        </HStack>
      </Box>
      <Box bgColor="red.100" mt="2">
        <Text bold my="3" pl="5">Pengaturan Akun</Text>
        <Box bgColor="red.50" >
        <FlatList
        data={list}
        renderItem={({ item }: {item: ListInterface}) => (
            <>
              <ListComponent text={item.text} onPress={item.navigate ? () => navigation.navigate(item.navigate) : null} iconName={item.iconName} isChevron={item.isChevron} isSwitch={item.isSwitch} />
              <Divider />
            </>
        )}
        keyExtractor={ (item, index) => index.toString()}
      />
          {/* Logout */}
          <ListComponent text="Keluar Akun" onPress={logoutHandle} iconName={"logout"} isChevron/>
          <Divider />
        </Box>
      </Box>
    </Box>
  )
}

export default ProfileScreen