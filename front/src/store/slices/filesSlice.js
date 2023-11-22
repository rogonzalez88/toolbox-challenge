import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const reducers = {};

export const fetchFileList = createAsyncThunk(
  'files/fetchFileList',
  async () => {
    const { data } = await axios('http://localhost:8080/files/list');
    return data;
  }
);

export const fetchFileData = createAsyncThunk(
  'files/fetchFileData',
  async (params = {}) => {
    const { data } = await axios('http://localhost:8080/files/data', {
      params,
    });
    return data;
  }
);

export const slice = createSlice({
  name: 'files',
  initialState: {
    tableData: [],
    isLoadingTableData: true,
    fileList: { files: [] },
    isLoadingFileList: true,
  },
  reducers: reducers,
  extraReducers: (builder) => {
    builder.addCase(fetchFileList.pending, (state) => {
      state.isLoadingFileList = true;
    });
    builder.addCase(fetchFileList.fulfilled, (state, action) => {
      state.isLoadingFileList = false;
      state.fileList = action.payload;
    });
    builder.addCase(fetchFileList.rejected, (state, action) => {
      state.isLoadingFileList = false;
    });
    builder.addCase(fetchFileData.pending, (state) => {
      state.isLoadingTableData = true;
    });
    builder.addCase(fetchFileData.fulfilled, (state, action) => {
      state.isLoadingTableData = false;
      state.tableData = action.payload;
    });
    builder.addCase(fetchFileData.rejected, (state, action) => {
      state.isLoadingTableData = false;
    });
  },
});

export default slice.reducer;
