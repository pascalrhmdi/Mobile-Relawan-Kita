import Constants from 'expo-constants';
// https://cors-anywhere.herokuapp.com/
const volunteerMainUrl: string = `${Constants.manifest?.extra?.apiBaseUrl}/api/volunteer`;

const loginUrl: string = `${volunteerMainUrl}/login`;
const registerUrl: string = `${volunteerMainUrl}/register`;
const profileUrl: string = `${volunteerMainUrl}/profile`;
const ubahKataSandiUrl: string = `${volunteerMainUrl}/change-password`
const volunteerHistoryUrl: string = `${volunteerMainUrl}/history`

export {
  loginUrl,
  registerUrl,
  profileUrl,
  ubahKataSandiUrl,
  volunteerHistoryUrl
};

