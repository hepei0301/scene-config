import axios, { AxiosRequestConfig } from 'axios';

var request = axios.create({
  //   baseURL: 'http://bimcloud-test.gcnao.cn:8080',
  timeout: 4000,
  // headers: {'X-Custom-Header': 'foobar'}
});

export default request;

export const request1 = axios.create({
  baseURL: 'http://bimcloud-test.gcnao.cn:8080',
  timeout: 4000,
  // headers: {'X-Custom-Header': 'foobar'}
});

// axios.defaults.headers.common['token'] = 'eyJhbGciOiJIUzI1NiJ9.eyJhY2NvdW50SWQiOiJmNjk5N2ZlMDljNWQ0ODI3YmJjZmQ2MzYyN2Q3YWUwNCIsImVtYWlsIjoiMTMzNTI5NjU0NjBAcXEuY29tIiwibmFtZSI6IuWImOi-ieWWnCIsInVzZXJuYW1lIjoibGl1aHVpeGkiLCJwaG9uZU51bWJlciI6IjE5MjAwMDAwMDU3IiwiYWNjb3VudFR5cGUiOiJQRVJTT05BTCIsInVzZXJJZCI6ImM2Nzk4MGI0YWVkYjQ2NThhNTM4YWRlNTc4YjM0OWI1IiwiY29tcGFueUlkIjoiMDMwYjE5N2JkNDc1NDJkNmI2ODY5MTY2Nzg4YjRkNjIiLCJjb21wYW55TmFtZSI6Iua3seWcs-W4guS6pOmAmuWFrOeUqOiuvuaWveW7uuiuvuS4reW_gyIsImV4cCI6MTYyMDkwNjcyOX0.yerAxiXkXqbOdZOxnjclw8MzchY6z0MwtK5uZa8fOvw';

axios.interceptors.request.use(
  function (config) {
    config.headers['accessToken'] =
      'eyJhbGciOiJIUzI1NiJ9.eyJhY2NvdW50SWQiOiJmNjk5N2ZlMDljNWQ0ODI3YmJjZmQ2MzYyN2Q3YWUwNCIsImVtYWlsIjoiMTMzNTI5NjU0NjBAcXEuY29tIiwibmFtZSI6IuWImOi-ieWWnCIsInVzZXJuYW1lIjoibGl1aHVpeGkiLCJwaG9uZU51bWJlciI6IjE5MjAwMDAwMDU3IiwiYWNjb3VudFR5cGUiOiJQRVJTT05BTCIsInVzZXJJZCI6ImM2Nzk4MGI0YWVkYjQ2NThhNTM4YWRlNTc4YjM0OWI1IiwiY29tcGFueUlkIjoiMDMwYjE5N2JkNDc1NDJkNmI2ODY5MTY2Nzg4YjRkNjIiLCJjb21wYW55TmFtZSI6Iua3seWcs-W4guS6pOmAmuWFrOeUqOiuvuaWveW7uuiuvuS4reW_gyIsImV4cCI6MTYyMDkwNjcyOX0.yerAxiXkXqbOdZOxnjclw8MzchY6z0MwtK5uZa8fOvw';
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
