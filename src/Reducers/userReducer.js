const userState = {
  name: "karan",
  userProfileInfo: {},
  image: "",
  id: "",
};

const userReducer = (state = userState, action) => {
  switch (action.type) {
    case "GET_USER_PROFILE":
      //console.log(action.payload.val);
      //action.payload.name = action.payload.val;

      return {
        ...state,
        userProfileInfo: action.payload,
      };

    case "IMAGE":
      //console.log(action.payload.val);
      //action.payload.name = action.payload.val;

      return {
        ...state,
        image: action.payload,
      };

    case "ADD_USER":
      return {
        ...state,
        userInfo: action.payload,
      };

    case "ALL_USERS":
      return {
        ...state,
        userList: action.payload,
      };

    case "CONNECT_USER":
      return {
        ...state,
        id: action.payload,
      };

    case "LOGIN_USER":
      return {
        ...state,
        loginInfo: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
