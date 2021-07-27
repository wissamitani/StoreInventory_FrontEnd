import {GET_DEVICES, ADD_DEVICE, EDIT_DEVICE, DELETE_DEVICE} from './actions';
// Initializing the _devices array that will be stored in the store of the redux
const initialState = {
  _devices: [],
};
// Reducer to be sent to the store
const deviceReducer = (state = initialState, action) => {
  // Execute based on the type of the dispatch is GET_DEVICES
  switch (action.type) {
    // Gets all the devices in the store.
    case GET_DEVICES:
      return {...state, _devices: action.payload};
    case ADD_DEVICE:
      // Concatinate the new device item to the _devices in the store.
      return {
        _devices: state._devices.concat(action.payload),
      };
    case EDIT_DEVICE:
      // Find the index of the item of be updated in the store,
      // if the index isn't -1, then the item is available,
      // so we just insert the updated item in the same index.
      const index = state._devices.findIndex(
        item => item._id === action.payload._id,
      );
      console.log(index);
      if (index !== -1) {
        state._devices[index] = action.payload;
      }
      console.log(state._devices[index]);
      return {
        _devices: [...state._devices],
      };
    case DELETE_DEVICE:
      // Return all the devices in the store except the item that is deleted
      return {
        _devices: state._devices.filter(
          _deviceIndex => _deviceIndex._id !== action.key,
        ),
      };
    default:
      return state;
  }
};

export default deviceReducer;
