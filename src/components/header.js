import React from 'react';
import './header.less';

let Header = React.createClass({
	render() {
		return (
			<div className="components-header row">
				<img src="../images/logo.png" width="40" alt="" className="-col-auto" />
				<h1 className="caption">MusicPlayer by React</h1>
			</div>
		);
	}
})

export default Header;