import React from 'react';
import ReactDOM from 'react-dom';
import '../css/common.less';
import '../css/style.less';
import { Router, withRouter, IndexRoute, Link, Route, hashHistory } from 'react-router';
import Pubsub from 'pubsub-js';

var logo = require('../images/logo.png');

// 获取音乐列表信息
var audioData = require('../data/audioData.json');
audioData = (function getAudioURL(audioDataArr) {
	for(var i in audioDataArr) {
		var singleAudioData = audioDataArr[i];

		singleAudioData.audioURL = require('../audio/' + singleAudioData.filename);
		singleAudioData.coverURL = require('../images/' + singleAudioData.id + '.jpg');
	}
	return audioDataArr;
})(audioData);
var MusicID = 0;
let Music = audioData[MusicID];

// 音乐总时间
let duration = null;


let App = React.createClass({
	getInitialState: function() {
		return {
			musicList: audioData,
			Music: audioData[MusicID],
			repeatType: 'cycle'
		};
	},

	playMusic: function(Music) {
		$('#player').jPlayer('setMedia', {
			mp3: Music.audioURL
		}).jPlayer('play');

		this.setState({
			Music: Music
		});
	},
	playNext: function(type = 'next') {
		let musicListLength = this.state.musicList.length;
		let index = this.findMusicIndex(this.state.Music)
		if (type === 'next') {
			MusicID = (MusicID + 1) % musicListLength;
		} else {
			MusicID = (MusicID - 1 + musicListLength) % musicListLength;
		}

		this.playMusic(this.state.musicList[MusicID]);
	},
	playRepeat: function() {
		if (this.state.repeatType === 'random') {
			let index = this.findMusicIndex(this.state.Music);
			let randomIndex = this.randomRange(0, this.state.musicList.length - 1);
			while(randomIndex === index) {
				randomIndex = this.randomRange(0, this.state.musicList.length - 1);
			}
			this.playMusic(this.state.musicList[randomIndex]);
		} else if (this.state.repeatType === 'once') {
			this.playMusic(this.state.Music);
		} else {
			this.playNext();
		}
	},
	findMusicIndex: function() {
		let index = this.state.musicList.indexOf(MusicID);
		return Math.max(0, index);
	},
	randomRange: function(under, over) {
		return (Math.ceil(Math.random() * (over - under) + under));
	},

	componentDidMount: function() {
		$('#player').jPlayer({
			supplied: 'mp3',
			wmode: 'window'
		});

		this.playMusic(this.state.Music);

		$('#player').bind($.jPlayer.event.ended, (e) => {
			this.playRepeat();
		})

		Pubsub.subscribe('DELETE_MUSIC', (msg, Music) => {
			this.setState({
				musicList: this.state.musicList.filter(item => {
					return item !== Music;
				})
			});
		});
		Pubsub.subscribe('PLAY_MUSIC', (msg, Music) => {
			this.playMusic(Music);
		});
		Pubsub.subscribe('PLAY_PREV', (msg, Music) => {
			this.playNext('prev');
		});
		Pubsub.subscribe('PLAY_NEXT', (msg, Music) => {
			this.playNext();
		});
		let repeatList = ['cycle', 'once', 'random'];
		Pubsub.subscribe('CHANGE_REPEAT', () => {
			let index = repeatList.indexOf(this.state.repeatType);
			index = (index + 1) % repeatList.length;
			this.setState({
				repeatType: repeatList[index]
			});
		})
	},
	componentWillUnmount: function() {
		Pubsub.unsubscribe('PLAY_MUSIC');
		Pubsub.unsubscribe('DELETE_MUSIC');
		Pubsub.unsubscribe('PLAY_PREV');
		Pubsub.unsubscribe('PLAY_NEXT');
		Pubsub.unsubscribe('CHANGE_REPEAT');
		$('#player').unbind($.jPlayer.event.ended);
	},
	render: function() {
		return (
			<div>
				<Header />
				<div id="player"></div>
				{ React.cloneElement(this.props.children, this.state) }
			</div>
		);
	}

});
let Main = React.createClass({
	render: function() {
		return (
			<Router history={hashHistory}>
				<Route path="/" component={App}>
					<IndexRoute component={Player}></IndexRoute>
					<Route path="/list" component={MusicList}></Route>
				</Route>
			</Router>
		);
	}
});

// 头部信息
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

// 进度条
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

// 播放器页面
let Player = React.createClass({
	getInitialState: function() {
		return {
				progress: 0,
				volume: 0,
				isPlay: true,
				leftTime: ''
		};
	},

	playPrev: function() {
		Pubsub.publish('PLAY_PREV');
	},
	playNext: function() {
		Pubsub.publish('PLAY_NEXT');
	},
	changeRepeat: function() {
		Pubsub.publish('CHANGE_REPEAT');
	},

	formatTime: function(time) {
		time = Math.floor(time);
		let minutes = Math.floor(time / 60);
		let seconds = Math.floor(time % 60);

		seconds = seconds < 10 ? `0${seconds}` : seconds;
		return `${minutes}:${seconds}`;
	},

	componentDidMount: function() {
		$('#player').bind($.jPlayer.event.timeupdate, (e) => {
			duration = e.jPlayer.status.duration;
			this.setState({
				volume: e.jPlayer.options.volume * 100,
				progress: e.jPlayer.status.currentPercentAbsolute,
				leftTime: this.formatTime(duration * (1 - e.jPlayer.status.currentPercentAbsolute / 100))
			});
		});
	},

	componentWillUnmount: function() {
		$('#player').unbind($.jPlayer.event.timeupdate);
	},

	progressChangeHandler: function(progress) {
		$('#player').jPlayer('play', duration * progress);
		this.setState({
			isPlay: true
		});
	},

	changeVolumeHandler: function(progress) {
		$('#player').jPlayer('volume', progress)
	},

	play: function() {
		if (this.state.isPlay) {
			$('#player').jPlayer('pause');
		} else {
			$('#player').jPlayer('play');
		}

		this.setState({
			isPlay: !(this.state.isPlay)
		});
	},

	render: function() {
		return (
			<div className="player">
				<h1 className="caption"><Link to="/list">我的私人音乐坊 &gt;</Link></h1>
				<div className="mt20 row">
					<div className="controll-wrapper">
						<h2 className="music-title">{this.props.Music.title}</h2>
						<h3 className="music-artist mt10">{this.props.Music.singer}</h3>
						<div className="row mt20">
							<div className="left-time -col-auto">-{this.state.leftTime}</div>
							<div className="volume-container">
								<i className="icon-volume rt" style={{top: 5, left: -5}}></i>
								<div className="volume-wrapper">
									<Progress progress={this.state.volume} onProgressChange={this.changeVolumeHandler} barColor="#aaaaaa"/>
								</div>
							</div>
						</div>
						<div style={{height: 10, lineHeight: '10px'}}>
							<Progress progress={this.state.progress} onProgressChange={this.progressChangeHandler} />
						</div>
						<div className="mt35 row">
							<div>
								<i className="icon prev" onClick={this.playPrev}></i>
								<i className={`icon ml20 ${this.state.isPlay ? 'pause' : 'play'}`} onClick={this.play}></i>
								<i className="icon next ml20" onClick={this.playNext}></i>
							</div>
							<div className="-col-auto">
								<i className={`icon repeat-${this.props.repeatType}`} onClick={this.changeRepeat}></i>
							</div>
						</div>
					</div>
					<div className="-col-auto cover">
						<img src={this.props.Music.coverURL} alt={this.props.Music.title} />
					</div>
				</div>
			</div>
		);
	}
});

//音乐列表
let MusicList = React.createClass({
	render: function() {
		let listEle = null;
		listEle = this.props.musicList.map((item) => {
			return (
				<MusicListItem focus={item === this.props.Music} key={item.id} Music={item}>{item.title}</MusicListItem>
			);
		});
		return (
			<ul>{ listEle }</ul>
		)
	}
});

let MusicListItem = React.createClass({
	playMusic: function(Music, e) {
		Pubsub.publish('PLAY_MUSIC', Music);

		e.stopPropagation();
		e.preventDefault();
	},
	deleteMusic: function(Music, e) {
		Pubsub.publish('DELETE_MUSIC', Music);

		e.stopPropagation();
		e.preventDefault();
	},

	render: function() {
		let Music = this.props.Music;
		return (
			<li onClick={this.playMusic.bind(this, Music)} className={`musicListItem row ${this.props.focus ? ' focus' : ''}`}>
				<p><strong>{this.props.Music.title}</strong> - {this.props.Music.singer}</p>
				<p onClick={this.deleteMusic.bind(this, Music)} className="-col-auto delete"></p>
			</li>
		);
	}
})

ReactDOM.render(
	<Main />,
	document.getElementById('root')
);