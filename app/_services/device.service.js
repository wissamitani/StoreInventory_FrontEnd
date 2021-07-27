import axios from 'axios';
// baseUrl should be of form : http://YourMachineIpV4Address:8000/device
const baseUrl = 'http://10.0.0.2:8000/device';

export const deviceService = {
  AddEditDevice,
  GetDevices,
  DeleteDevice,
  AddImage,
};
// Fetch methods to be used in sending requests to the API and handling response.
function get(url) {
  const requestOptions = {
    method: 'GET',
  };
  return fetch(url, requestOptions).then(handleResponse);
}
function _delete(url) {
  const requestOptions = {
    method: 'DELETE',
  };
  return fetch(url, requestOptions).then(handleResponse);
}
function post(url, body) {
  const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'multipart/form-data'},
    credentials: 'include',
  };

  return axios.post(url, body, requestOptions);
}
function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);

    if (!response.ok) {
      const error = data || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
// API FUNCTIONS CALL
function AddEditDevice(id, params) {
  return post(`${baseUrl}/addeditDevice/${id}`, params);
}
function GetDevices(limit) {
  return get(`${baseUrl}/getAllDevicesPaginated/${limit}`);
}
function DeleteDevice(id) {
  return _delete(`${baseUrl}/deleteDevice/${id}`);
}
function AddImage(params) {
  return post(`${baseUrl}/api/upload/`, params);
}
