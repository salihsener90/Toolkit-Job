import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jobs: [],
  initialized: false, //veriler yüklendi mi? onun state kısmı burası ilk basta hayır sonra alt kısımda evet diycez
  isError: false, //hata varmı
};

const jobSlice = createSlice({
  mainJobs: [],
  name: "jobs",
  initialState,
  reducers: {
    setJob: (state, action) => {
      state.jobs = action.payload;
      state.mainJobs = action.payload;
      state.initialized = true;
    },
    setError: (state) => {
      state.isError = true;
      state.initialized = true;
      state.isError = false;
    },
    filterBySearch: (state, action) => {
      //arama terimini küçük harfe cevirme
      const query = action.payload.toLowerCase();
      //sadece arama terimini içeren işleri filtreleme
      const filter = state.mainJobs.filter((job) =>
        job.company.toLowerCase().includes(query)
      );
      //state i guncelleme
      state.jobs = filter;
    },
    filterByStatus: (state, action) => {
      const filtred = state.mainJobs.filter(
        (job) => job.status === action.payload
      );
      state.jobs = filtred;
    },
    filterByType: (state, action) => {
      const filtred = state.mainJobs.filter(
        (job) => job.type === action.payload
      );
      state.jobs = filtred;
    },
    sortJobs: (state, action) => {
      switch (action.payload) {
        case "a-z":
          //metin ifadelerini az dan zy sıralama
          state.jobs.sort((a, b) => a.company.localeCompare(b.company));
          break;
        case "z-a":
          //z den a y asrıalama
          state.jobs.sort((a, b) => a.company.localeCompare(a.company));
          break;
        case "En Yeni":
          state.jobs.sort((a, b) => new Date(b.date) - new Date(a.date));
          break;
        case "En Eski":
          state.jobs.sort((a, b) => new Date(a.date) - new Date(b.date));
          break;
      }
    },
    clearFilters: (state) => {
      state.jobs = state.mainJobs;
    },
  },
});

// aksiyonları export etme kısmı
export const {
  setJob,
  setError,
  sortJobs,
  clearFilters,
  filterByType,
  filterBySearch,
  filterByStatus,
} = jobSlice.actions;

//createslice ın olusturdgu reducer ı export etme
export default jobSlice.reducer;
