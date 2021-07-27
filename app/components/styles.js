// This component class contains all my used components in the entire application
import styled from 'styled-components';
import {
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  Pressable,
} from 'react-native';
const width = Dimensions.get('screen').width / 2 - 30;
import COLORS from '../consts/colors';

export const StyledHeader = styled.View`
  margin-top: 30px;
  flex-direction: row;
  justify-content: space-between;
`;
export const AddDeviceStyledHeader = styled.View`
  margin-top: 30px;
  flex-direction: column;
  justify-content: flex-start;
`;
export const WelcomeText = styled.Text`
  font-size: 25px;
  font-weight: bold;
  color: ${COLORS.black};
`;
export const StoreName = styled.Text`
  font-size: 38px;
  font-weight: bold;
  color: ${COLORS.queenBlue};
`;
export const TopRightIconsView = styled.View`
  flex-direction: row;
`;
export const SearchAndSortView = styled.View`
  margin-top: 30px;
  flex-direction: row;
`;
export const SearchContainerView = styled.View`
  height: 50px;
  background-color: ${COLORS.white};
  border-radius: 10px;
  flex: 1;
  flex-direction: row;
  align-items: center;
`;
export const SortBtnView = styled.TouchableOpacity`
  margin-left: 10px;
  height: 50px;
  width: 50px;
  background-color: ${COLORS.queenBlue};
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;

export const SelectImageBtn = styled.TouchableOpacity`
  height: 45px;
  width: 150px;
  background-color: ${COLORS.catalinablue};
  justify-content: center;
  align-items: center;
  border-radius: 3px;
`;
export const CategoryContainerView = styled.View`
  flex-direction: row;
  margin-top: 30px;
  margin-bottom: 20px;
  justify-content: space-between;
`;
export const CardContainerView = styled.View`
  height: 215px;
  background-color: ${COLORS.white};
  width: ${width}px;
  margin-horizontal: 2px;
  border-radius: 10px;
  margin-bottom: 20px;
  padding: 15px;
`;
export const FavoritIconView = styled.View`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  align-items: center;
  justify-content: center;
  background-color: ${props =>
    props.favorite === true ? COLORS.light : 'rgba(0,0,0,0.5)'};
`;
export const DeviceNameText = styled.Text`
  font-weight: bold;
  font-size: 17px;
  margin-top: 10px;
  color: ${COLORS.black};
`;

export const PriceAndCartIconView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 5px;
`;

export const PriceText = styled.Text`
  font-size: 17px;
  color: ${COLORS.black};
`;

export const AddToCartIconView = styled.View`
  height: 25px;
  width: 25px;
  background-color: ${COLORS.cultured};
  border-radius: 5px;
  justify-content: center;
  align-items: center;
`;
export const AddToCartIconText = styled.Text`
  font-size: 22px;
  color: ${COLORS.white};
  font-weight: bold;
`;

export const SafeAreaViewContainer = styled.SafeAreaView`
  flex: 1;

  background-color: ${COLORS.cultured};

  ${props =>
    props.screen !== 'details' &&
    `
  padding-horizontal: 20px;
  `}
`;
export const StyledFormArea = styled.View`
  width: 100%;
`;
export const LeftIcon = styled.View`
  left: 15px;
  top: 38px;
  position: absolute;
  z-index: 1;
`;
export const StyledInputLabel = styled.Text`
  color: ${COLORS.dimGrey};
  font-size: 14px;
  text-align: left;
  margin-left: 3px;
`;
export const StyledTextInput = styled.TextInput`
  background-color: ${COLORS.white};
  padding-left: 15px;
  margin-right: 15px;
  border-radius: 5px;
  font-size: 12px;
  height: 50px;
  margin-vertical: 5px;
  margin-bottom: 10px;
  color: ${COLORS.queenBlue};
  width: ${width + 5}px;

  border-width: 0.6px;
  border-color: ${COLORS.cultured};
`;
export const RightIcon = styled.TouchableOpacity`
  right: 15px;
  top: 38px;
  position: absolute;
  z-index: 1;
`;
export const ExtraView = styled.View`
  justify-content: center;
  flex-direction: row;
  align-items: center;
  padding: 10px;
`;

export const ExtraText = styled.Text`
  justify-content: center;
  align-content: center;
  color: ${COLORS.tertiary};
  font-size: 15px;
`;

export const TextLink = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
`;

export const TextLinkContent = styled.Text`
  color: ${COLORS.brand};
  font-size: 15px;
`;
export const StyledButton = styled.TouchableOpacity`
  padding: 15px;
  background-color: ${COLORS.catalinablue};
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  margin-vertical: 5px;
  height: 60px;

  ${props =>
    props.google === true &&
    `
    background-color : ${COLORS.green};
    flex-direction : row;
    justify-content : center
  `}
`;

export const ButtonText = styled.Text`
  color: ${COLORS.primary};
  font-size: 16px;
`;

export const MsgBox = styled.Text`
  text-align: center;
  font-size: 13px;
  color: ${props => (props.type === 'SUCCESS' ? COLORS.green : COLORS.red)};
`;

export const Line = styled.View`
  height: 1px;
  width: 100%;
  background-color: ${COLORS.darkLight};
  margin-vertical: 10px;
`;
export const StyledContainer = styled.View`
  flex: 1;
`;
export const InnerContainer = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
`;

export const ModalCenteredView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const ModalView = styled.View`
  width: 300px;
  height: 300px;
  justify-content: center;
  background-color: ${COLORS.warning};
  border-radius: 5px;
  padding: 35px;
  align-items: center;
  shadow-color: ${COLORS.dark};
  shadow-radius: 4px;
  elevation: 5;
`;

export const LoadingModalView = styled.View`
  width: 221px;
  height: 155px;
  justify-content: center;
  background-color: ${COLORS.queenBlue};
  border-radius: 5px;
  padding: 35px;
  align-items: center;
  shadow-color: ${COLORS.dark};
  shadow-radius: 4px;
  elevation: 5;
`;
export const ModalCancelBtnText = styled.Text`
  color: ${COLORS.black};
  font-weight: bold;
  text-align: center;
`;
export const ModalDeleteBtnText = styled.Text`
  color: ${COLORS.white};
  font-weight: bold;
  text-align: center;
`;

export const DetailsHeaderView = styled.View`
  padding-horizontal: 20px;
  margin-top: 20px;
  flex-direction: row;
  justify-content: space-between;
`;
export const EditDeviceBtnView = styled.View`
  width: 50px;
  height: 35px;
  border-width: 1px;
  border-color: white;
  background-color: ${COLORS.black};
  flex-direction: row;
  align-items: center;
  border-radius: 8px;
  justify-content: center;
`;
export const EditDeviceBtnText = styled.Text`
  color: ${COLORS.white};
  font-size: 15px;
`;
export const EditDeviceImageContainer = styled.View`
  flex: 0.5;
  margin-top: 20px;
  justify-content: center;
  align-items: center;
`;
export const EditDeviceNumberOfDevices = styled.View`
  width: 200px;
  height: 35px;
  background-color: ${COLORS.queenBlue};
  flex-direction: row;
  align-items: center;
  justify-content: center;
  align-self: center;
  border-radius: 8px;
`;
export const EditDeviceNumberOfDevicesText = styled.Text`
  color: ${COLORS.white};
  font-size: 15px;
`;
export const EditDeviceDetailsContainer = styled.View`
  flex: 1;
  background-color: ${COLORS.dimGrey};
  border-top-right-radius: 25px;
  border-top-left-radius: 25px;
  margin-top: -20px;
  padding-top: 40px;
  z-index: -1;
`;

export const EditDeviceDetailsContainerHeader = styled.View`
  margin-left: 20px;
  flex-direction: column;
`;
export const EditDeviceDetailsContainerHeaderNameAndAction = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
export const HeaderDeviceName = styled.Text`
  color: ${COLORS.black};
  font-size: 25px;
  font-weight: bold;
`;
export const HeaderDeviceBrandName = styled.Text`
  color: ${COLORS.queenBlue};
  font-size: 20px;
  margin-top: 5px;
`;
export const DeviceSpecificationsView = styled.View`
  padding-horizontal: 20px;
  margin-top: 20px;
  flex: 1;
  flex-direction: column;
`;
export const DeviceSpecificationsText = styled.Text`
  color: ${COLORS.black};
  font-size: 25px;
  font-weight: bold;
`;
export const TwoDeviceSpecificationsView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
`;

export const ImageAreaView = styled.View`
  width: ${width}px;
  height: 150px;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  margin-left: ${width / 2}px;
  margin-bottom: 40px;
`;
export const LoadingmodalText = styled.Text`
  font-weight: bold;
  font-size: 17px;
  margin-bottom: 20px;
  margin-top: 15px;
  text-align: center;
  color: ${COLORS.white};
`;
export const SearchTextInput = styled.TextInput`
  font-size: 18px;
  font-weight: bold;
  color: ${COLORS.dark};
  flex: 1;
  padding-left: 15px;
`;
export const DeletemodalText = styled.Text`
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 20px;
  margin-top: 15px;
  text-align: center;
  color: ${COLORS.lightred};
`;
export const DeleteBtn = styled.Pressable`
  border-color: ${COLORS.lightred};
  background-color: ${COLORS.lightred};
  margin-left: 15px;
  border-radius: 5px;
  padding: 10px;
  border-width: 1px;
`;
export const CancelBtn = styled.Pressable`
  border-color: ${COLORS.white};
  background-color: ${COLORS.white};
  margin-left: 15px;
  border-radius: 5px;
  padding: 10px;
  border-width: 1px;
`;
