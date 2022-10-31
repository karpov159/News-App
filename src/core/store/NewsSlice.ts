import {
	createSlice,
	createEntityAdapter,
	createAsyncThunk,
	EntityState,
	PayloadAction,
} from '@reduxjs/toolkit';
import { RootState } from '.';
import httpRequest from '../../services/httpRequest';
import NewsCardData from '../../shared/interfaces/NewsCardData';

interface NewsSliceState {
	newsLoadingStatus: string;
	NewsPageData: NewsCardData | null;
}

const BASE_URL = process.env.REACT_APP_BASE_URL;

const newsAdapter = createEntityAdapter({
	selectId: (news: number) => news,
});

const initialState: EntityState<number> & NewsSliceState =
	newsAdapter.getInitialState({
		newsLoadingStatus: 'idle',
		NewsPageData: null,
	});

export const fetchNews = createAsyncThunk('news/fetchNews', async () => {
	const url = `${BASE_URL}/newstories.json?print=pretty`;

	const res = await httpRequest(url);

	return res;
});

export const fetchItem = createAsyncThunk(
	'news/fetchOneNews',
	async (id: number | string) => {
		const res = await httpRequest(
			`${BASE_URL}/item/${id}.json?print=pretty`
		);

		return res;
	}
);

const newsSlice = createSlice({
	name: 'news',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchNews.pending, (state) => {
				state.newsLoadingStatus = 'loading';
			})
			.addCase(
				fetchNews.fulfilled,
				(state, action: PayloadAction<number[]>) => {
					newsAdapter.setAll(state, action.payload);
					state.newsLoadingStatus = 'idle';
				}
			)
			.addCase(fetchNews.rejected, (state) => {
				state.newsLoadingStatus = 'error';
			})
			.addDefaultCase(() => {});
	},
});

const { reducer } = newsSlice;

export const { selectAll } = newsAdapter.getSelectors<RootState>(
	(state) => state.news
);

export default reducer;
