

const InventoryContext = createContext();

const inventoryReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      return { ...state, items: [...state.items, action.payload] };
    case "UPDATE_ITEM":
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id ? action.payload : item
        ),
      };
    case "DELETE_ITEM":
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      };
    default:
      return state;
  }
};

export const InventoryProvider = ({ children }) => {
  const [inventoryState, dispatch] = useReducer(inventoryReducer, { items: [] });

  const addItem = (item) => dispatch({ type: "ADD_ITEM", payload: item });
  const updateItem = (item) => dispatch({ type: "UPDATE_ITEM", payload: item });
  const deleteItem = (id) => dispatch({ type: "DELETE_ITEM", payload: id });

  return (
    <InventoryContext.Provider value={{ inventoryState, addItem, updateItem, deleteItem }}>
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventory = () => useContext(InventoryContext);