export const useAPIFetch = (request, data) => {
  const config = useRuntimeConfig();
  let opts;
  let userInfo = JSON.parse(localStorage.getItem("UserProfile"));

  if (data) {
    opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data , profile: { userInfo } }),
    };
  } else {
    opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({  profile: { userInfo } }),
    };
  }

  return useFetch(request, {
    baseURL: config.public.baseURL,
    onRequest({ request, options }) {
      // Set the request headers
    },
    onRequestError({ request, options, error }) {
      // Handle the request errors
      console.log("error:" + response);
      console.log("error:" + error);
    },
    onResponse({ request, response, options }) {
      // Process the response data
      console.log(response._data);
      console.log(response._data.query_status === "fail");
      if (response._data.query_status === "fail") {
        useCustomAlert("error in useCustomFetch onResponse:", response._data.error_msg);
      }
      return response._data;
    },
    onResponseError({ request, response, options }) {
      // Handle the response errors
      console.log("error:" + response);
    },
    ...opts,
  });
};
