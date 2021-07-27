/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState, useRef} from 'react';
import {Formik, Field, FastField} from 'formik';
import * as Yup from 'yup';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Image,
  ScrollView,
  Platform,
} from 'react-native';

import {
  StyledHeader,
  WelcomeText,
  StoreName,
  SafeAreaViewContainer,
  StyledFormArea,
  LeftIcon,
  StyledInputLabel,
  StyledTextInput,
  RightIcon,
  ExtraView,
  ExtraText,
  TextLink,
  TextLinkContent,
  StyledButton,
  ButtonText,
  MsgBox,
  Line,
  StyledContainer,
  InnerContainer,
  AddDeviceStyledHeader,
  ImageAreaView,
  SelectImageBtn,
} from '../components/styles';
import {deviceService} from '../_services';
import COLORS from './../consts/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {ADD_DEVICE_TO_CART} from '../redux/DevicesItems';
import {useDispatch, useSelector} from 'react-redux';
import {color} from 'react-native-reanimated';
const width = Dimensions.get('screen').width / 2 - 30;
import {launchImageLibrary} from 'react-native-image-picker';
import {_UpdateDevice} from '../redux/actions';

// Schema to validate user inputs
const DeviceSchema = Yup.object().shape({
  deviceName: Yup.string().required('Required'),
  deviceBrandName: Yup.string().required('Required'),
  deviceModelNumber: Yup.string().required('Required'),
  deviceDisplayResolution: Yup.string().required('Required'),
  deviceCount: Yup.string().required('Required'),
  deviceMemory: Yup.string().required('Required'),
  deviceOS: Yup.string().required('Required'),
  deviceOutOfStock: Yup.string().required('Required'),
  deviceProcessor: Yup.string().required('Required'),
  deviceRAM: Yup.string().required('Required'),
  deviceSSD: Yup.string().required('Required'),
  deviceWeight: Yup.string().required('Required'),
});

const EditDeviceScreen = ({navigation, route}) => {
  const device = route.params;
  const dispatch = useDispatch();

  //Initializing user inputs and hooks
  const [initialValues, setInitialValues] = useState({
    deviceName: device.deviceName,
    deviceModelNumber: device.deviceModelNumber,
    deviceBrandName: device.deviceBrandName,
    deviceMemory: device.deviceMemory,
    deviceRAM: device.deviceRAM,
    deviceSSD: device.deviceSSD,
    deviceDisplaySize: device.deviceDisplaySize,
    deviceProcessor: device.deviceProcessor,
    deviceWeight: device.deviceWeight,
    deviceOS: device.deviceOS,
    deviceDisplayResolution: device.deviceDisplayResolution,
    deviceOutOfStock: device.deviceOutOfStock,
    deviceCount: device.deviceCount,
  });
  const [image, setImage] = useState(null);
  const [ImageResult, setImageResult] = useState(null);
  // End of initialization

  // Function to send data to redux dispatcher to add to store
  // and to database.
  async function onSubmit(values) {
    const formData = new FormData();

    formData.append('deviceName', values.deviceName);
    formData.append('deviceModelNumber', values.deviceModelNumber);
    formData.append('deviceBrandName', values.deviceBrandName);
    formData.append('deviceMemory', values.deviceMemory);
    formData.append('deviceRAM', values.deviceRAM);
    formData.append('deviceSSD', values.deviceSSD);
    formData.append('deviceDisplaySize', values.deviceDisplaySize);
    formData.append('deviceProcessor', values.deviceProcessor);
    formData.append('deviceWeight', values.deviceWeight);
    formData.append('deviceOS', values.deviceOS);
    formData.append('deviceDisplayResolution', values.deviceDisplayResolution);
    formData.append('deviceOutOfStock', values.deviceOutOfStock);
    formData.append('deviceCount', values.deviceCount);
    if (ImageResult != null) {
      formData.append('deviceImageName', ImageResult);
    }

    dispatch(_UpdateDevice(device._id, formData));

    navigation.navigate('Home');
  }

  // Setting the device's values inside the input fields
  const GetDeviceData = async () => {
    setInitialValues(device);
  };

  useEffect(() => {
    GetDeviceData();
  }, []);

  // Image function to be performed when
  // owner selects a device image
  const pickImage = async () => {
    const options = {};
    await launchImageLibrary(options, response => {
      const _responseAssets = response.assets;
      setImage(_responseAssets[0].uri);

      const photo = {
        uri: _responseAssets[0].uri,
        type: 'image/jpeg',
        name: 'photo.jpg',
      };
      setImageResult(photo);
    });
  };

  // End of function

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SafeAreaViewContainer>
        {/* Start Of Header Section */}
        <AddDeviceStyledHeader>
          <Ionicons
            name="arrow-back"
            size={28}
            onPress={() => navigation.goBack()}
          />
          <View>
            <WelcomeText>Edit An</WelcomeText>
            <StoreName>Existing Device</StoreName>
          </View>
        </AddDeviceStyledHeader>
        {/* End Of Header Section */}

        {/* Start Of User Input Section */}
        <StyledContainer>
          <InnerContainer>
            <StyledFormArea>
              <Image
                source={{
                  uri:
                    image == null
                      ? // uri should be of form : http://YourMachineIpV4Address:8000/device/getDeviceImage/' +
                        // device._id + '?dim=' + device.deviceImageName,
                        'http://10.0.0.2:8000/device/getDeviceImage/' +
                        device._id +
                        '?dim=' +
                        device.deviceImageName
                      : image,
                }}
                style={{
                  alignSelf: 'center',
                  resizeMode: 'contain',
                  flex: 1,
                  width: 220,
                  height: 220,
                }}
              />
              <SelectImageBtn onPress={() => pickImage()}>
                <ButtonText>Pick Device Image</ButtonText>
              </SelectImageBtn>

              <Formik
                initialValues={initialValues}
                onSubmit={(values, actions) => {
                  onSubmit(values);
                }}
                validationSchema={DeviceSchema}>
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  errors,
                  touched,
                }) => (
                  <View style={{flex: 1, flexDirection: 'column'}}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                      <MyTextInput
                        name="deviceName"
                        label="Name"
                        placeholder="Device Name Here"
                        placeholderTextColor="#9CA3AF"
                        onChangeText={handleChange('deviceName')}
                        onBlur={handleBlur('deviceName')}
                        value={values.deviceName}
                      />
                      {errors.deviceName && touched.deviceName ? (
                        <Text
                          style={{
                            color: 'red',
                            position: 'absolute',
                            left: 90,
                          }}>
                          {errors.deviceName} *
                        </Text>
                      ) : null}
                      <MyTextInput
                        label="Model #"
                        placeholder="Model Number Here"
                        placeholderTextColor="#9CA3AF"
                        onChangeText={handleChange('deviceModelNumber')}
                        onBlur={handleBlur('deviceModelNumber')}
                        value={values.deviceModelNumber}
                      />
                      {errors.deviceModelNumber && touched.deviceModelNumber ? (
                        <Text
                          style={{
                            color: 'red',
                            position: 'absolute',
                            right: 0,
                          }}>
                          {errors.deviceModelNumber} *
                        </Text>
                      ) : null}
                    </View>

                    <View
                      style={{flex: 1, flexDirection: 'row', marginTop: 10}}>
                      <MyTextInput
                        label="Brand Name"
                        placeholder="Brand Name Here"
                        placeholderTextColor="#9CA3AF"
                        onChangeText={handleChange('deviceBrandName')}
                        onBlur={handleBlur('deviceBrandName')}
                        value={values.deviceBrandName}
                      />
                      {errors.deviceBrandName && touched.deviceBrandName ? (
                        <Text
                          style={{
                            color: 'red',
                            position: 'absolute',
                            left: 90,
                          }}>
                          {errors.deviceBrandName} *
                        </Text>
                      ) : null}
                      <MyTextInput
                        label="Resolution"
                        placeholder="Display Resolution Here"
                        placeholderTextColor="#9CA3AF"
                        onChangeText={handleChange('deviceDisplayResolution')}
                        onBlur={handleBlur('deviceDisplayResolution')}
                        value={values.deviceDisplayResolution}
                      />
                      {errors.deviceDisplayResolution &&
                      touched.deviceDisplayResolution ? (
                        <Text
                          style={{
                            color: 'red',
                            position: 'absolute',
                            right: 0,
                          }}>
                          {errors.deviceDisplayResolution} *
                        </Text>
                      ) : null}
                    </View>

                    <View
                      style={{flex: 1, flexDirection: 'row', marginTop: 10}}>
                      <MyTextInput
                        label="Memory"
                        placeholder="Device Memory Here"
                        placeholderTextColor="#9CA3AF"
                        onChangeText={handleChange('deviceMemory')}
                        onBlur={handleBlur('deviceMemory')}
                        value={values.deviceMemory}
                      />
                      {errors.deviceMemory && touched.deviceMemory ? (
                        <Text
                          style={{
                            color: 'red',
                            position: 'absolute',
                            left: 90,
                          }}>
                          {errors.deviceMemory} *
                        </Text>
                      ) : null}
                      <MyTextInput
                        label="RAM"
                        placeholder="Display Ram Here"
                        placeholderTextColor="#9CA3AF"
                        onChangeText={handleChange('deviceRAM')}
                        onBlur={handleBlur('deviceRAM')}
                        value={values.deviceRAM}
                      />
                      {errors.deviceRAM && touched.deviceRAM ? (
                        <Text
                          style={{
                            color: 'red',
                            position: 'absolute',
                            right: 0,
                          }}>
                          {errors.deviceRAM} *
                        </Text>
                      ) : null}
                    </View>

                    <View
                      style={{flex: 1, flexDirection: 'row', marginTop: 10}}>
                      <MyTextInput
                        label="SSD"
                        placeholder="Device SSD Here"
                        placeholderTextColor="#9CA3AF"
                        onChangeText={handleChange('deviceSSD')}
                        onBlur={handleBlur('deviceSSD')}
                        value={values.deviceSSD}
                      />
                      {errors.deviceSSD && touched.deviceSSD ? (
                        <Text
                          style={{
                            color: 'red',
                            position: 'absolute',
                            left: 90,
                          }}>
                          {errors.deviceSSD} *
                        </Text>
                      ) : null}
                      <MyTextInput
                        label="Processor"
                        placeholder="Display Processor Here"
                        placeholderTextColor="#9CA3AF"
                        onChangeText={handleChange('deviceProcessor')}
                        onBlur={handleBlur('deviceProcessor')}
                        value={values.deviceProcessor}
                      />
                      {errors.deviceProcessor && touched.deviceProcessor ? (
                        <Text
                          style={{
                            color: 'red',
                            position: 'absolute',
                            right: 0,
                          }}>
                          {errors.deviceProcessor} *
                        </Text>
                      ) : null}
                    </View>

                    <View
                      style={{flex: 1, flexDirection: 'row', marginTop: 10}}>
                      <MyTextInput
                        label="Weight"
                        placeholder="Device Weight Here"
                        placeholderTextColor="#9CA3AF"
                        onChangeText={handleChange('deviceWeight')}
                        onBlur={handleBlur('deviceWeight')}
                        value={values.deviceWeight}
                      />
                      {errors.deviceWeight && touched.deviceWeight ? (
                        <Text
                          style={{
                            color: 'red',
                            position: 'absolute',
                            left: 90,
                          }}>
                          {errors.deviceWeight} *
                        </Text>
                      ) : null}
                      <MyTextInput
                        label="OS"
                        placeholder="Display OS Here"
                        placeholderTextColor="#9CA3AF"
                        onChangeText={handleChange('deviceOS')}
                        onBlur={handleBlur('deviceOS')}
                        value={values.deviceOS}
                      />
                      {errors.deviceOS && touched.deviceOS ? (
                        <Text
                          style={{
                            color: 'red',
                            position: 'absolute',
                            right: 0,
                          }}>
                          {errors.deviceOS} *
                        </Text>
                      ) : null}
                    </View>

                    <View
                      style={{flex: 1, flexDirection: 'row', marginTop: 10}}>
                      <MyTextInput
                        label="Display Size"
                        placeholder="Display Size Here"
                        placeholderTextColor="#9CA3AF"
                        onChangeText={handleChange('deviceDisplaySize')}
                        onBlur={handleBlur('deviceDisplaySize')}
                        value={values.deviceDisplaySize}
                      />
                      {errors.deviceDisplaySize && touched.deviceDisplaySize ? (
                        <Text
                          style={{
                            color: 'red',
                            position: 'absolute',
                            left: 90,
                          }}>
                          {errors.deviceDisplaySize} *
                        </Text>
                      ) : null}
                      <MyTextInput
                        label="Quantity"
                        placeholder="Number Here"
                        placeholderTextColor="#9CA3AF"
                        onChangeText={handleChange('deviceCount')}
                        onBlur={handleBlur('deviceCount')}
                        value={values.deviceCount}
                      />
                      {errors.deviceCount && touched.deviceCount ? (
                        <Text
                          style={{
                            color: 'red',
                            position: 'absolute',
                            right: 0,
                          }}>
                          {errors.deviceCount} *
                        </Text>
                      ) : null}
                    </View>

                    <StyledButton onPress={handleSubmit}>
                      <ButtonText>Update Item</ButtonText>
                    </StyledButton>
                  </View>
                )}
              </Formik>
            </StyledFormArea>
          </InnerContainer>
        </StyledContainer>
        {/* End Of User Input Section */}
      </SafeAreaViewContainer>
    </ScrollView>
  );
};
// Creatign a textinput to be used in formik.
const MyTextInput = ({label, ...props}) => {
  return (
    <View>
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledTextInput {...props} />
    </View>
  );
};

export default EditDeviceScreen;
