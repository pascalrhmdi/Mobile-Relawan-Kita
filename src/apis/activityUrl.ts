import Constants from 'expo-constants';

const volunteerMainUrl: string = `${Constants.manifest?.extra?.apiBaseUrl}/api/activity`;

const registerAnActivityUrl: string = `${volunteerMainUrl}/register`;
const searchActivityUrl: string = `${volunteerMainUrl}/search`;
const allActivityCategoryUrl : string = `${volunteerMainUrl}/category`;

export {
  volunteerMainUrl,
  searchActivityUrl,
  registerAnActivityUrl,
  allActivityCategoryUrl
};

