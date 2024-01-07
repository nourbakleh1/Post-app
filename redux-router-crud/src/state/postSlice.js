import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = { records: [], loading: false, error: null,record:{} };

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await fetch("http://localhost:5000/posts");
      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deletePosts = createAsyncThunk(
  "posts/deletePosts",
  async (item, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      await fetch(`http://localhost:5000/posts/${item.id}`, {
        method: "DELETE",
      });
      return item;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const insertPosts = createAsyncThunk(
  "posts/insertPosts",
  async (item, thunkAPI) => {
    const { rejectWithValue,getState } = thunkAPI;
      item.name=getState().auth.adminName;
    try {

       const data=await fetch(`http://localhost:5000/posts/`,{
        method:"POST",
        body:JSON.stringify(item),
        headers:{
          "Content-type":"application/json; charst=UTF-8",
        }
        
       });
       return await data.json();
      
    } catch (error) {

      return rejectWithValue(error.message);
    }
  }
);
export const getPosts = createAsyncThunk(
  "posts/getPosts",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await fetch(`http://localhost:5000/posts/${id}`);
      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const updatePosts = createAsyncThunk(
  "posts/updatePosts",
  async (item, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {

       const data=await fetch(`http://localhost:5000/posts/${item.id}`,{
        method:"PATCH",
        body:JSON.stringify(item),
        headers:{
          "Content-type":"application/json; charst=UTF-8",
        }
        
       });
       return await data.json();
      
    } catch (error) {

      return rejectWithValue(error.message);
    }
  }
);
const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    cleanRecord:(state,action)=>{
      state.record=null
    }
  },
  extraReducers: {
    //fetch posts
    [fetchPosts.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.loading = false;
      state.records = action.payload;
    },
    [fetchPosts.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    //insert post
    [insertPosts.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [insertPosts.fulfilled]: (state, action) => {
      state.loading = false;
      state.records.push(action.payload);
    },
    [insertPosts.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    //delete post
[deletePosts.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [deletePosts.fulfilled]: (state, action) => {
      state.loading = false;
      state.records=state.records.filter((el)=>{
          return el.id !== action.payload.id;
      });
    },
    [deletePosts.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
   
    //get posts
    [getPosts.pending]: (state) => {
      state.loading = true;
      state.error = null;

    },
    [getPosts.fulfilled]: (state, action) => {
      state.loading = false;
      state.record = action.payload;
    },
    [getPosts.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    //edit post
     [updatePosts.pending]: (state) => {
      state.loading = true;
      state.error = null;

    },
    [updatePosts.fulfilled]: (state, action) => {
      state.loading = false;
      state.record=action.payload;
    },
    [updatePosts.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
export const {cleanRecord}=postSlice.actions;
export default postSlice.reducer;