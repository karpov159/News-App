import { MAIN } from '../../core/config/RoutesConfig';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const Header = () => {
	return (
		<AppBar position='static' sx={{ backgroundColor: '#c5c0c0' }}>
			<Toolbar>
				<Box
					sx={{
						flexGrow: 1,
						padding: '0 30px',
					}}>
					<Button
						component='a'
						href={MAIN}
						sx={{ ml: 3 }}
						color='inherit'>
						На главную
					</Button>
				</Box>
			</Toolbar>
		</AppBar>
	);
};

export default Header;
