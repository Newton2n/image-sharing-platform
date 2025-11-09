import { createSlice } from "@reduxjs/toolkit";
const initialTheme = localStorage.getItem("theme") || "light";
export const themeSlice = createSlice({
    name :"theme",
  initialState: {
    mood: initialTheme,
  },

  reducers: {
    themeToggler: (state) => {
      state.mood = state.mood === "light" ? "dark" : "light";
      localStorage.setItem("theme", state.mood);
    },
    setTheme:(state,action)=>{
      state.mood =action.payload
      localStorage.setItem("theme", state.mood);
    }
  },
});

export const { themeToggler,setTheme } = themeSlice.actions;
export default themeSlice.reducer;
