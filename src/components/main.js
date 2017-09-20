import '../css/common.less';

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

// 音乐总时间
let duration = null;

let Main = React.createClass({
	getInitialState: function() {
		return {
				progress: '-',
		};
	},
	componentDidMount: function() {
		$('#player').jPlayer({
			ready: function() {
				$('#player').jPlayer('setMedia', {
					mp3: audioData[0].audioURL
				}).jPlayer('play');
			},
			supplied: 'mp3',
			wmode: 'window'
		});
		$('#player').bind($.jPlayer.event.timeupdate, (e) => {
			duration = e.jPlayer.status.duration;
			this.setState({
				progress: e.jPlayer.status.currentPercentAbsolute
			});
		});
	},
	componentWillUnmount: function() {
		$('#player').unbind($.jPlayer.event.timeupdate);
	},
	progressChangeHandler: function(progress) {
		$('#player').jPlayer('play', duration * progress);
	},
	render: function() {
		return (
			<div>
				<Header />
				<div id="player"></div>
				<Progress progress={this.state.progress} onProgressChange={this.progressChangeHandler} barColor="#ff0000"/>
			</div>
		);
	}
});
debugger

let Header = React.createClass({
	render: function() {
		return (
			<div className="header">
				<img src={logo} alt="" className="logo" />
				<h1 className="caption">MusicPlayer by React</h1>
			</div>
		);
	}
});

let Progress = React.createClass({
	getDefaultProps() {
		return {
			barColor: '#2f9842'
		}
	},

	changeProgress: function(e) {
		let progressBar = this.refs.progressBar;
		let progress = (e.clientX - progressBar.getBoundingClientRect().left) / progressBar.clientWidth;
		this.props.onProgressChange && this.props.onProgressChange(progress);
	},

	render: function() {
		return (
			<div className="progress" ref="progressBar" onClick={this.changeProgress}>
				<div className="progressHover" style={{width: `${this.props.progress}%`, background: this.props.barColor}}></div>
			</div>
		);
	}
})

ReactDOM.render(
	<Main />,
	document.getElementById('root')
);