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

const NewsCard = ({ id }: { id: number }) => {
	const [newsData, setNewsData] = useState<NewsCardData>();
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchItem(id)).unwrap().then(setNewsData);
	}, [dispatch, id]);

	const points =
		newsData?.score === 1
			? newsData.score + ' point'
			: newsData?.score + ' points';

	const time = newsData?.time ? moment.unix(newsData.time) : null;
	const convertedTime = moment(time, 'YYYYMMDD').fromNow();

	return (
		<Grid item xs={12} md={12}>
			<Card
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
							style={{ textDecoration: 'none', color: '#000' }}
							to={`${id}`}>
							{newsData?.title}
						</NavLink>
					</Typography>

					<Typography variant='body2'>{convertedTime}</Typography>

					<Box
						sx={{
							display: 'flex',
							justifyContent: 'space-between',
						}}>
						<Typography sx={{ mt: 2 }} variant='body2'>
							{points}
						</Typography>

						<Typography sx={{ mt: 2 }} variant='body2'>
							{'by ' + newsData?.by}
						</Typography>
					</Box>
				</CardContent>
			</Card>
		</Grid>
	);
};

export default NewsCard;
