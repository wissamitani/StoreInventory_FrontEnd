/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Image,
  ActivityIndicator,
  Modal,
  Pressable,
} from 'react-native';

import {
  StyledHeader,
  WelcomeText,
  StoreName,
  TopRightIconsView,
  SearchAndSortView,
  SearchContainerView,
  SortBtnView,
  CategoryContainerView,
  CardContainerView,
  DeviceNameText,
  PriceAndCartIconView,
  PriceText,
  AddToCartIconView,
  ModalCenteredView,
  SafeAreaViewContainer,
  LoadingModalView,
  LoadingmodalText,
  SearchTextInput,
} from '../components/styles';

import COLORS from './../consts/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {deviceService} from '../_services';
import {useDispatch, useSelector} from 'react-redux';
const width = Dimensions.get('screen').width / 2 - 30;
import {_GetDevices} from '../redux/actions';
import {Formik} from 'formik';
import {size} from 'lodash';

const HomeScreen = ({navigation}) => {
  // Start of initializing the hooks
  const categories = ['LATEST DEVICES'];
  const [categoryIndex, setcategoryIndex] = React.useState(0);
  const [laoding, setLoading] = useState();
  const [searchtext, setSearchText] = useState('');
  const [filtered_Devices, setFiltered_Devices] = useState([]);
  const [searchtextLength, setSearchTextLength] = useState(0);
  const [resultCount, setResultCount] = useState(2);
  const [modalVisible, setModalVisible] = useState(false);
  // End of initializing the hooks

  // Start of Redux
  const dispatch = useDispatch();
  const {_devices} = useSelector(state => state.deviceReducer);
  // End of Redux

  // Start of Searching Part
  function handleSearch(from) {
    if (from === 'clear') {
      setFiltered_Devices([]);
      setSearchText('');
      setSearchTextLength(0);
    } else {
      if (searchtext.toString().trim() === '') {
        setFiltered_Devices([]);
      } else {
        setLoading(true);
        setSearchTextLength(searchtext.toString().trim());
        const _devicesArray = _devices;
        const _filteredArray = _devicesArray.filter(item =>
          item.deviceBrandName.includes(searchtext.toString().trim()),
        );
        if (_filteredArray.length > 0) {
          setFiltered_Devices(_filteredArray);
        } else {
          setFiltered_Devices([]);
        }
      }
      setLoading(false);
    }
  }
  function clearSearch() {
    handleSearch('clear');
  }
  // End of Searching Part

  // Start of read the store of redux
  function _getDevices(results) {
    dispatch(_GetDevices(results));
  }
  // End of read the store of redux

  // Start of function to load more data when user clicks on load more
  function _LoadMoreDevices() {
    setModalVisible(true);
    dispatch(_GetDevices(resultCount + 2));
    setModalVisible(false);
    setResultCount(resultCount + 2);
  }
  // End of load more function

  useEffect(() => {
    setLoading(true);
    _getDevices(resultCount);
    setLoading(false);
  }, []);

  // Start of category list component
  const CategoryList = () => {
    return (
      <CategoryContainerView>
        {categories.map((item, index) => (
          <TouchableOpacity
            activeOpacity={0.8}
            key={index}
            onPress={() => setcategoryIndex(index)}>
            <Text
              style={[
                style.categoryText,
                categoryIndex === index && style.categoryTextSelected,
              ]}>
              {item}
            </Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          style={{
            backgroundColor: COLORS.white,
            height: 30,
            width: 100,
            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => _LoadMoreDevices()}>
          <Text style={{color: COLORS.dark, fontWeight: 'bold'}}>
            Load More
          </Text>
        </TouchableOpacity>
      </CategoryContainerView>
    );
  };
  // End of category list component

  // Start of card component
  const Card = ({device}) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('Details', device)}>
        <CardContainerView>
          <View style={{alignItems: 'flex-end'}}>
            {device.deviceCount > 0 ? (
              <MaterialCommunityIcons
                name="checkbox-marked-circle"
                size={25}
                color={COLORS.green}
              />
            ) : (
              <MaterialCommunityIcons
                name="close-circle"
                size={25}
                color={COLORS.red}
              />
            )}
          </View>

          <View style={{height: 100, alignItems: 'center'}}>
            <Image
              style={{
                flex: 1,
                resizeMode: 'contain',
                width: 130,
                height: 130,
              }}
              source={{
                uri:
                  // uri should be of form : http://YourMachineIpV4Address:8000/device/getDeviceImage/' +
                  // device._id + '?dim=' + device.deviceImageName,
                  'http://10.0.0.2:8000/device/getDeviceImage/' +
                  device._id +
                  '?dim=' +
                  device.deviceImageName,
              }}
            />
          </View>
          <DeviceNameText>{device.deviceName}</DeviceNameText>

          <PriceAndCartIconView>
            <PriceText>{device.deviceBrandName}</PriceText>
            <AddToCartIconView>
              <Text>{device.deviceCount}</Text>
            </AddToCartIconView>
          </PriceAndCartIconView>
        </CardContainerView>
      </TouchableOpacity>
    );
  };
  // End of card list component
  return (
    <SafeAreaViewContainer>
      {/* Start Of Header Section */}
      <StyledHeader>
        <View>
          <WelcomeText>Welcome to</WelcomeText>
          <StoreName>Your Inventory</StoreName>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('AddDevice')}>
          <TopRightIconsView>
            <FontAwesome
              name="plus-square"
              size={30}
              color={COLORS.queenBlue}
            />
          </TopRightIconsView>
        </TouchableOpacity>
      </StyledHeader>
      {/* End Of Header Section */}

      {/* Start Of Search and Sorting Section */}
      <SearchAndSortView>
        <SearchContainerView>
          <Ionicons
            name="search"
            size={25}
            style={{marginLeft: 20}}
            color={COLORS.queenBlue}
          />

          <SearchTextInput
            style={style.input}
            placeholder="Search"
            placeholderTextColor={COLORS.queenBlue}
            onChangeText={setSearchText}
            value={searchtext}
          />
          <TouchableOpacity onPress={() => clearSearch()}>
            <MaterialIcons
              name="clear"
              size={25}
              style={{marginRight: 10}}
              color={COLORS.dimGrey}
            />
          </TouchableOpacity>
        </SearchContainerView>

        <SortBtnView onPress={() => handleSearch('search')}>
          <MaterialCommunityIcons
            name="forwardburger"
            size={30}
            color={COLORS.white}
          />
        </SortBtnView>
      </SearchAndSortView>
      {/* End Of Search and Sorting Section */}

      {/* Start Of Categories List section */}
      <CategoryList />
      {/* End Of Categories List section */}

      {/* Start Of Listing Devices Section */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <ModalCenteredView>
          <LoadingModalView>
            <ActivityIndicator size="large" color={COLORS.green} />
            <LoadingmodalText>Loading, please wait</LoadingmodalText>
          </LoadingModalView>
        </ModalCenteredView>
      </Modal>
      {laoding ? (
        <ActivityIndicator size="large" color={COLORS.catalinablue} />
      ) : (
        <FlatList
          columnWrapperStyle={{justifyContent: 'space-between'}}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{marginTop: 10, paddingBottom: 50}}
          numColumns={2}
          data={
            filtered_Devices.length > 0
              ? filtered_Devices
              : filtered_Devices.length === 0 && searchtextLength.length > 0
              ? null
              : _devices
          }
          keyExtractor={item => item._id.toString()}
          renderItem={({item}) => <Card device={item} />}
        />
      )}
      {/* End Of Listing Devices*/}
    </SafeAreaViewContainer>
  );
};

const style = StyleSheet.create({
  categoryText: {
    fontSize: 16,
    color: 'grey',
    fontWeight: 'bold',
  },
  categoryTextSelected: {
    color: COLORS.queenBlue,
    paddingBottom: 5,
    borderBottomWidth: 2,
    borderColor: COLORS.queenBlue,
  },
});
export default HomeScreen;
