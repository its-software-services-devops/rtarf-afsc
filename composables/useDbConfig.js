export const setDbParam = (
  db_user,
  // db_pass,
  db_ip,
  db_name,
  db_port,
  com_name
) => {
  const config = useRuntimeConfig();
  console.log("admin checker")
  console.log(config.public.adminMode)
  if(!config.public.adminMode){
    console.log('use dummy')
    db_user = 'dummy'
  }else{
    console.log("not use dummy")
  }
  localStorage.setItem(
    "dbConfig",
    JSON.stringify({
      DB_NAME: db_name,
      DB_USER: db_user,
      // DB_PASSWORD: db_pass,
      DB_PORT: db_port || "1521",
      DB_IP: db_ip,
      COM_NAME: com_name || "",
      //   ORACLEDB_CONNECTIONSTRING: ip + ":" + (port || 1521) + "/" + db_name,
    })

  );
  if(!config.public.adminMode){
    setDBPassword("dummy")
  }else{
    setDBPassword("")
  }
 
  //   dbConfig.ORACLEDB_USER = db_user;
  //   dbConfig.ORACLEDB_PASSWORD = db_pass;
  //   dbConfig.ORACLEDB_CONNECTIONSTRING =
  //     ip + ":" + (port || 1521) + "/" + db_name;
  //   ORACLEDB_CONNECTIONSTRING = "172.30.86.18:1521/dbtest";
};


export const getDbParam = () => {
  let dbConfig = JSON.parse(localStorage.getItem("dbConfig"));
  // console.log(dbConfig);
  if (!dbConfig) {
    return {
      DB_NAME: "",
      DB_USER: "",
      // DB_PASSWORD: "",
      DB_PORT: "1521",
      DB_IP: "",
      COM_NAME: "",
    };
  }
  //   console.log(dbConfig.DB_NAME);
  //   console.log(dbConfig.ORACLEDB_USER);
  //   console.log(dbConfig);
  return dbConfig;
};

export const setSSHParam = (
  ssh_user,
  // db_pass,
  ssh_ip,
  ssh_port,
  com_name
) => {
  localStorage.setItem(
    "SSHConfig",
    JSON.stringify({
      SSH_USER: ssh_user,
      // DB_PASSWORD: db_pass,
      SSH_PORT: ssh_port || "22",
      SSH_IP: ssh_ip,
      COM_NAME: com_name || "",
      //   ORACLEDB_CONNECTIONSTRING: ip + ":" + (port || 1521) + "/" + db_name,
    })

  );
  setSSHPassword("")
  //   dbConfig.ORACLEDB_USER = db_user;
  //   dbConfig.ORACLEDB_PASSWORD = db_pass;
  //   dbConfig.ORACLEDB_CONNECTIONSTRING =
  //     ip + ":" + (port || 1521) + "/" + db_name;
  //   ORACLEDB_CONNECTIONSTRING = "172.30.86.18:1521/dbtest";
};

export const getSSHParam = () => {
  let SSHConfig = JSON.parse(localStorage.getItem("SSHConfig"));
  // console.log(dbConfig);
  if (!SSHConfig) {
    return {
      SSH_USER: "",
      // DB_PASSWORD: "",
      SSH_PORT: "22",
      SSH_IP: "",
      COM_NAME: "",
    };
  }
  //   console.log(dbConfig.DB_NAME);
  //   console.log(dbConfig.ORACLEDB_USER);
  //   console.log(dbConfig);
  return SSHConfig;
};
