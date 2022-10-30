import ReactDOM from 'react-dom/client';
import App from './components/App/App';
import { store } from './core/store';
import { Provider } from 'react-redux';

import './style/style.scss';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(
	<Provider store={store}>
		<App />
	</Provider>
);
