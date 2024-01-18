let userProfile = {
  email: "",
  firstName: "",
  lastName: "",
  fullName: "",
};
export const setUserProfile = (
  email,
  // db_pass,
  firstName,
  lastName,
  fullName
) => {
  localStorage.setItem(
    "UserProfile",
    JSON.stringify({
      email: email,
      firstName: firstName,
      lastName: lastName,
      fullName: fullName,
    })
  );
};
// export const getSSHParam = () => {
//   let SSHConfig = JSON.parse(localStorage.getItem("SSHConfig"));
//   // console.log(dbConfig);
//   if (!SSHConfig) {
//     return {
//       SSH_USER: "",
//       // DB_PASSWORD: "",
//       SSH_PORT: "22",
//       SSH_IP: "",
//       COM_NAME: "",
//     };
//   }
//   //   console.log(dbConfig.DB_NAME);
//   //   console.log(dbConfig.ORACLEDB_USER);
//   //   console.log(dbConfig);
//   return SSHConfig;
// };
export const useUserInfo = () => {
  let userInfo = JSON.parse(localStorage.getItem("UserProfile"));
  console.log(userInfo);
  const currentUrl = new URL(window.location);
  if (userInfo) {
    return userInfo;
  } else {
    const profile = currentUrl.searchParams.get("profile");
    console.log(profile);

    if (profile) {
      let userInfo = JSON.parse(profile);
      setUserProfile(
        userInfo.email,
        userInfo.firstName,
        userInfo.lastName,
        userInfo.firstName + " " + userInfo.lastName
      );
      location.replace(currentUrl.origin  + currentUrl.pathname);

      // return userProfile;
    } else {
      login(currentUrl.origin  + currentUrl.pathname);
    }
  }

  // console.log(currentUrl);
  // console.log(currentUrl.origin + "/" + currentUrl.pathname);
  // const profile = currentUrl.searchParams.get("profile");
  // console.log(profile);
  // if (profile) {
  //   let userInfo = JSON.parse(profile);
  //   setUserProfile(
  //     userInfo.emai,
  //     userInfo.firstName,
  //     userInfo.lastName,
  //     userInfo.firstName + " " + userInfo.lastName
  //   );
  // return userProfile;

  // if (userProfile.email) {
  //   return userProfile;
  // } else {
  //   login(currentUrl.origin + "/" + currentUrl.pathname);
  // }
};

const login = (redirect_url) => {
  const config = useRuntimeConfig();
  // console.log(config.public.baseURL);
  location.replace(config.public.authenURL + "/login?RelayState=" + redirect_url);

  // const res = await useFetch('/login', {
  //   baseURL: config.public.baseURL,
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ hostname: critiria })
  // })
};
