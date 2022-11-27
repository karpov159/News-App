import { BrowserRouter as Router } from 'react-router-dom';
import Container from '@mui/material/Container';
import Routes from '../../core/routes/Routes';

const App = () => {
	return (
		<Router>
			<div className='App'>
				<Container
					sx={{
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
