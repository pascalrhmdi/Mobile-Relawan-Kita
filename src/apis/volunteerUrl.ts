import Constants from 'expo-constants';
// https://cors-anywhere.herokuapp.com/
const volunteerMainUrl: string = `https://cors-anywhere.herokuapp.com/${Constants.manifest?.extra?.apiBaseUrl}/api/volunteer`;

const loginUrl: string = `${volunteerMainUrl}/login`;
const registerUrl: string = `${volunteerMainUrl}/register`;
const profileUrl: string = `${volunteerMainUrl}/profile`;
const volunteerHistoryUrl: string = `${volunteerMainUrl}/history`;

export {
  loginUrl,
  registerUrl,
  profileUrl,
  volunteerHistoryUrl
};

