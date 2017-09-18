import Main from './main.js';

ReactDOM.render(
	<AppContainer>
		<Main />
	</AppContainer>,
	document.getElementById('main')
);

// if (module.hot) {
// 	module.hot.accept('./main', () => {
// 		const NewMain = require('./main').default;
// 		ReactDOM.render(
// 			<AppContainer>
// 				<NewMain />
// 			</AppContainer>,
// 			document.getElementById('main')
// 		);
// 	});
// }