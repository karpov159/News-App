import { useState, useEffect } from 'react';
import { useAppDispatch } from '../../core/store';
import { fetchItem } from '../../core/store/NewsSlice';
import { NavLink } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import moment from 'moment';
import NewsCardData from '../../shared/interfaces/NewsCardData';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack/Stack';

const NewsCard = ({ id }: { id: number }) => {
	const [newsData, setNewsData] = useState<NewsCardData>();
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchItem(id))
			.unwrap()
			.then((res) => setNewsData(res));
	}, [dispatch, id]);

	const points =
		newsData?.score === 1
			? newsData.score + ' point'
			: newsData?.score + ' points';

	const comments = newsData?.kids
		? newsData.kids.length === 1
			? '1 comment'
			: newsData.kids.length + ' comments'
		: '0 comments';

	const time = newsData?.time ? moment.unix(newsData.time) : null;
	const convertedTime = moment(time, 'YYYYMMDD').fromNow();

	return (
		<Grid item xs={12} md={12}>
			{newsData ? (
				<Card
					elevation={3}
					sx={{
						minWidth: '100%',
						minHeight: '100px',
					}}>
					<CardContent
						sx={{
							display: 'flex',
							justifyContent: 'space-between',
							flexDirection: 'column',
							minHeight: '100px',
						}}>
						<Typography
							sx={{ cursor: 'pointer' }}
							variant='h6'
							component='div'>
							<NavLink
								target='_blank'
								style={{
									textDecoration: 'none',
									color: '#000',
								}}
								to={`${id}`}>
								{newsData?.title}
							</NavLink>
						</Typography>

						<Typography variant='body2'>{convertedTime}</Typography>

						<Typography sx={{ mt: 2 }} variant='body2'>
							{points}
						</Typography>
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'space-between',
							}}>
							<Typography sx={{ mt: 2 }} variant='body2'>
								{comments}
							</Typography>

							<Typography sx={{ mt: 2 }} variant='body2'>
								{'by ' + newsData?.by}
							</Typography>
						</Box>
					</CardContent>
				</Card>
			) : (
				<Skeleton width='100%' variant='rounded' height={164} />
			)}
		</Grid>
	);
};

export default NewsCard;
