function Reducer(state, action) {
  switch (action.type) {
    case "log":
      return {
        ...state,
        user: action.payload.name,
        role: action.payload.permission,
      };
      break;
    case "title":
      return {
        ...state,
        title: action.payload,
      };
      break;

    default:
      return {
        title: "Note System",
        user: "Nobody",
        role: "none",
      };
      break;
  }
}

// state{
//     titel:string
//     user:string
//     role:string
// }

export default Reducer;
