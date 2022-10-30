import { BrowserRouter as Router } from 'react-router-dom';
import Container from '@mui/material/Container';
import Routes from '../../core/routes/Routes';
import Header from '../Header/Header';

const App = () => {
	return (
		<Router>
			<div className='App'>
				<Header />
				<Container
					sx={{
						mt: 2,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}>
					<Routes />
				</Container>
			</div>
		</Router>
	);
};

export default App;
