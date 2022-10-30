import { useAppDispatch } from '../../core/store';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchItem } from '../../core/store/NewsSlice';
import { Helmet } from 'react-helmet';
import NewsCardData from '../../shared/interfaces/NewsCardData';
import Spinner from '../../components/Spinner/Spinner';
import NewsContent from '../../components/NewsContent/NewsContent';

const NewsPage = () => {
	const [newsData, setNewsData] = useState<NewsCardData>();
	const [isLoading, setLoading] = useState(false);
	const dispatch = useAppDispatch();
	const { newsId } = useParams();

	useEffect(() => {
		if (newsId) {
			dispatch(fetchItem(newsId)).unwrap().then(setNewsData);
		}
	}, [dispatch, newsId]);

	const onClick = () => {
		setLoading(true);

		if (newsId) {
			dispatch(fetchItem(newsId))
				.unwrap()
				.then((results) => {
					setNewsData(results);
					setLoading(false);
				});
		}
	};

	const content =
		newsData && !isLoading ? (
			<NewsContent {...newsData} onReload={onClick} />
		) : (
			<Spinner />
		);

	return (
		<>
			<Helmet>
				<title>{newsData?.title}</title>
			</Helmet>

			{content}
		</>
	);
};

export default NewsPage;
