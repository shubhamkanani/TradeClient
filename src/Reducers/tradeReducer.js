const tradeState = {
  tradeName: "",
  tradeQty: "",
  tradeAmount: "",
  userID: "",
};

const tradeReducer = (state = tradeState, action) => {
  switch (action.type) {
    case "GET_ADD_TRADEFORM":
      //console.log(action.payload.val);
      //action.payload.name = action.payload.val;

      return {
        ...state,
        [action.payload.name]: action.payload.val,
      };

    case "TRADE_IMAGE":
      //console.log(action.payload.val);
      //action.payload.name = action.payload.val;

      return {
        ...state,
        tradeName: action.payload,
      };

    case "TRADE_ADD_USER":
      return {
        ...state,
        tradeName: action.payload,
      };

    case "VIEW_TRADE":
      return {
        ...state,
        tradeList: action.payload,
      };

    case "SEND_TRADE":
      return {
        ...state,
        tradeInfo: action.payload,
      };
    default:
      return state;
  }
};

export default tradeReducer;
