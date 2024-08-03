import {createSlice} from "@reduxjs/toolkit";

const appSlice = createSlice({
    name:"app",
    initialState:{
        open:false, 
        video:[],
        searchVideo:[],
        category:"All",
        searchCategory:"ALL",
        searchSuggestion:[],
    },
    reducers:{
        // action
        toggleSidebar:(state)=>{
            state.open = !state.open;
        },
        setHomeVideo:(state,action)=>{
            state.video = action.payload;
        },
        setSearchVideo:(state,action)=>{
            state.searchVideo = action.payload;
        },
        setSearchCategory:(state,action)=>{
            state.searchCategory = action.payload;
        },
        setCategory:(state,action)=>{
            state.category = action.payload;
        },
        setSearchSuggestion:(state,action)=>{
            state.searchSuggestion = action.payload;
        }
         
    } 
});
export const {toggleSidebar,setHomeVideo,setCategory,setSearchSuggestion,setSearchCategory,setSearchVideo} = appSlice.actions;
export default appSlice.reducer;
