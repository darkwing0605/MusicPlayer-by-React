import '../css/header.less';

var logo = require('../images/logo.png');

// 获取音乐列表
var audioData = require('../data/audioData.json');
audioData = (function getAudioURL(audioDataArr) {
	for(var i in audioDataArr) {
		var singleAudioData = audioDataArr[i];

		singleAudioData.audioURL = require('../audio/' + singleAudioData.filename);
	}
	return audioDataArr;
})(audioData);

let Main = React.createClass({
	getInitialState: function(index) {
		var index = 0;
		return {
				audioNum: audioData.length,
				index: 0,
				progress: '-',
				audioURL: audioData[index].audioURL,
				title: '布谷鸟',
				singer: '不知道'
		};
	},
	updatePlayStatus: function() {
		let audio = document.getElementById('audio');
		if (this.state.playStatus) {
			audio.play();
		} else {
			audio.pause();
		}
	},
	play: function() {
		this.setState({playStatus: !this.state.playStatus}, () => {
			this.updatePlayStatus();
		});
	},
	render: function() {
		return (
			<div>
				<Header />
				<Controls isPlay={this.state.playStatus} onPlay={this.play} />
				<audio controls="controls" autoplay="autoplay" id="audio">
				 	<source src={this.state.audioURL} type="audio/mp3" />
				 	您的浏览器不支持 audio 标签。
				 </audio>
				 {this.state.audioNum}
			</div>
		);
	}
});

let Header = React.createClass({
	render: function() {
		return (
			<div className="header row">
				<img src={logo} alt="" className="logo" />
				<h1 className="caption">MusicPlayer by React</h1>
			</div>
		);
	}
});

// let Info = React.createClass({
// 	render: function() {
// 		return (
// 			<div>
// 				{audioData.title}
// 			</div>
// 		);
// 	}
// });
// console.log(this.state);
// debugger;

// let Progress = React.createClass({
// 	render: function() {
// 		return (
// 			<div className="progress">
// 				{this.state.progress}s
// 			</div>
// 		);
// 	}
// })

let Controls = React.createClass({
	render: function() {
		if (this.props.isPlay == true) {
			className = 'pause';
		} else {
			className = 'play';
		}
		return (
			<div className="controls">
				<div className="play" onclick={this.props.onplay}>
			</div>
		);
	}
})

ReactDOM.render(
	<Main />,
	document.getElementById('root')
);