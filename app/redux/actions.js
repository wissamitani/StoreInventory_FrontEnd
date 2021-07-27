/* eslint-disable no-unreachable */
export const GET_DEVICES = 'GET_DEVICES';
export const ADD_DEVICE = 'ADD_DEVICE';
export const EDIT_DEVICE = 'EDIT_DEVICE';
export const DELETE_DEVICE = 'DELETE_DEVICE';

import {deviceService} from '../_services';
// Get the devices from the database, and send a dispatch of type GET_DEVICES
export const _GetDevices = count => {
  try {
    return async dispatch => {
      const result = await deviceService.GetDevices(count);
      dispatch({
        type: GET_DEVICES,
        payload: result.data,
      });
    };
  } catch (error) {
    console.log(error);
  }
};
// Insert a device to the database, and send a dispatch of type ADD_DEVICE with the
// inserted device
export const _AddDevice = device => {
  try {
    return async dispatch => {
      const _newInsertedDevice = await deviceService.AddEditDevice(0, device);
      dispatch({
        type: ADD_DEVICE,
        payload: _newInsertedDevice.data.data,
      });
    };
  } catch (error) {
    console.log(error);
  }
};
// Update an existing device, and send a dispatch of type EDIT_DEVICE with the
// updated device
export const _UpdateDevice = (deviceId, device) => {
  try {
    return async dispatch => {
      const result = await deviceService.AddEditDevice(deviceId, device);
      dispatch({
        type: EDIT_DEVICE,
        payload: JSON.parse(result.data.data),
      });
    };
  } catch (error) {
    console.log(error);
  }
};
// Delete a device, and send a dispatch of type DELETE_DEVICE
export const _DeleteDevice = key => {
  try {
    return async dispatch => {
      const result = await deviceService.DeleteDevice(key);
      if (result) {
        dispatch({
          type: DELETE_DEVICE,
          key,
        });
      }
    };
  } catch (error) {
    console.log(error);
  }
};
