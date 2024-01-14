export const ussCusFetch = (request, data) => {
  const config = useRuntimeConfig();
  let opts;
  let userInfo = JSON.parse(localStorage.getItem("UserProfile"));

  let result = await useFetch(config.public.baseURL, {
    method: 'post',
    body: {
      name: formData.value.name,
      email: formData.value.email,
      message: formData.value.message,
    }
  })
};
