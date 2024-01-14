let action_type = {
  is_ssh_config: false,
  is_db_config: false,
};
// let db_connected = false;
// let ssh_connected = false;
export const setActionType = (action_object) => {
  console.log(action_object)
  action_type = action_object;
};

export const getActionType = () => {
  return action_type;
};
