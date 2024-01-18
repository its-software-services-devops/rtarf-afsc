
export const getCurrentRoutePath = () => {
  let currentUrl ="api" +  window.location.pathname;
  // const route = useRoute()
  // console.log('current name', route.name)
  // console.log(this.$route.path);
  // let routePath 
  // console.log(route.path);
  return currentUrl
  // console.log('current name', useRoute().route.path)
}

export const getCurrentSSHRoutePath = () => {
  let currentUrl ="api/ssh" +  window.location.pathname;
  // const route = useRoute()
  // console.log('current name', route.name)
  // console.log(this.$route.path);
  // let routePath 
  // console.log(route.path);
  return currentUrl
  // console.log('current name', useRoute().route.path)
};
