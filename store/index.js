import { create }from "zustand";
import { getCurrentAccount } from "../lib/appwrite"

const appStore = create((set, get) => ({
  isOpenBottomSheet: false,
  todoActionType: "create",
  
  isLoggedIn: false,
  user: null,
  isLoadingAuth: false,
  
  toggleBottomSheet: ({ close }) => {
    set({ isOpenBottomSheet: close ? false : !get().isOpenBottomSheet })
  },
  
  setUser: (user) => {
    set({
      isLoggedIn: true,
      user
    })
  },
  
  checkAuth: async () => {
    try {
      set({ isLoadingAuth: true })
      const user = await getCurrentAccount();
      if(!user) throw Error;
      
      set({ isLoadingAuth: false, isLoggedIn: true, user })
    } catch (error) {
      set({ isLoadingAuth: false })
      console.error(`@ERROR_IN_ZUSTAND: ${error}`)
    }
  }
  
}));

export const useTodoStore = create((set, get) => ({
  allTodos: [],
  
  setTodos: (todos) => (
    set({ allTodos: todos })
  )
}));

export default appStore;
