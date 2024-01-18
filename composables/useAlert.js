export const useCustomAlert = (name_func, message) => {
  console.log("alert");
  console.log(name_func + " : " + message.toString());
  // alert({
  //   message:  name_func+" : "+message.toString(),
  // });

  Notify.create({
    type: "Error",
    position: "top",
    color: "negative",
    message: "ERROR ! : " + name_func + " : " + message.toString(),
    actions: [
      { icon: 'close', color: 'grey', round: true , }
    ]
    
  });
  // dismiss()
};

export const useCustomAlertSuccess = (message) => {
  Notify.create({
    type: "positive",
    position: "top",
    message: message.toString(),
    actions: [
      { icon: 'close', color: 'grey', round: true , }
    ]
  });
  // dismiss()
};
