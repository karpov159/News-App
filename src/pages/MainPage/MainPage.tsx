import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { store, useAppDispatch, useAppSelector } from '../../core/store';
import { selectAll } from '../../core/store/NewsSlice';
import { fetchNews } from '../../core/store/NewsSlice';
import Spinner from '../../components/Spinner/Spinner';
import MainContent from '../../components/MainContent/MainContent';
import Header from '../../components/Header/Header';

const NewsPage = () => {
	const dispatch = useAppDispatch();
	const allNews = selectAll(store.getState());
	const newsLoadingStatus = useAppSelector(
		(state) => state.news.newsLoadingStatus
	);

	const { ref, inView } = useInView();

	const [currentPage, setCurrentPage] = useState<number>(0);

	const newsToShow: number = 10;

	useEffect(() => {
		if (inView) {
			setCurrentPage((currentPage) => currentPage + 1);
		}
	}, [inView]);

	useEffect(() => {
		dispatch(fetchNews());
	}, [dispatch]);

	console.log(currentPage);

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
			<MainContent allNews={allNews.slice(0, newsToShow * currentPage)} />
		) : null;

	return (
		<>
			<Header isRefreshButton={true} />

			{spinner}

			{content}

			<div
				style={{
					height: '20px',
					width: '100%',
				}}
				ref={ref}></div>
		</>
	);
};

export default NewsPage;
