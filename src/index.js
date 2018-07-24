import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './Form/Form.css';
import registerServiceWorker from './registerServiceWorker';
import Form from './Form/Form';

ReactDOM.render(<Form />, document.getElementById('root'));
registerServiceWorker();
