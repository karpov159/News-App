import { useEffect } from 'react';
import { store, useAppDispatch, useAppSelector } from '../../core/store';
import { selectAll } from '../../core/store/NewsSlice';
import { fetchNews } from '../../core/store/NewsSlice';
import Spinner from '../../components/Spinner/Spinner';
import MainContent from '../../components/MainContent/MainContent';

const NewsPage = () => {
	const dispatch = useAppDispatch();
	const allNews = selectAll(store.getState());
	const newsLoadingStatus = useAppSelector(
		(state) => state.news.newsLoadingStatus
	);
	const newsToShow = 100;

	useEffect(() => {
		dispatch(fetchNews());
	}, [dispatch]);

	useEffect(() => {
		const refreshPage = setInterval(() => {
			dispatch(fetchNews());
		}, 60000);

		return () => {
			clearInterval(refreshPage);
		};
	}, [dispatch]);

	const spinner = newsLoadingStatus === 'loading' ? <Spinner /> : null;

	const content =
		newsLoadingStatus === 'idle' ? (
			<MainContent allNews={allNews.splice(0, newsToShow)} />
		) : null;

	return (
		<>
			{spinner}

			{content}
		</>
	);
};

export default NewsPage;
