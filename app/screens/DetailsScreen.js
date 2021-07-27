/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import COLORS from '../consts/colors';
import {
  SafeAreaViewContainer,
  ModalCenteredView,
  ModalView,
  ModalCancelBtnText,
  DetailsHeaderView,
  EditDeviceBtnView,
  EditDeviceImageContainer,
  EditDeviceNumberOfDevices,
  EditDeviceNumberOfDevicesText,
  EditDeviceDetailsContainer,
  EditDeviceDetailsContainerHeader,
  EditDeviceDetailsContainerHeaderNameAndAction,
  HeaderDeviceName,
  HeaderDeviceBrandName,
  DeviceSpecificationsView,
  DeviceSpecificationsText,
  TwoDeviceSpecificationsView,
  ModalDeleteBtnText,
  DeletemodalText,
  DeleteBtn,
  CancelBtn,
} from '../components/styles';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import {useDispatch} from 'react-redux';
import {_DeleteDevice} from '../redux/actions';

const DetailsScreen = ({navigation, route}) => {
  const device = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();

  function handleDelete(deletedDevice) {
    dispatch(_DeleteDevice(deletedDevice._id));
    navigation.goBack();
  }

  return (
    <SafeAreaViewContainer screen="details">
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <ModalCenteredView>
          <ModalView>
            <SimpleLineIcons
              name="close"
              size={80}
              color={COLORS.lightred}
              style={{margin: 10}}
            />
            <DeletemodalText>
              Are You Sure You Want To Delete This Device ?
            </DeletemodalText>
            <View style={{flexDirection: 'row'}}>
              <CancelBtn onPress={() => setModalVisible(!modalVisible)}>
                <ModalCancelBtnText>Cancel</ModalCancelBtnText>
              </CancelBtn>
              <DeleteBtn onPress={() => handleDelete(device)}>
                <ModalDeleteBtnText>Delete Device</ModalDeleteBtnText>
              </DeleteBtn>
            </View>
          </ModalView>
        </ModalCenteredView>
      </Modal>
      <DetailsHeaderView>
        <Ionicons
          name="arrow-back"
          size={28}
          onPress={() => navigation.goBack()}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate('EditDevice', device)}>
          <EditDeviceBtnView>
            <MaterialIcons name="edit" size={18} color={COLORS.white} />
          </EditDeviceBtnView>
        </TouchableOpacity>
      </DetailsHeaderView>
      <EditDeviceImageContainer>
        <Image
          source={{
            uri:
              // uri should be of form : http://YourMachineIpV4Address:8000/device/getDeviceImage/' +
              // device._id + '?dim=' + device.deviceImageName,
              'http://10.0.0.2:8000/device/getDeviceImage/' +
              device._id +
              '?dim=' +
              device.deviceImageName,
          }}
          style={{resizeMode: 'contain', flex: 1, width: 250, height: 250}}
        />
      </EditDeviceImageContainer>
      {/* Start of  of devices*/}
      <EditDeviceNumberOfDevices>
        <EditDeviceNumberOfDevicesText>
          {device.deviceCount} Available Devices In Stock
        </EditDeviceNumberOfDevicesText>
      </EditDeviceNumberOfDevices>
      {/* End of  of devices*/}
      <EditDeviceDetailsContainer>
        <EditDeviceDetailsContainerHeader>
          <EditDeviceDetailsContainerHeaderNameAndAction>
            <HeaderDeviceName>{device.deviceName}</HeaderDeviceName>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Ionicons
                name="trash-sharp"
                size={25}
                style={{marginRight: 20}}
                color={COLORS.black}
              />
            </TouchableOpacity>
          </EditDeviceDetailsContainerHeaderNameAndAction>
          <HeaderDeviceBrandName>
            {device.deviceBrandName}
          </HeaderDeviceBrandName>
        </EditDeviceDetailsContainerHeader>

        <DeviceSpecificationsView>
          <DeviceSpecificationsText>
            Device Specifications
          </DeviceSpecificationsText>
          <TwoDeviceSpecificationsView>
            {/* displaysize */}
            <View style={{flex: 1, flexDirection: 'row', marginTop: 10}}>
              <SimpleLineIcons
                name="screen-desktop"
                size={30}
                color={COLORS.black}
              />
              <View style={{flex: 1, flexDirection: 'column', marginLeft: 10}}>
                <Text style={{color: COLORS.queenBlue}}>Display size</Text>
                <Text style={{color: COLORS.dark, fontSize: 18}}>
                  {device.deviceDisplaySize}
                </Text>
              </View>
            </View>
            {/* Display resolution */}
            <View style={{flex: 1, flexDirection: 'row', marginTop: 10}}>
              <SimpleLineIcons
                name="screen-desktop"
                size={30}
                color={COLORS.black}
              />
              <View style={{flex: 1, flexDirection: 'column', marginLeft: 10}}>
                <Text style={{color: COLORS.queenBlue}}>
                  Display Resolution
                </Text>
                <Text style={{color: COLORS.dark, fontSize: 17}}>
                  {device.deviceDisplayResolution}
                </Text>
              </View>
            </View>
          </TwoDeviceSpecificationsView>

          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            {/* Processor */}
            <View style={{flex: 1, flexDirection: 'row', marginTop: 10}}>
              <Ionicons
                name="ios-hardware-chip-outline"
                size={30}
                color={COLORS.black}
              />
              <View style={{flex: 1, flexDirection: 'column', marginLeft: 10}}>
                <Text style={{color: COLORS.queenBlue}}>Processor</Text>
                <Text style={{color: COLORS.dark, fontSize: 18}}>
                  {device.deviceProcessor}
                </Text>
              </View>
            </View>
            {/* RAM */}
            <View style={{flex: 1, flexDirection: 'row', marginTop: 10}}>
              <FontAwesome5 name="memory" size={27} color={COLORS.black} />
              <View style={{flex: 1, flexDirection: 'column', marginLeft: 10}}>
                <Text style={{color: COLORS.queenBlue}}>RAM</Text>
                <Text style={{color: COLORS.dark, fontSize: 17}}>
                  {device.deviceRAM}
                </Text>
              </View>
            </View>
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            {/* OS */}
            <View style={{flex: 1, flexDirection: 'row', marginTop: 10}}>
              <MaterialCommunityIcons
                name="web"
                size={30}
                color={COLORS.black}
              />
              <View style={{flex: 1, flexDirection: 'column', marginLeft: 10}}>
                <Text style={{color: COLORS.queenBlue}}>OS</Text>
                <Text style={{color: COLORS.dark, fontSize: 18}}>
                  {device.deviceOS}
                </Text>
              </View>
            </View>
            {/* SSD */}
            <View style={{flex: 1, flexDirection: 'row', marginTop: 10}}>
              <MaterialIcons name="sd-storage" size={27} color={COLORS.black} />
              <View style={{flex: 1, flexDirection: 'column', marginLeft: 10}}>
                <Text style={{color: COLORS.queenBlue}}>SSD</Text>
                <Text style={{color: COLORS.dark, fontSize: 17}}>
                  {device.deviceSSD}
                </Text>
              </View>
            </View>
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            {/* Model Number */}
            <View style={{flex: 1, flexDirection: 'row', marginTop: 10}}>
              <Feather name="hash" size={30} color={COLORS.black} />
              <View style={{flex: 1, flexDirection: 'column', marginLeft: 10}}>
                <Text style={{color: COLORS.queenBlue}}>Model Number</Text>
                <Text style={{color: COLORS.dark, fontSize: 18}}>
                  {device.deviceModelNumber}
                </Text>
              </View>
            </View>
            {/* Mmeory */}
            <View style={{flex: 1, flexDirection: 'row', marginTop: 10}}>
              <MaterialIcons name="memory" size={27} color={COLORS.black} />
              <View style={{flex: 1, flexDirection: 'column', marginLeft: 10}}>
                <Text style={{color: COLORS.queenBlue}}>Memory</Text>
                <Text style={{color: COLORS.dark, fontSize: 17}}>
                  {device.deviceMemory}
                </Text>
              </View>
            </View>
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            {/* Weight */}
            <View style={{flex: 1, flexDirection: 'row', marginTop: 10}}>
              <MaterialCommunityIcons
                name="weight"
                size={30}
                color={COLORS.black}
              />
              <View style={{flex: 1, flexDirection: 'column', marginLeft: 10}}>
                <Text style={{color: COLORS.queenBlue}}>Weight</Text>
                <Text style={{color: COLORS.dark, fontSize: 18}}>
                  {device.deviceWeight}
                </Text>
              </View>
            </View>
          </View>
        </DeviceSpecificationsView>
      </EditDeviceDetailsContainer>
    </SafeAreaViewContainer>
  );
};

export default DetailsScreen;
