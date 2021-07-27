/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {Formik, Field, Form} from 'formik';
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
  Button,
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
  SelectImageBtnText,
} from '../components/styles';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {deviceService} from '../_services';
import COLORS from './../consts/colors';
import {ADD_DEVICE_TO_CART} from '../redux/DevicesItems';
import {useDispatch, useSelector} from 'react-redux';
import {color} from 'react-native-reanimated';
const width = Dimensions.get('screen').width / 2 - 30;
import {_AddDevice} from '../redux/actions';
import {launchImageLibrary} from 'react-native-image-picker';

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

const AddDeviceScreen = ({navigation}) => {
  const dispatch = useDispatch();

  //Initializing user inputs and hooks
  const [initialValues, setInitialValues] = useState({
    deviceName: '',
    deviceModelNumber: '',
    deviceBrandName: '',
    deviceMemory: '',
    deviceRAM: '',
    deviceSSD: '',
    deviceDisplaySize: '',
    deviceProcessor: '',
    deviceWeight: '',
    deviceOS: '',
    deviceDisplayResolution: '',
    deviceOutOfStock: false,
    deviceCount: '',
    deviceImageURI: '',
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
    formData.append('deviceImageName', ImageResult);
    dispatch(_AddDevice(formData));
    navigation.goBack();
  }
  // End of function

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
            <WelcomeText>Add A</WelcomeText>
            <StoreName>New Device</StoreName>
          </View>
        </AddDeviceStyledHeader>

        <View style={{marginTop: 15}}>
          {image && (
            <Image
              source={{uri: image}}
              style={{
                alignSelf: 'center',
                resizeMode: 'contain',
                flex: 1,
                width: 220,
                height: 220,
              }}
            />
          )}
          <SelectImageBtn onPress={() => pickImage()}>
            <ButtonText>Pick Device Image</ButtonText>
          </SelectImageBtn>
        </View>
        {/* End Of Header Section */}

        {/* Start Of User Input Section */}
        <StyledContainer>
          <InnerContainer>
            <StyledFormArea>
              <Formik
                initialValues={initialValues}
                onSubmit={(values, actions) => {
                  values.deviceImageURI = image;
                  onSubmit(values);
                }}
                validationSchema={DeviceSchema}>
                {({
                  props,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  errors,
                  touched,
                  typeError,
                }) => (
                  <View style={{flex: 1, flexDirection: 'column'}}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                      <MyTextInput
                        name="deviceName"
                        label="Name"
                        placeholder="Device Name Here"
                        placeholderTextColor={COLORS.dimGrey}
                        onChangeText={handleChange('deviceName')}
                        onBlur={handleBlur('deviceName')}
                        value={values.deviceName}
                      />
                      {errors.deviceName && touched.deviceName ? (
                        <Text
                          style={{
                            color: COLORS.lightred,
                            position: 'absolute',
                            left: 90,
                          }}>
                          {errors.deviceName} *
                        </Text>
                      ) : null}
                      <MyTextInput
                        label="Model #"
                        placeholder="Model Number Here"
                        placeholderTextColor={COLORS.dimGrey}
                        onChangeText={handleChange('deviceModelNumber')}
                        onBlur={handleBlur('deviceModelNumber')}
                        value={values.deviceModelNumber}
                      />
                      {errors.deviceModelNumber && touched.deviceModelNumber ? (
                        <Text
                          style={{
                            color: COLORS.lightred,
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
                        placeholderTextColor={COLORS.dimGrey}
                        onChangeText={handleChange('deviceBrandName')}
                        onBlur={handleBlur('deviceBrandName')}
                        value={values.deviceBrandName}
                      />
                      {errors.deviceBrandName && touched.deviceBrandName ? (
                        <Text
                          style={{
                            color: COLORS.lightred,
                            position: 'absolute',
                            left: 90,
                          }}>
                          {errors.deviceBrandName} *
                        </Text>
                      ) : null}
                      <MyTextInput
                        label="Resolution"
                        placeholder="Display Resolution Here"
                        placeholderTextColor={COLORS.dimGrey}
                        onChangeText={handleChange('deviceDisplayResolution')}
                        onBlur={handleBlur('deviceDisplayResolution')}
                        value={values.deviceDisplayResolution}
                      />
                      {errors.deviceDisplayResolution &&
                      touched.deviceDisplayResolution ? (
                        <Text
                          style={{
                            color: COLORS.lightred,
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
                        placeholderTextColor={COLORS.dimGrey}
                        onChangeText={handleChange('deviceMemory')}
                        onBlur={handleBlur('deviceMemory')}
                        value={values.deviceMemory}
                      />
                      {errors.deviceMemory && touched.deviceMemory ? (
                        <Text
                          style={{
                            color: COLORS.lightred,
                            position: 'absolute',
                            left: 90,
                          }}>
                          {errors.deviceMemory} *
                        </Text>
                      ) : null}
                      <MyTextInput
                        label="RAM"
                        placeholder="Display Ram Here"
                        placeholderTextColor={COLORS.dimGrey}
                        onChangeText={handleChange('deviceRAM')}
                        onBlur={handleBlur('deviceRAM')}
                        value={values.deviceRAM}
                      />
                      {errors.deviceRAM && touched.deviceRAM ? (
                        <Text
                          style={{
                            color: COLORS.lightred,
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
                        placeholderTextColor={COLORS.dimGrey}
                        onChangeText={handleChange('deviceSSD')}
                        onBlur={handleBlur('deviceSSD')}
                        value={values.deviceSSD}
                      />
                      {errors.deviceSSD && touched.deviceSSD ? (
                        <Text
                          style={{
                            color: COLORS.lightred,
                            position: 'absolute',
                            left: 90,
                          }}>
                          {errors.deviceSSD} *
                        </Text>
                      ) : null}
                      <MyTextInput
                        label="Processor"
                        placeholder="Display Processor Here"
                        placeholderTextColor={COLORS.dimGrey}
                        onChangeText={handleChange('deviceProcessor')}
                        onBlur={handleBlur('deviceProcessor')}
                        value={values.deviceProcessor}
                      />
                      {errors.deviceProcessor && touched.deviceProcessor ? (
                        <Text
                          style={{
                            color: COLORS.lightred,
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
                        placeholderTextColor={COLORS.dimGrey}
                        onChangeText={handleChange('deviceWeight')}
                        onBlur={handleBlur('deviceWeight')}
                        value={values.deviceWeight}
                      />
                      {errors.deviceWeight && touched.deviceWeight ? (
                        <Text
                          style={{
                            color: COLORS.lightred,
                            position: 'absolute',
                            left: 90,
                          }}>
                          {errors.deviceWeight} *
                        </Text>
                      ) : null}
                      <MyTextInput
                        label="OS"
                        placeholder="Display OS Here"
                        placeholderTextColor={COLORS.dimGrey}
                        onChangeText={handleChange('deviceOS')}
                        onBlur={handleBlur('deviceOS')}
                        value={values.deviceOS}
                      />
                      {errors.deviceOS && touched.deviceOS ? (
                        <Text
                          style={{
                            color: COLORS.lightred,
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
                        placeholderTextColor={COLORS.dimGrey}
                        onChangeText={handleChange('deviceDisplaySize')}
                        onBlur={handleBlur('deviceDisplaySize')}
                        value={values.deviceDisplaySize}
                      />
                      {errors.deviceDisplaySize && touched.deviceDisplaySize ? (
                        <Text
                          style={{
                            color: COLORS.lightred,
                            position: 'absolute',
                            left: 90,
                          }}>
                          {errors.deviceDisplaySize} *
                        </Text>
                      ) : null}
                      <MyTextInput
                        label="Quantity"
                        placeholder="Number Here"
                        placeholderTextColor={COLORS.dimGrey}
                        onChangeText={handleChange('deviceCount')}
                        onBlur={handleBlur('deviceCount')}
                        value={values.deviceCount}
                      />
                      {errors.deviceCount && touched.deviceCount ? (
                        <Text
                          style={{
                            color: COLORS.lightred,
                            position: 'absolute',
                            right: 0,
                          }}>
                          {errors.deviceCount} *
                        </Text>
                      ) : null}
                    </View>

                    <StyledButton onPress={handleSubmit}>
                      <ButtonText>Add To Store</ButtonText>
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

export default AddDeviceScreen;
