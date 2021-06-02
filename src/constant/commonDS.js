export const status = {
  REQUEST: 0,
  SUCCESS: 1,
  ERROR: 2,
};

export const apiResponsestatus = {
  SUCCESS: 1,
  FAILED: 0,
  AUTHFAILED: -1,
};

export const configurations = {
  ApiUrl: "http://122.170.10.70:8888/api",
};

export const getHeaders = {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
};

export function hasRight(menuCode) {
  let Access = localStorage.getItem("userRole")
    ? JSON.parse(localStorage.getItem("userRole"))
    : [];
  let right = {};
  Access.map(
    (data, i) =>
      data?.SubMenus.length > 0 &&
      data?.SubMenus.map((d, index) => {
        if (d.FuncCode === menuCode) {
          right["AllowApproval"] = d.AllowApproval;
          right["AllowView"] = d.AllowView;
          right["AllowUpdate"] = d.AllowUpdate;
          right["AllowDelete"] = d.AllowDelete;
          right["AllowInsert"] = d.AllowInsert;
        }
        return null;
      })
  );
  return right;
}

export function Comparision(otherArray, compareKey) {
  console.log("otherArray", otherArray);
  return function (current) {
    return (
      otherArray.filter(function (other) {
        return other[compareKey] === current[compareKey];
      }).length === 0
    );
  };
}

export const apiEndPoints = {
  loginUser: configurations.ApiUrl + "/User/LoginUser",
  getUserRights: configurations.ApiUrl + "/GetUserRights",
 
  //Earning Master
  getEarningMasterList: configurations.ApiUrl + "/EarningMaster/EarningMasterList",
  getEarningMasterDropDown:
    configurations.ApiUrl + "/EarningMaster/AddEarningMasterDropDown",
    getEarningMasterById: configurations.ApiUrl + "/EarningMaster/GetEarningMasterByID",
    addEarningMaster: configurations.ApiUrl + "/EarningMaster/CreateOrUpdateEarningMaster",
    deleteEarningMaster: configurations.ApiUrl + "/EarningMaster/DeleteEarningMaster",

//Earning Master End

};