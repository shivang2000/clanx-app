import { createSlice, SliceSelectors } from "@reduxjs/toolkit";

export interface IAppStore {
  lat: string | null;
  lon: string | null;
  country: string | null;
}

const initialState: IAppStore = {
  country: null,
  lat: null,
  lon: null,
};

export type IUpdateActionReducers = {
  type: string;
  payload:
    | {
        type: "UPDATE_SELECTED_COUNTRY";
        value: string | null;
      }
    | {
        type: "UPDATE_COORDINATES";
        value: {
          lat: string | null;
          lon: string | null;
        };
      };
};

export const appStoreSlice = createSlice<
  IAppStore,
  {
    updateAppStore: (state: IAppStore, action: IUpdateActionReducers) => void;
  },
  string,
  SliceSelectors<IAppStore>
>({
  initialState,
  name: "AppState",
  reducers: {
    updateAppStore: (state, action) => {
      switch (action.payload.type) {
        case "UPDATE_SELECTED_COUNTRY":
          state.country = action.payload.value;

          break;
        case "UPDATE_COORDINATES":
          state.lat = action.payload.value.lat;
          state.lon = action.payload.value.lon;
          break;
        default:
          break;
      }
    },
  },
});

export const { updateAppStore } = appStoreSlice.actions;
