import { MAIN } from '../../core/config/RoutesConfig';
import { useAppDispatch } from '../../core/store';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { fetchNews } from '../../core/store/NewsSlice';

interface HeaderData {
	isRefreshButton: boolean;
}

const Header = ({ isRefreshButton }: HeaderData) => {
	const dispatch = useAppDispatch();

	const onClick = () => {
		dispatch(fetchNews());
	};

	const refreshButton = isRefreshButton ? (
		<Button onClick={onClick} variant='text' size='large' color='inherit'>
			Обновить
		</Button>
	) : null;

	return (
		<AppBar position='static' sx={{ backgroundColor: '#2191ca' }}>
			<Toolbar>
				<Box
					sx={{
						flexGrow: 1,
						display: 'flex',
						justifyContent: 'space-between',
					}}>
					<Button component='a' href={MAIN} color='inherit'>
						На главную
					</Button>

					{refreshButton}
				</Box>
			</Toolbar>
		</AppBar>
	);
};

export default Header;
