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
let MusicID = 0;
let Music = audioData[MusicID];

// 音乐总时间
let duration = null;


let App = React.createClass({
	getInitialState: function() {
		return {
			musicList: audioData,
			Music: audioData[MusicID]
		};
	},
	playMusic: function(musicItem) {
		console.log(musicItem)
		$('#player').jPlayer('setMedia', {
			mp3: musicItem.title
		}).jPlayer('play');

		this.setState({
			Music: musicItem
		});
	},
	componentDidMount: function() {
		$('#player').jPlayer({
			// ready: function() {
			// 	$('#player').jPlayer('setMedia', {
			// 		mp3: Music.audioURL
			// 	}).jPlayer('play');
			// },
			supplied: 'mp3',
			wmode: 'window'
		});

		this.playMusic(this.state.currentMusicItem);

		Pubsub.subscribe('DELETE_MUSIC', (msg, musicItem) => {
			this.setState({
				musicList: this.state.musicList.filter(item => {
					return item !== musicItem;
				})
			});
		});
		Pubsub.subscribe('PLAY_MUSIC', (msg, musicItem) => {
			//
		})
	},
	componentWillUnmount: function() {
		Pubsub.unsubscribe('PLAY_MUSIC');
		Pubsub.unsubscribe('DELETE_MUSIC');
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
				isPlay: true
		};
	},

	componentDidMount: function() {
		$('#player').bind($.jPlayer.event.timeupdate, (e) => {
			duration = e.jPlayer.status.duration;
			this.setState({
				volume: e.jPlayer.options.volume * 100,
				progress: e.jPlayer.status.currentPercentAbsolute
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
							<div className="left-time -col-auto">-2:00</div>
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
								<i className="icon prev" onClick={this.prev}></i>
								<i className={`icon ml20 ${this.state.isPlay ? 'pause' : 'play'}`} onClick={this.play}></i>
								<i className="icon next ml20" onClick={this.next}></i>
							</div>
							<div className="-col-auto">
								<i className="icon repeat-cycle"></i>
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
				<MusicListItem focus={item === this.props.Music} key={item.id} musicItem={item}>{item.title}</MusicListItem>
			);
		});
		return (
			<ul>{ listEle }</ul>
		)
	}
});

let MusicListItem = React.createClass({
	playMusic: function(musicItem, e) {
		Pubsub.publish('PLAY_MUSIC', musicItem);

		e.stopPropagation();
		e.preventDefault();
	},
	deleteMusic: function(musicItem, e) {
		Pubsub.publish('DELETE_MUSIC', musicItem);

		e.stopPropagation();
		e.preventDefault();
	},

	render: function() {
		let musicItem = this.props.musicItem;
		return (
			<li onClick={this.playMusic.bind(this, musicItem)} className={`musicListItem row ${this.props.focus ? ' focus' : ''}`}>
				<p><strong>{this.props.musicItem.title}</strong> - {this.props.musicItem.singer}</p>
				<p onClick={this.deleteMusic.bind(this, musicItem)} className="-col-auto delete"></p>
			</li>
		);
	}
})

ReactDOM.render(
	<Main />,
	document.getElementById('root')
);