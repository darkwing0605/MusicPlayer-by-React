/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(1);

var logo = __webpack_require__(6);

// 获取音乐列表
var audioData = __webpack_require__(7);
audioData = function getAudioURL(audioDataArr) {
	for (var i in audioDataArr) {
		var singleAudioData = audioDataArr[i];

		singleAudioData.audioURL = __webpack_require__(8)("./" + singleAudioData.filename);
	}
	return audioDataArr;
}(audioData);

// 音乐总时间
var duration = null;

var Main = React.createClass({
	displayName: 'Main',

	getInitialState: function getInitialState() {
		return {
			progress: '-'
		};
	},
	componentDidMount: function componentDidMount() {
		var _this = this;

		$('#player').jPlayer({
			ready: function ready() {
				$('#player').jPlayer('setMedia', {
					mp3: audioData[0].audioURL
				}).jPlayer('play');
			},
			supplied: 'mp3',
			wmode: 'window'
		});
		$('#player').bind($.jPlayer.event.timeupdate, function (e) {
			duration = e.jPlayer.status.duration;
			_this.setState({
				progress: e.jPlayer.status.currentPercentAbsolute
			});
		});
	},
	componentWillUnmount: function componentWillUnmount() {
		$('#player').unbind($.jPlayer.event.timeupdate);
	},
	progressChangeHandler: function progressChangeHandler(progress) {
		$('#player').jPlayer('play', duration * progress);
	},
	render: function render() {
		return React.createElement(
			'div',
			null,
			React.createElement(Header, null),
			React.createElement('div', { id: 'player' }),
			React.createElement(Progress, { progress: this.state.progress, onProgressChange: this.progressChangeHandler, barColor: '#ff0000' })
		);
	}
});
debugger;

var Header = React.createClass({
	displayName: 'Header',

	render: function render() {
		return React.createElement(
			'div',
			{ className: 'header' },
			React.createElement('img', { src: logo, alt: '', className: 'logo' }),
			React.createElement(
				'h1',
				{ className: 'caption' },
				'MusicPlayer by React'
			)
		);
	}
});

var Progress = React.createClass({
	displayName: 'Progress',
	getDefaultProps: function getDefaultProps() {
		return {
			barColor: '#2f9842'
		};
	},


	changeProgress: function changeProgress(e) {
		var progressBar = this.refs.progressBar;
		var progress = (e.clientX - progressBar.getBoundingClientRect().left) / progressBar.clientWidth;
		this.props.onProgressChange && this.props.onProgressChange(progress);
	},

	render: function render() {
		return React.createElement(
			'div',
			{ className: 'progress', ref: 'progressBar', onClick: this.changeProgress },
			React.createElement('div', { className: 'progressHover', style: { width: this.props.progress + '%', background: this.props.barColor } })
		);
	}
});

ReactDOM.render(React.createElement(Main, null), document.getElementById('root'));

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(2);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(4)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/postcss-loader/lib/index.js!../../node_modules/less-loader/dist/cjs.js!./common.less", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/postcss-loader/lib/index.js!../../node_modules/less-loader/dist/cjs.js!./common.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(undefined);
// imports


// module
exports.push([module.i, ".header {\n  padding: 15px 25px;\n  border-bottom: 1px solid #cccccc;\n  background: #ffffff;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n}\n.header .logo {\n  width: 40px;\n  vertical-align: middle;\n}\n.header .caption {\n  font-size: 20px;\n  text-indent: 20px;\n  display: inline-block;\n}\n.progress {\n  width: 100%;\n  height: 3px;\n  margin-top: 20px;\n  background: #dddddd;\n  cursor: pointer;\n}\n.progress .progressHover {\n  width: 20%;\n  height: 3px;\n}\n", ""]);

// exports


/***/ }),
/* 3 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(5);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 5 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = [{"filename":"布谷鸟.mp3","title":"布谷鸟","singer":"不知道"}]

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./布谷鸟.mp3": 9,
	"./布谷鸟2.mp3": 10
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 8;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "audio/布谷鸟-76ee6.mp3";

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "audio/布谷鸟2-76ee6.mp3";

/***/ })
/******/ ]);