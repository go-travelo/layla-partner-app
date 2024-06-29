import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store/store';
import { getLocalStorageItem, setLocalStorageItem } from '../services/localStorageService';

interface SettingsState {
  partnerApiKey: string;
  baseApiUrl: string;
}

const initialState: SettingsState = {
  partnerApiKey: getLocalStorageItem('partnerApiKey', '<PARTNER_API_ACCESS_KEY>'),
  baseApiUrl: getLocalStorageItem('baseApiUrl', 'https://bd-api.dev.beautifuldestinations.app'),
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setPartnerApiKey(state, action: PayloadAction<string>) {
      state.partnerApiKey = action.payload;
      setLocalStorageItem('partnerApiKey', state.partnerApiKey);
    },
    setBaseApiUrl(state, action: PayloadAction<string>) {
      state.baseApiUrl = action.payload;
      setLocalStorageItem('baseApiUrl', state.baseApiUrl);
    },
  },
});

export const {
  setPartnerApiKey,
  setBaseApiUrl,
} = settingsSlice.actions;

export const selectPartnerApiKey = (state: RootState) => state.settings.partnerApiKey;
export const selectBaseApiUrl = (state: RootState) => state.settings.baseApiUrl;

export default settingsSlice.reducer;
