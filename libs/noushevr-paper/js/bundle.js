/*jslint browser: true */
/*jslint node: true */
/*global ActiveXObject, Cookies, doesFontExist, IframeLightbox, imgLightbox,
imagePromise, Kamil, loadJsCss, Promise, QRCode, require, Tablesort,
ToProgress, unescape, verge, VK, Ya*/
/*property console, join, split */
/*!
 * safe way to handle console.log
 * @see {@link https://github.com/paulmillr/console-polyfill}
 */
(function(root){
	"use strict";
	if (!root.console) {
		root.console = {};
	}
	var con = root.console;
	var prop;
	var method;
	var dummy = function () {};
	var properties = ["memory"];
	var methods = ["assert,clear,count,debug,dir,dirxml,error,exception,group,",
		"groupCollapsed,groupEnd,info,log,markTimeline,profile,profiles,profileEnd,",
		"show,table,time,timeEnd,timeline,timelineEnd,timeStamp,trace,warn"];
	methods.join("").split(",");
	for (; (prop = properties.pop()); ) {
		if (!con[prop]) {
			con[prop] = {};
		}
	}
	for (; (method = methods.pop()); ) {
		if (!con[method]) {
			con[method] = dummy;
		}
	}
	prop = method = dummy = properties = methods = null;
})("undefined" !== typeof window ? window : this);
/*!
 * modified ToProgress v0.1.1
 * arguments.callee changed to TP, a local wrapper function,
 * so that public function name is now customizable;
 * wrapped in curly brackets:
 * else{document.body.appendChild(this.progressBar);};
 * removed module check
 * @see {@link http://github.com/djyde/ToProgress}
 * @see {@link https://github.com/djyde/ToProgress/blob/master/ToProgress.js}
 * @see {@link https://gist.github.com/englishextra/6a8c79c9efbf1f2f50523d46a918b785}
 * @see {@link https://jsfiddle.net/englishextra/z5xhjde8/}
 * passes jshint
 */
(function (root, document, undefined) {
	"use strict";
	var ToProgress = (function () {
		var TP = function () {
			var _addEventListener = "addEventListener";
			var appendChild = "appendChild";
			var createElement = "createElement";
			var firstChild = "firstChild";
			var getElementById = "getElementById";
			var getElementsByClassName = "getElementsByClassName";
			var hasOwnProperty = "hasOwnProperty";
			var opacity = "opacity";
			var prototype = "prototype";
			var _removeEventListener = "removeEventListener";
			var style = "style";
			function whichTransitionEvent() {
				var t,
				el = document[createElement]("fakeelement");
				var transitions = {
					"transition": "transitionend",
					"OTransition": "oTransitionEnd",
					"MozTransition": "transitionend",
					"WebkitTransition": "webkitTransitionEnd"
				};
				for (t in transitions) {
					if (transitions[hasOwnProperty](t)) {
						if (el[style][t] !== undefined) {
							return transitions[t];
						}
					}
				}
				t = null;
			}
			var transitionEvent = whichTransitionEvent();
			function ToProgress(opt, selector) {
				this.progress = 0;
				this.options = {
					id: "top-progress-bar",
					color: "#F44336",
					height: "2px",
					duration: 0.2,
					zIndex: "auto"
				};
				if (opt && typeof opt === "object") {
					var key;
					for (key in opt) {
						if (opt[hasOwnProperty](key)) {
							this.options[key] = opt[key];
						}
					}
					key = null;
				}
				this.options.opacityDuration = this.options.duration * 3;
				this.progressBar = document[createElement]("div");
				this.progressBar.id = this.options.id;
				this.progressBar.setCSS = function (style) {
					var property;
					for (property in style) {
						if (style[hasOwnProperty](property)) {
							this.style[property] = style[property];
						}
					}
					property = null;
				};
				this.progressBar.setCSS({
					"position": selector ? "relative" : "fixed",
					"top": "0",
					"left": "0",
					"right": "0",
					"background-color": this.options.color,
					"height": this.options.height,
					"width": "0%",
					"transition": "width " + this.options.duration + "s" + ", opacity " + this.options.opacityDuration + "s",
					"-moz-transition": "width " + this.options.duration + "s" + ", opacity " + this.options.opacityDuration + "s",
					"-webkit-transition": "width " + this.options.duration + "s" + ", opacity " + this.options.opacityDuration + "s",
					"z-index": this.options.zIndex
				});
				if (selector) {
					var el;
					if (selector.indexOf("#", 0) !== -1) {
						el = document[getElementById](selector) || "";
					} else {
						if (selector.indexOf(".", 0) !== -1) {
							el = document[getElementsByClassName](selector)[0] || "";
						}
					}
					if (el) {
						if (el.hasChildNodes()) {
							el.insertBefore(this.progressBar, el[firstChild]);
						} else {
							el[appendChild](this.progressBar);
						}
					}
				} else {
					document.body[appendChild](this.progressBar);
				}
			}
			ToProgress[prototype].transit = function () {
				this.progressBar[style].width = this.progress + "%";
			};
			ToProgress[prototype].getProgress = function () {
				return this.progress;
			};
			ToProgress[prototype].setProgress = function (progress, callback) {
				this.show();
				if (progress > 100) {
					this.progress = 100;
				} else if (progress < 0) {
					this.progress = 0;
				} else {
					this.progress = progress;
				}
				this.transit();
				if (callback) {
					callback();
				}
			};
			ToProgress[prototype].increase = function (toBeIncreasedProgress, callback) {
				this.show();
				this.setProgress(this.progress + toBeIncreasedProgress, callback);
			};
			ToProgress[prototype].decrease = function (toBeDecreasedProgress, callback) {
				this.show();
				this.setProgress(this.progress - toBeDecreasedProgress, callback);
			};
			ToProgress[prototype].finish = function (callback) {
				var that = this;
				this.setProgress(100, callback);
				this.hide();
				if (transitionEvent) {
					this.progressBar[_addEventListener](transitionEvent, function (e) {
						that.reset();
						that.progressBar[_removeEventListener](e.type, TP);
					});
				}
			};
			ToProgress[prototype].reset = function (callback) {
				this.progress = 0;
				this.transit();
				if (callback) {
					callback();
				}
			};
			ToProgress[prototype].hide = function () {
				this.progressBar[style][opacity] = "0";
			};
			ToProgress[prototype].show = function () {
				this.progressBar[style][opacity] = "1";
			};
			return ToProgress;
		};
		return TP();
	})();
	root.ToProgress = ToProgress;
})("undefined" !== typeof window ? window : this, document);
/*!
 * return image is loaded promise
 * @see {@link https://jsfiddle.net/englishextra/56pavv7d/}
 * @param {String|Object} s image path string or HTML DOM Image Object
 * var m = document.querySelector("img") || "";
 * var s = m.src || "";
 * imagePromise(m).then(function (r) {
 * alert(r);
 * }).catch (function (err) {
 * alert(err);
 * });
 * imagePromise(s).then(function (r) {
 * alert(r);
 * }).catch (function (err) {
 * alert(err);
 * });
 * @see {@link https://gist.github.com/englishextra/3e95d301d1d47fe6e26e3be198f0675e}
 * passes jshint
 */
(function (root) {
	"use strict";
	var imagePromise = function (s) {
		if (root.Promise) {
			return new Promise(function (y, n) {
				var f = function (e, p) {
					e.onload = function () {
						y(p);
					};
					e.onerror = function () {
						n(p);
					};
					e.src = p;
				};
				if ("string" === typeof s) {
					var a = new Image();
					f(a, s);
				} else {
					if ("img" !== s.tagName) {
						return Promise.reject();
					} else {
						if (s.src) {
							f(s, s.src);
						}
					}
				}
			});
		} else {
			throw new Error("Promise is not in global object");
		}
	};
	root.imagePromise = imagePromise;
})("undefined" !== typeof window ? window : this);
/*!
 * modified Detect Whether a Font is Installed
 * @param {String} fontName The name of the font to check
 * @return {Boolean}
 * @author Kirupa <sam@samclarke.com>
 * @see {@link https://www.kirupa.com/html5/detect_whether_font_is_installed.htm}
 * passes jshint
 */
(function (root, document) {
	"use strict";
	var doesFontExist = function (fontName) {
		var createElement = "createElement";
		var getContext = "getContext";
		var measureText = "measureText";
		var width = "width";
		var canvas = document[createElement]("canvas");
		var context = canvas[getContext]("2d");
		var text = "abcdefghijklmnopqrstuvwxyz0123456789";
		context.font = "72px monospace";
		var baselineSize = context[measureText](text)[width];
		context.font = "72px '" + fontName + "', monospace";
		var newSize = context[measureText](text)[width];
		canvas = null;
		if (newSize === baselineSize) {
			return false;
		} else {
			return true;
		}
	};
	root.doesFontExist = doesFontExist;
})("undefined" !== typeof window ? window : this, document);
/*!
 * modified loadExt
 * @see {@link https://gist.github.com/englishextra/ff9dc7ab002312568742861cb80865c9}
 * passes jshint
 */
(function (root, document) {
	"use strict";
	var loadJsCss = function (files, callback, type) {
		var _this = this;
		var appendChild = "appendChild";
		var body = "body";
		var createElement = "createElement";
		var getElementsByTagName = "getElementsByTagName";
		var setAttribute = "setAttribute";
		var _length = "length";
		_this.files = files;
		_this.js = [];
		_this.head = document[getElementsByTagName]("head")[0] || "";
		_this.body = document[body] || "";
		_this.ref = document[getElementsByTagName]("script")[0] || "";
		_this.callback = callback || function () {};
		_this.type = type ? type.toLowerCase() : "";
		_this.loadStyle = function (file) {
			var link = document[createElement]("link");
			link.rel = "stylesheet";
			link.type = "text/css";
			link.href = file;
			link.media = "only x";
			link.onload = function () {
				this.onload = null;
				this.media = "all";
			};
			link[setAttribute]("property", "stylesheet");
			/* _this.head[appendChild](link); */
			(_this.body || _this.head)[appendChild](link);
		};
		_this.loadScript = function (i) {
			var script = document[createElement]("script");
			script.type = "text/javascript";
			script.async = true;
			script.src = _this.js[i];
			var loadNextScript = function () {
				if (++i < _this.js[_length]) {
					_this.loadScript(i);
				} else {
					_this.callback();
				}
			};
			script.onload = function () {
				loadNextScript();
			};
			_this.head[appendChild](script);
			/* if (_this.ref[parentNode]) {
				_this.ref[parentNode][insertBefore](script, _this.ref);
			} else {
				(_this.body || _this.head)[appendChild](script);
			} */
			(_this.body || _this.head)[appendChild](script);
		};
		var i,
		l;
		for (i = 0, l = _this.files[_length]; i < l; i += 1) {
			if ((/\.js$|\.js\?/).test(_this.files[i]) || _this.type === "js") {
				_this.js.push(_this.files[i]);
			}
			if ((/\.css$|\.css\?|\/css\?/).test(_this.files[i]) || _this.type === "css") {
				_this.loadStyle(_this.files[i]);
			}
		}
		i = l = null;
		if (_this.js[_length] > 0) {
			_this.loadScript(0);
		} else {
			_this.callback();
		}
	};
	root.loadJsCss = loadJsCss;
})("undefined" !== typeof window ? window : this, document);
/*!
 * app logic
 */
(function (root, document) {
	"use strict";

	var docElem = document.documentElement || "";
	var docImplem = document.implementation || "";
	var docBody = document.body || "";

	var classList = "classList";
	var createElement = "createElement";
	var createElementNS = "createElementNS";
	var defineProperty = "defineProperty";
	var getOwnPropertyDescriptor = "getOwnPropertyDescriptor";
	var querySelector = "querySelector";
	var querySelectorAll = "querySelectorAll";
	var _addEventListener = "addEventListener";
	var _length = "length";

	var progressBar = new ToProgress({
			id: "top-progress-bar",
			color: "#EB421C",
			height: "0.200rem",
			duration: 0.2,
			zIndex: 999
		});

	var hideProgressBar = function () {
		progressBar.finish();
		progressBar.hide();
	};

	progressBar.increase(20);

	var toStringFn = {}.toString;
	var supportsSvgSmilAnimation = !!document[createElementNS] && (/SVGAnimate/).test(toStringFn.call(document[createElementNS]("http://www.w3.org/2000/svg", "animate"))) || "";

	if (supportsSvgSmilAnimation && docElem) {
		docElem[classList].add("svganimate");
	}

	var getHTTP = function(force) {
		var any = force || "";
		var locationProtocol = root.location.protocol || "";
		return "http:" === locationProtocol ? "http" : "https:" === locationProtocol ? "https" : any ? "http" : "";
	};

	var forcedHTTP = getHTTP(true);

	var supportsCanvas;
	supportsCanvas = (function () {
		var elem = document[createElement]("canvas");
		return !!(elem.getContext && elem.getContext("2d"));
	})();

	var run = function () {

		var appendChild = "appendChild";
		var createDocumentFragment = "createDocumentFragment";
		var createRange = "createRange";
		var createTextNode = "createTextNode";
		var dataset = "dataset";
		var getAttribute = "getAttribute";
		var getElementById = "getElementById";
		var getElementsByClassName = "getElementsByClassName";
		var getElementsByTagName = "getElementsByTagName";
		var parentNode = "parentNode";
		var remove = "remove";
		var removeChild = "removeChild";
		var setAttribute = "setAttribute";
		var style = "style";
		var title = "title";
		var _removeEventListener = "removeEventListener";

		progressBar.increase(20);

		if (docElem && docElem[classList]) {
			docElem[classList].remove("no-js");
			docElem[classList].add("js");
		}

		var earlyDeviceFormfactor = (function (selectors) {
			var orientation;
			var size;
			var f = function (a) {
				var b = a.split(" ");
				if (selectors) {
					var c;
					for (c = 0; c < b[_length]; c += 1) {
						a = b[c];
						selectors.add(a);
					}
					c = null;
				}
			};
			var g = function (a) {
				var b = a.split(" ");
				if (selectors) {
					var c;
					for (c = 0; c < b[_length]; c += 1) {
						a = b[c];
						selectors.remove(a);
					}
					c = null;
				}
			};
			var h = {
				landscape: "all and (orientation:landscape)",
				portrait: "all and (orientation:portrait)"
			};
			var k = {
				small: "all and (max-width:768px)",
				medium: "all and (min-width:768px) and (max-width:991px)",
				large: "all and (min-width:992px)"
			};
			var d;
			var matchMedia = "matchMedia";
			var matches = "matches";
			var o = function (a, b) {
				var c = function (a) {
					if (a[matches]) {
						f(b);
						orientation = b;
					} else {
						g(b);
					}
				};
				c(a);
				a.addListener(c);
			};
			var s = function (a, b) {
				var c = function (a) {
					if (a[matches]) {
						f(b);
						size = b;
					} else {
						g(b);
					}
				};
				c(a);
				a.addListener(c);
			};
			for (d in h) {
				if (h.hasOwnProperty(d)) {
					o(root[matchMedia](h[d]), d);
				}
			}
			for (d in k) {
				if (k.hasOwnProperty(d)) {
					s(root[matchMedia](k[d]), d);
				}
			}
			return {
				orientation: orientation || "",
				size: size || ""
			};
		})(docElem[classList] || "");

		var earlyDeviceType = (function (mobile, desktop, opera) {
			var selector = (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i).test(opera) || (/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i).test(opera.substr(0, 4)) ? mobile : desktop;
			docElem[classList].add(selector);
			return selector;
		})("mobile", "desktop", navigator.userAgent || navigator.vendor || (root).opera);

		var earlySvgSupport = (function (selector) {
			selector = docImplem.hasFeature("http://www.w3.org/2000/svg", "1.1") ? selector : "no-" + selector;
			docElem[classList].add(selector);
			return selector;
		})("svg");

		var earlySvgasimgSupport = (function (selector) {
			selector = docImplem.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1") ? selector : "no-" + selector;
			docElem[classList].add(selector);
			return selector;
		})("svgasimg");

		var earlyHasTouch = (function (selector) {
			selector = "ontouchstart" in docElem ? selector : "no-" + selector;
			docElem[classList].add(selector);
			return selector;
		})("touch");

		var getHumanDate = (function () {
			var newDate = (new Date());
			var newDay = newDate.getDate();
			var newYear = newDate.getFullYear();
			var newMonth = newDate.getMonth();
			(newMonth += 1);
			if (10 > newDay) {
				newDay = "0" + newDay;
			}
			if (10 > newMonth) {
				newMonth = "0" + newMonth;
			}
			return newYear + "-" + newMonth + "-" + newDay;
		})();

		var userBrowsingDetails = " [" + (getHumanDate ? getHumanDate : "") + (earlyDeviceType ? " " + earlyDeviceType : "") + (earlyDeviceFormfactor.orientation ? " " + earlyDeviceFormfactor.orientation : "") + (earlyDeviceFormfactor.size ? " " + earlyDeviceFormfactor.size : "") + (earlySvgSupport ? " " + earlySvgSupport : "") + (earlySvgasimgSupport ? " " + earlySvgasimgSupport : "") + (earlyHasTouch ? " " + earlyHasTouch : "") + "]";

		if (document[title]) {
			document[title] = document[title] + userBrowsingDetails;
		}

		var loadUnparsedJSON = function (url, callback, onerror) {
			var cb = function (string) {
				return callback && "function" === typeof callback && callback(string);
			};
			var x = root.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
			x.overrideMimeType("application/json;charset=utf-8");
			x.open("GET", url, !0);
			x.withCredentials = !1;
			x.onreadystatechange = function () {
				if (x.status === "404" || x.status === "0") {
					console.log("Error XMLHttpRequest-ing file", x.status);
					return onerror && "function" === typeof onerror && onerror();
				} else if (x.readyState === 4 && x.status === 200 && x.responseText) {
					cb(x.responseText);
				}
			};
			x.send(null);
		};

		var safelyParseJSON = function (response) {
			var isJson = function (obj) {
				var objType = typeof obj;
				return ["boolean", "number", "string", 'symbol', "function"].indexOf(objType) === -1;
			};
			if (!isJson(response)) {
				return JSON.parse(response);
			} else {
				return response;
			}
		};

		var truncString = function (str, max, add) {
			add = add || "\u2026";
			return ("string" === typeof str && str[_length] > max ? str.substring(0, max) + add : str);
		};

		var fixEnRuTypo = function (e, a, b) {
			var c = "";
			if ("ru" === a && "en" === b) {
				a = '\u0430\u0431\u0432\u0433\u0434\u0435\u0451\u0436\u0437\u0438\u0439\u043a\u043b\u043c\u043d\u043e\u043f\u0440\u0441\u0442\u0443\u0444\u0445\u0446\u0447\u0448\u0449\u044a\u044c\u044b\u044d\u044e\u044f\u0410\u0411\u0412\u0413\u0414\u0415\u0401\u0416\u0417\u0418\u0419\u041a\u041b\u041c\u041d\u041e\u041f\u0420\u0421\u0422\u0423\u0424\u0425\u0426\u0427\u0428\u0429\u042a\u042c\u042b\u042d\u042e\u042f"\u2116;:?/.,';
				b = "f,dult`;pbqrkvyjghcnea[wxio]ms'.zF<DULT~:PBQRKVYJGHCNEA{WXIO}MS'>Z@#$^&|/?";
			} else {
				a = "f,dult`;pbqrkvyjghcnea[wxio]ms'.zF<DULT~:PBQRKVYJGHCNEA{WXIO}MS'>Z@#$^&|/?";
				b = '\u0430\u0431\u0432\u0433\u0434\u0435\u0451\u0436\u0437\u0438\u0439\u043a\u043b\u043c\u043d\u043e\u043f\u0440\u0441\u0442\u0443\u0444\u0445\u0446\u0447\u0448\u0449\u044a\u044c\u044b\u044d\u044e\u044f\u0410\u0411\u0412\u0413\u0414\u0415\u0401\u0416\u0417\u0418\u0419\u041a\u041b\u041c\u041d\u041e\u041f\u0420\u0421\u0422\u0423\u0424\u0425\u0426\u0427\u0428\u0429\u042a\u042c\u042b\u042d\u042e\u042f"\u2116;:?/.,';
			}
			var d;
			for (d = 0; d < e[_length]; d += 1) {
				var f = a.indexOf(e.charAt(d));
				if (c > f) {
					c += e.charAt(d);
				} else {
					c += b.charAt(f);
				}
			}
			d = null;
			return c;
		};

		var removeElement = function (elem) {
			if (elem) {
				if ("undefined" !== typeof elem[remove]) {
					return elem[remove]();
				} else {
					return elem[parentNode] && elem[parentNode][removeChild](elem);
				}
			}
		};

		var removeChildren = function (e) {
			if (e && e.firstChild) {
				for (; e.firstChild; ) {
					e.removeChild(e.firstChild);
				}
			}
		};

		var appendFragment = function (e, a) {
			var parent = a || document[getElementsByTagName]("body")[0] || "";
			if (e) {
				var df = document[createDocumentFragment]() || "";
				if ("string" === typeof e) {
					e = document[createTextNode](e);
				}
				df[appendChild](e);
				parent[appendChild](df);
			}
		};

		var prependFragmentBefore = function (e, a) {
			if ("string" === typeof e) {
				e = document[createTextNode](e);
			}
			var p = a[parentNode] || "";
			var df = document[createDocumentFragment]();
			if (p) {
				df[appendChild](e);
				p.insertBefore(df, a);
			}
		};

		var isValidId = function (a, full) {
			return full ? /^\#[A-Za-z][-A-Za-z0-9_:.]*$/.test(a) ? true : false : /^[A-Za-z][-A-Za-z0-9_:.]*$/.test(a) ? true : false;
		};

		var findPos = function (a) {
			a = a.getBoundingClientRect();
			return {
				top: Math.round(a.top + (root.pageYOffset || docElem.scrollTop || docBody.scrollTop) - (docElem.clientTop || docBody.clientTop || 0)),
				left: Math.round(a.left + (root.pageXOffset || docElem.scrollLeft || docBody.scrollLeft) - (docElem.clientLeft || docBody.clientLeft || 0))
			};
		};

		/*jshint bitwise: false */
		var parseLink = function (url, full) {
			var _full = full || "";
			return (function () {
				var _replace = function (s) {
					return s.replace(/^(#|\?)/, "").replace(/\:$/, "");
				};
				var _location = location || "";
				var _protocol = function (protocol) {
					switch (protocol) {
					case "http:":
						return _full ? ":" + 80 : 80;
					case "https:":
						return _full ? ":" + 443 : 443;
					default:
						return _full ? ":" + _location.port : _location.port;
					}
				};
				var _isAbsolute = (0 === url.indexOf("//") || !!~url.indexOf("://"));
				var _locationHref = root.location || "";
				var _origin = function () {
					var o = _locationHref.protocol + "//" + _locationHref.hostname + (_locationHref.port ? ":" + _locationHref.port : "");
					return o || "";
				};
				var _isCrossDomain = function () {
					var c = document[createElement]("a");
					c.href = url;
					var v = c.protocol + "//" + c.hostname + (c.port ? ":" + c.port : "");
					return v !== _origin();
				};
				var _link = document[createElement]("a");
				_link.href = url;
				return {
					href: _link.href,
					origin: _origin(),
					host: _link.host || _location.host,
					port: ("0" === _link.port || "" === _link.port) ? _protocol(_link.protocol) : (_full ? _link.port : _replace(_link.port)),
					hash: _full ? _link.hash : _replace(_link.hash),
					hostname: _link.hostname || _location.hostname,
					pathname: _link.pathname.charAt(0) !== "/" ? (_full ? "/" + _link.pathname : _link.pathname) : (_full ? _link.pathname : _link.pathname.slice(1)),
					protocol: !_link.protocol || ":" === _link.protocol ? (_full ? _location.protocol : _replace(_location.protocol)) : (_full ? _link.protocol : _replace(_link.protocol)),
					search: _full ? _link.search : _replace(_link.search),
					query: _full ? _link.search : _replace(_link.search),
					isAbsolute: _isAbsolute,
					isRelative: !_isAbsolute,
					isCrossDomain: _isCrossDomain(),
					hasHTTP: (/^(http|https):\/\//i).test(url) ? true : false
				};
			})();
		};
		/*jshint bitwise: true */

		var isNodejs = "undefined" !== typeof process && "undefined" !== typeof require || "";
		var isElectron = (function () {
			if (typeof root !== "undefined" && typeof root.process === "object" && root.process.type === "renderer") {
				return true;
			}
			if (typeof root !== "undefined" && typeof root.process !== "undefined" && typeof root.process.versions === "object" && !!root.process.versions.electron) {
				return true;
			}
			if (typeof navigator === "object" && typeof navigator.userAgent === "string" && navigator.userAgent.indexOf("Electron") >= 0) {
				return true;
			}
			return false;
		})();
		var isNwjs = (function () {
			if ("undefined" !== typeof isNodejs && isNodejs) {
				try {
					if ("undefined" !== typeof require("nw.gui")) {
						return true;
					}
				} catch (e) {
					return false;
				}
			}
			return false;
		})();

		var openDeviceBrowser = function (url) {
			var triggerForElectron = function () {
				var es = isElectron ? require("electron").shell : "";
				return es ? es.openExternal(url) : "";
			};
			var triggerForNwjs = function () {
				var ns = isNwjs ? require("nw.gui").Shell : "";
				return ns ? ns.openExternal(url) : "";
			};
			var triggerForLocal = function () {
				return root.open(url, "_system", "scrollbars=1,location=no");
			};
			if (isElectron) {
				triggerForElectron();
			} else if (isNwjs) {
				triggerForNwjs();
			} else {
				var locationProtocol = root.location.protocol || "",
				hasHTTP = locationProtocol ? "http:" === locationProtocol ? "http" : "https:" === locationProtocol ? "https" : "" : "";
				if (hasHTTP) {
					return true;
				} else {
					triggerForLocal();
				}
			}
		};

		var debounce = function (func, wait) {
			var timeout;
			var args;
			var context;
			var timestamp;
			return function () {
				context = this;
				args = [].slice.call(arguments, 0);
				timestamp = new Date();
				var later = function () {
					var last = (new Date()) - timestamp;
					if (last < wait) {
						timeout = setTimeout(later, wait - last);
					} else {
						timeout = null;
						func.apply(context, args);
					}
				};
				if (!timeout) {
					timeout = setTimeout(later, wait);
				}
			};
		};

		var throttle = function (func, wait) {
			var ctx;
			var args;
			var rtn;
			var timeoutID;
			var last = 0;
			function call() {
				timeoutID = 0;
				last = +new Date();
				rtn = func.apply(ctx, args);
				ctx = null;
				args = null;
			}
			return function throttled() {
				ctx = this;
				args = arguments;
				var delta = new Date() - last;
				if (!timeoutID) {
					if (delta >= wait) {
						call();
					} else {
						timeoutID = setTimeout(call, wait - delta);
					}
				}
				return rtn;
			};
		};

		var setStyleDisplayBlock = function (a) {
			if (a) {
				a[style].display = "block";
			}
		};

		var setStyleDisplayNone = function (a) {
			if (a) {
				a[style].display = "none";
			}
		};

		var scroll2Top = function (scrollTargetY, speed, easing) {
			var scrollY = root.scrollY || docElem.scrollTop;
			var posY = scrollTargetY || 0;
			var rate = speed || 2000;
			var soothing = easing || "easeOutSine";
			var currentTime = 0;
			var time = Math.max(0.1, Math.min(Math.abs(scrollY - posY) / rate, 0.8));
			var easingEquations = {
				easeOutSine: function (pos) {
					return Math.sin(pos * (Math.PI / 2));
				},
				easeInOutSine: function (pos) {
					return (-0.5 * (Math.cos(Math.PI * pos) - 1));
				},
				easeInOutQuint: function (pos) {
					if ((pos /= 0.5) < 1) {
						return 0.5 * Math.pow(pos, 5);
					}
					return 0.5 * (Math.pow((pos - 2), 5) + 2);
				}
			};
			function tick() {
				currentTime += 1 / 60;
				var p = currentTime / time;
				var t = easingEquations[soothing](p);
				if (p < 1) {
					requestAnimationFrame(tick);
					root.scrollTo(0, scrollY + ((posY - scrollY) * t));
				} else {
					root.scrollTo(0, posY);
				}
			}
			tick();
		};

		var LoadingSpinner = (function () {
			var spinnerClass = "loading-spinner";
			var spinner = document[getElementsByClassName](spinnerClass)[0] || "";
			var isActiveClass = "is-active-loading-spinner";
			if (!spinner) {
				spinner = document[createElement]("div");
				spinner[classList].add(spinnerClass);
				appendFragment(spinner, docBody);
			}
			return {
				show: function () {
					return docBody[classList].contains(isActiveClass) || docBody[classList].add(isActiveClass);
				},
				hide: function (callback, timeout) {
					var delay = timeout || 500;
					var timer = setTimeout(function () {
							clearTimeout(timer);
							timer = null;
							docBody[classList].remove(isActiveClass);
							if (callback && "function" === typeof callback) {
								callback();
							}
						}, delay);
				}
			};
		})();

		var manageExternalLinkAll = function () {
			var link = document[getElementsByTagName]("a") || "";
			var handleExternalLink = function (url, ev) {
				ev.stopPropagation();
				ev.preventDefault();
				var logic = function () {
					openDeviceBrowser(url);
				};
				debounce(logic, 200).call(root);
			};
			var arrange = function (e) {
				var externalLinkIsBindedClass = "external-link--is-binded";
				if (!e[classList].contains(externalLinkIsBindedClass)) {
					var url = e[getAttribute]("href") || "";
					if (url && parseLink(url).isCrossDomain && parseLink(url).hasHTTP) {
						e.title = "" + (parseLink(url).hostname || "") + " откроется в новой вкладке";
						if ("undefined" !== typeof getHTTP && getHTTP()) {
							e.target = "_blank";
							e.rel = "noopener";
						} else {
							e[_addEventListener]("click", handleExternalLink.bind(null, url));
						}
						e[classList].add(externalLinkIsBindedClass);
					}
				}
			};
			if (link) {
				var i,
				l;
				for (i = 0, l = link[_length]; i < l; i += 1) {
					arrange(link[i]);
				}
				i = l = null;
			}
		};
		manageExternalLinkAll();

		var Notifier42 = function (annonce, timeout, elemClass) {
			var msgObj = annonce || "No message passed as argument";
			var delay = timeout || 0;
			var msgClass = elemClass || "";
			var getElementsByClassName = "getElementsByClassName";
			var cls = "notifier42";
			var container = document[getElementsByClassName](cls)[0] || "";
			var an = "animated";
			var an2 = "fadeInUp";
			var an4 = "fadeOutDown";
			if (!container) {
				container = document[createElement]("div");
				appendFragment(container, docBody);
			}
			container[classList].add(cls);
			container[classList].add(an);
			container[classList].add(an2);
			if (msgClass) {
				container[classList].add(msgClass);
			}
			if ("string" === typeof msgObj) {
				msgObj = document[createTextNode](msgObj);
			}
			appendFragment(msgObj, container);
			var clearContainer = function (cb) {
				container[classList].remove(an2);
				container[classList].add(an4);
				var timer = setTimeout(function () {
					clearTimeout(timer);
					timer = null;
					container[classList].remove(an);
					container[classList].remove(an4);
					if (msgClass) {
						container[classList].remove(msgClass);
					}
					removeChildren(container);
					if (cb && "function" === typeof cb) {
						cb();
					}
				}, 400);
			};
			container[_addEventListener]("click", function handleContainer() {
				this[_removeEventListener]("click", handleContainer);
				clearContainer();
			});
			if (0 !== delay) {
				var timer = setTimeout(function () {
					clearTimeout(timer);
					timer = null;
					clearContainer();
				}, delay);
			}
			return {
				destroy: function () {
					return clearContainer(removeElement.bind(null, container));
				}
			};
		};
		var initNotifier42WriteComment = function () {
			if ("undefined" !== typeof getHTTP && !getHTTP()) {
				return;
			}
			var cookieKey = "_notifier42_write_comment_";
			var msgText = "Напишите, что понравилось, а что нет. Регистрироваться не нужно.";
			var locationOrigin = parseLink(root.location.href).origin;
			var showMsg = function () {
				var msgObj = document[createElement]("a");
				/* jshint -W107 */
				msgObj.href = "javascript:void(0);";
				/* jshint +W107 */
				appendFragment(msgText, msgObj);
				var handleMsgObj = function (ev) {
					ev.stopPropagation();
					ev.preventDefault();
					msgObj[_removeEventListener]("click", handleMsgObj);
					var targetObj = document[getElementById]("disqus_thread") || "";
					scroll2Top((targetObj ? findPos(targetObj).top : 0), 20000);
				};
				msgObj[_addEventListener]("click", handleMsgObj);
				var nf42;
				nf42 = new Notifier42(msgObj, 8000);
				Cookies.set(cookieKey, msgText);
			};
			if (!Cookies.get(cookieKey) && locationOrigin) {
				var timer = setTimeout(function () {
					clearTimeout(timer);
					timer = null;
					showMsg();
				}, 16000);
			}
		};
		initNotifier42WriteComment();

		var initTablesort = function () {
			var tableSort = document[getElementsByClassName]("table-sort") || "";
			var initScript = function () {
				var arrange = function (e) {
					var tableId = e.id || "";
					if (tableId) {
						var table = document[getElementById](tableId) || "";
						var caption = table ? table[getElementsByTagName]("caption")[0] || "" : "";
						if (!caption) {
							var tableCaption = document[createElement]("caption");
							prependFragmentBefore(tableCaption, table.firstChild);
							caption = table.firstChild;
						}
						appendFragment("Сортируемая таблица", caption);
						var tblsort;
						tblsort = new Tablesort(table);
					}
				};
				var i,
				l;
				for (i = 0, l = tableSort[_length]; i < l; i += 1) {
					arrange(tableSort[i]);
				}
				i = l = null;
			};
			if (root.Tablesort && tableSort) {
				initScript();
			}
		};
		initTablesort();

		var handleDataSrcImageAll = function () {
			var img = document[getElementsByClassName]("data-src-img") || "";
			var arrange = function (e) {
				if (verge.inY(e, 100)) {
					if (!e[classList].contains(isBindedClass)) {
						var srcString = e[dataset].src || "";
						if (srcString) {
							if (parseLink(srcString).isAbsolute && !parseLink(srcString).hasHTTP) {
								e[dataset].src = srcString.replace(/^/, forcedHTTP + ":");
								srcString = e[dataset].src;
							}
							imagePromise(srcString).then(function () {
								e.src = srcString;
							}).catch (function (err) {
								console.log("cannot load image with imagePromise:", srcString, err);
							});
							e[classList].add(isActiveClass);
							e[classList].add(isBindedClass);
						}
					}
				}
			};
			if (img) {
				var i,
				l;
				for (i = 0, l = img[_length]; i < l; i += 1) {
					arrange(img[i]);
				}
				i = l = null;
			}
		};

		var handleDataSrcImageAllWindow = throttle(handleDataSrcImageAll, 100);

		var manageDataSrcImageAll = function () {
			root[_removeEventListener]("scroll", handleDataSrcImageAllWindow, {passive: true});
			root[_removeEventListener]("resize", handleDataSrcImageAllWindow);
			root[_addEventListener]("scroll", handleDataSrcImageAllWindow, {passive: true});
			root[_addEventListener]("resize", handleDataSrcImageAllWindow);
			var timer = setTimeout(function () {
					clearTimeout(timer);
					timer = null;
					handleDataSrcImageAll();
				}, 100);
		};
		manageDataSrcImageAll();

		var handleDataSrcIframeAll = function () {
			var ifrm = document[getElementsByClassName]("data-src-iframe") || "";
			var arrange = function (e) {
				if (verge.inY(e, 100)) {
					if (!e[classList].contains(isBindedClass)) {
						var srcString = e[dataset].src || "";
						if (srcString) {
							if (parseLink(srcString).isAbsolute && !parseLink(srcString).hasHTTP) {
								e[dataset].src = srcString.replace(/^/, forcedHTTP + ":");
								srcString = e[dataset].src;
							}
							e.src = srcString;
							e[setAttribute]("frameborder", "no");
							e[setAttribute]("style", "border:none;");
							e[setAttribute]("webkitallowfullscreen", "true");
							e[setAttribute]("mozallowfullscreen", "true");
							e[setAttribute]("scrolling", "no");
							e[setAttribute]("allowfullscreen", "true");
							e[classList].add(isActiveClass);
							e[classList].add(isBindedClass);
						}
					}
				}
			};
			if (ifrm) {
				var i,
				l;
				for (i = 0, l = ifrm[_length]; i < l; i += 1) {
					arrange(ifrm[i]);
				}
				i = l = null;
			}
		};

		var handleDataSrcIframeAllWindow = throttle(handleDataSrcIframeAll, 100);

		var manageDataSrcIframeAll = function () {
			root[_removeEventListener]("scroll", handleDataSrcIframeAllWindow, {passive: true});
			root[_removeEventListener]("resize", handleDataSrcIframeAllWindow);
			root[_addEventListener]("scroll", handleDataSrcIframeAllWindow, {passive: true});
			root[_addEventListener]("resize", handleDataSrcIframeAllWindow);
			var timer = setTimeout(function () {
					clearTimeout(timer);
					timer = null;
					handleDataSrcIframeAll();
				}, 100);
		};
		manageDataSrcIframeAll();

		var imgLightboxLinkClass = "img-lightbox-link";

		/*!
		 * @see {@link https://github.com/englishextra/img-lightbox}
		 */
		var manageImgLightbox = function (imgLightboxLinkClass) {
			var link = document[getElementsByClassName](imgLightboxLinkClass) || "";
			var initScript = function () {
				imgLightbox(imgLightboxLinkClass, {
					onLoaded: function () {
						LoadingSpinner.hide();
					},
					onClosed: function () {
						LoadingSpinner.hide();
					},
					onCreated: function () {
						LoadingSpinner.show();
					},
					touch: false
				});
			};
			if (root.imgLightbox && link) {
				initScript();
			}
		};
		manageImgLightbox(imgLightboxLinkClass);

		var iframeLightboxLinkClass = "iframe-lightbox-link";

		/*!
		 * @see {@link https://github.com/englishextra/iframe-lightbox}
		 */
		var manageIframeLightbox = function (iframeLightboxLinkClass) {
			var link = document[getElementsByClassName](iframeLightboxLinkClass) || "";
			var initScript = function () {
				var arrange = function (e) {
					e.lightbox = new IframeLightbox(e, {
							onLoaded: function () {
								LoadingSpinner.hide();
							},
							onClosed: function () {
								LoadingSpinner.hide();
							},
							onOpened: function () {
								LoadingSpinner.show();
							},
							touch: false
						});
				};
				var i,
				l;
				for (i = 0, l = link[_length]; i < l; i += 1) {
					arrange(link[i]);
				}
				i = l = null;
			};
			if (root.IframeLightbox && link) {
				initScript();
			}
		};
		manageIframeLightbox(iframeLightboxLinkClass);

		var handleChaptersSelect = function () {
			var _this = this;
			var hashString = _this.options[_this.selectedIndex].value || "";
			if (hashString) {
				var targetObj = hashString ? (isValidId(hashString, true) ? document[getElementById](hashString.replace(/^#/, "")) || "" : "") : "";
				if (targetObj) {
					scroll2Top((targetObj ? findPos(targetObj).top : 0), 20000);
				} else {
					root.location.href = hashString;
				}
			}
		};
		var manageChaptersSelect = function () {
			var chaptersSelect = document[getElementById]("chapters-select") || "";
			if (chaptersSelect) {
				chaptersSelect[_addEventListener]("change", handleChaptersSelect);
			}
		};
		manageChaptersSelect();

		var manageSearchInput = function () {
			var searchInput = document[getElementById]("text") || "";
			var handleSearchInputValue = function () {
				var _this = this;
				var logic = function () {
					_this.value = _this.value.replace(/\\/g, "").replace(/ +(?= )/g, " ").replace(/\/+(?=\/)/g, "/") || "";
				};
				debounce(logic, 200).call(root);
			};
			if (searchInput) {
				searchInput.focus();
				searchInput[_addEventListener]("input", handleSearchInputValue);
			}
		};
		manageSearchInput();

		var handleExpandingLayerAll = function () {
			var _this = this;
			var layer = _this[parentNode] ? _this[parentNode].nextElementSibling : "";
			if (layer) {
				_this[classList].toggle(isActiveClass);
				layer[classList].toggle(isActiveClass);
			}
			return;
		};
		var manageExpandingLayers = function () {
			var btn = document[getElementsByClassName]("btn-expand-hidden-layer") || "";
			var addHandler = function (e) {
				e[_addEventListener]("click", handleExpandingLayerAll);
			};
			if (btn) {
				var i,
				l;
				for (i = 0, l = btn[_length]; i < l; i += 1) {
					addHandler(btn[i]);
				}
				i = l = null;
			}
		};
		manageExpandingLayers();

		var qcode;
		var manageLocationQrCodeImage = function () {
			var holder = document[getElementsByClassName]("holder-location-qrcode")[0] || "";
			var locationHref = root.location.href || "";
			var initScript = function () {
				if (!qcode) {
					qcode = true;
					var locationHref = root.location.href || "";
					var img = document[createElement]("img");
					var imgTitle = document.title ? ("Ссылка на страницу «" + document.title.replace(/\[[^\]]*?\]/g, "").trim() + "»") : "";
					var imgSrc = forcedHTTP + "://chart.googleapis.com/chart?cht=qr&chld=M%7C4&choe=UTF-8&chs=512x512&chl=" + encodeURIComponent(locationHref);
					img.alt = imgTitle;
					if (root.QRCode) {
						if ("undefined" !== typeof earlySvgSupport && "svg" === earlySvgSupport) {
							imgSrc = QRCode.generateSVG(locationHref, {
									ecclevel: "M",
									fillcolor: "#FFFFFF",
									textcolor: "#191919",
									margin: 4,
									modulesize: 8
								});
							var XMLS = new XMLSerializer();
							imgSrc = XMLS.serializeToString(imgSrc);
							imgSrc = "data:image/svg+xml;base64," + root.btoa(unescape(encodeURIComponent(imgSrc)));
							img.src = imgSrc;
						} else {
							imgSrc = QRCode.generatePNG(locationHref, {
									ecclevel: "M",
									format: "html",
									fillcolor: "#FFFFFF",
									textcolor: "#191919",
									margin: 4,
									modulesize: 8
								});
							img.src = imgSrc;
						}
					} else {
						img.src = imgSrc;
					}
					img[classList].add("qr-code-img");
					img.title = imgTitle;
					removeChildren(holder);
					appendFragment(img, holder);
				}
			};
			if (root.QRCode && holder && locationHref && "undefined" !== typeof getHTTP && getHTTP()) {
				initScript();
			}
		};
		manageLocationQrCodeImage();

		var initNavMenu = function () {
			var container = document[getElementById]("container") || "";
			var page = document[getElementById]("page") || "";
			var btnNavMenu = document[getElementsByClassName]("btn-nav-menu")[0] || "";
			var panelNavMenu = document[getElementsByClassName]("panel-nav-menu")[0] || "";
			var panelNavMenuItems = panelNavMenu ? panelNavMenu[getElementsByTagName]("a") || "" : "";
			var holderPanelMenuMore = document[getElementsByClassName]("holder-panel-menu-more")[0] || "";
			var locationHref = root.location.href || "";
			var removeAllActiveClass = function () {
				page[classList].remove(isActiveClass);
				panelNavMenu[classList].remove(isActiveClass);
				btnNavMenu[classList].remove(isActiveClass);
			};
			var removeHolderActiveClass = function () {
				if (holderPanelMenuMore && holderPanelMenuMore[classList].contains(isActiveClass)) {
					holderPanelMenuMore[classList].remove(isActiveClass);
				}
			};
			var addContainerHandler = function () {
				var handleContainerLeft = function () {
					removeHolderActiveClass();
					if (panelNavMenu[classList].contains(isActiveClass)) {
						removeAllActiveClass();
					}
				};
				var handleContainerRight = function () {
					removeHolderActiveClass();
					var addAllActiveClass = function () {
						page[classList].add(isActiveClass);
						panelNavMenu[classList].add(isActiveClass);
						btnNavMenu[classList].add(isActiveClass);
					};
					if (!panelNavMenu[classList].contains(isActiveClass)) {
						addAllActiveClass();
					}
				};
				container[_addEventListener]("click", handleContainerLeft);
				if (root.tocca) {
					if ("undefined" !== typeof earlyHasTouch && "touch" === earlyHasTouch) {
						container[_addEventListener]("swipeleft", handleContainerLeft);
						container[_addEventListener]("swiperight", handleContainerRight);
					}
				}
			};
			var addBtnHandler = function () {
				var toggleAllActiveClass = function () {
					page[classList].toggle(isActiveClass);
					panelNavMenu[classList].toggle(isActiveClass);
					btnNavMenu[classList].toggle(isActiveClass);
				};
				var handleBtnNavMenu = function (ev) {
					ev.stopPropagation();
					ev.preventDefault();
					removeHolderActiveClass();
					toggleAllActiveClass();
				};
				btnNavMenu[_addEventListener]("click", handleBtnNavMenu);
			};
			var addItemHandlerAll = function () {
				var addItemHandler = function (e) {
					var addActiveClass = function (e) {
						e[classList].add(isActiveClass);
					};
					var removeHolderAndAllActiveClass = function () {
						removeHolderActiveClass();
						removeAllActiveClass();
					};
					var removeActiveClass = function (e) {
						e[classList].remove(isActiveClass);
					};
					var handleItem = function () {
						if (panelNavMenu[classList].contains(isActiveClass)) {
							removeHolderAndAllActiveClass();
						}
						var i,
						l;
						for (i = 0, l = panelNavMenuItems[_length]; i < l; i += 1) {
							removeActiveClass(panelNavMenuItems[i]);
						}
						i = l = null;
						addActiveClass(e);
					};
					e[_addEventListener]("click", handleItem);
					if (locationHref === e.href) {
						addActiveClass(e);
					} else {
						removeActiveClass(e);
					}
				};
				var i,
				l;
				for (i = 0, l = panelNavMenuItems[_length]; i < l; i += 1) {
					addItemHandler(panelNavMenuItems[i]);
				}
				i = l = null;
			};
			if (page && container && btnNavMenu && panelNavMenu && panelNavMenuItems) {
				addContainerHandler();
				addBtnHandler();
				addItemHandlerAll();
			}
		};
		initNavMenu();

		var addAppUpdatesLink;
		addAppUpdatesLink = function () {
			var panel = document[getElementsByClassName]("panel-menu-more")[0] || "";
			var items = panel ? panel[getElementsByTagName]("li") || "" : "";
			var navigatorUserAgent = navigator.userAgent || "";
			var linkHref;
			if (/Windows/i.test(navigatorUserAgent) && /(WOW64|Win64)/i.test(navigatorUserAgent)) {
				linkHref = "https://github.com/englishextra/englishextra-app/releases/download/v1.0.0/englishextra-win32-x64-setup.exe";
			} else if (/(x86_64|x86-64|x64;|amd64|AMD64|x64_64)/i.test(navigatorUserAgent) && /(Linux|X11)/i.test(navigatorUserAgent)) {
				linkHref = "https://github.com/englishextra/englishextra-app/releases/download/v1.0.0/englishextra-linux-x64.tar.gz";
			} else if (/IEMobile/i.test(navigatorUserAgent)) {
				linkHref = "https://github.com/englishextra/englishextra-app/releases/download/v1.0.0/englishextra.Windows10_x86_debug.appx";
			} else {
				if (/Android/i.test(navigatorUserAgent)) {
					linkHref = "https://github.com/englishextra/englishextra-app/releases/download/v1.0.0/englishextra-debug.apk";
				}
			}
			var arrange = function () {
				var listItem = document[createElement]("li");
				var link = document[createElement]("a");
				var linkText = "Скачать приложение сайта";
				link.title = "" + (parseLink(linkHref).hostname || "") + " откроется в новой вкладке";
				link.href = linkHref;
				var handleAppUpdatesLink = function () {
					openDeviceBrowser(linkHref);
				};
				if ("undefined" !== typeof getHTTP && getHTTP()) {
					link.target = "_blank";
					link.rel = "noopener";
				} else {
					/* jshint -W107 */
					link.href = "javascript:void(0);";
					/* jshint +W107 */
					link[_addEventListener]("click", handleAppUpdatesLink);
				}
				link[appendChild](document[createTextNode]("" + linkText));
				listItem[appendChild](link);
				if (panel.hasChildNodes()) {
					prependFragmentBefore(listItem, panel.firstChild);
				}
			};
			if (panel && items && linkHref) {
				arrange();
			}
		};
		/* addAppUpdatesLink(); */

		var initMenuMore = function () {
			var container = document[getElementById]("container") || "";
			var page = document[getElementById]("page") || "";
			var holderPanelMenuMore = document[getElementsByClassName]("holder-panel-menu-more")[0] || "";
			var btnMenuMore = document[getElementsByClassName]("btn-menu-more")[0] || "";
			var panelMenuMore = document[getElementsByClassName]("panel-menu-more")[0] || "";
			var panelMenuMoreItems = panelMenuMore ? panelMenuMore[getElementsByTagName]("li") || "" : "";
			var panelNavMenu = document[getElementsByClassName]("panel-nav-menu")[0] || "";
			var handleItem = function () {
				page[classList].remove(isActiveClass);
				holderPanelMenuMore[classList].remove(isActiveClass);
				if (panelNavMenu && panelNavMenu[classList].contains(isActiveClass)) {
					panelNavMenu[classList].remove(isActiveClass);
				}
			};
			var addContainerHandler = function () {
				container[_addEventListener]("click", handleItem);
			};
			var addBtnHandler = function () {
				var handleBtnMenuMore = function (ev) {
					ev.stopPropagation();
					ev.preventDefault();
					holderPanelMenuMore[classList].toggle(isActiveClass);
				};
				btnMenuMore[_addEventListener]("click", handleBtnMenuMore);
			};
			var addItemHandlerAll = function () {
				var addItemHandler = function (e) {
					e[_addEventListener]("click", handleItem);
				};
				var i,
				l;
				for (i = 0, l = panelMenuMoreItems[_length]; i < l; i += 1) {
					addItemHandler(panelMenuMoreItems[i]);
				}
				i = l = null;
			};
			if (page && container && holderPanelMenuMore && btnMenuMore && panelMenuMore && panelMenuMoreItems) {
				addContainerHandler();
				addBtnHandler();
				addItemHandlerAll();
			}
		};
		initMenuMore();

		var hideOtherIsSocial = function (thisObj) {
			var _thisObj = thisObj || this;
			var elem = document[getElementsByClassName]("is-social") || "";
			if (elem) {
				var k,
				n;
				for (k = 0, n = elem[_length]; k < n; k += 1) {
					if (_thisObj !== elem[k]) {
						elem[k][classList].remove(isActiveClass);
					}
				}
				k = n = null;
			}
		};
		root[_addEventListener]("click", hideOtherIsSocial);

		var yshare;
		var manageShareButton = function () {
			var btn = document[getElementsByClassName]("btn-share-buttons")[0] || "";
			var yaShare2Id = "ya-share2";
			var yaShare2 = document[getElementById](yaShare2Id) || "";
			var locationHref = root.location || "";
			var documentTitle = document[title] || "";
			var handleShareButton = function (ev) {
				ev.stopPropagation();
				ev.preventDefault();
				var logic = function () {
					yaShare2[classList].toggle(isActiveClass);
					hideOtherIsSocial(yaShare2);
					var initScript = function () {
						try {
							if (yshare) {
								yshare.updateContent({
									title: documentTitle,
									description: documentTitle,
									url: locationHref
								});
							} else {
								yshare = Ya.share2(yaShare2Id, {
									content: {
										title: documentTitle,
										description: documentTitle,
										url: locationHref
									}
								});
							}
						} catch (err) {
							throw new Error("cannot yshare.updateContent or Ya.share2 " + err);
						}
					};
					if (!(root.Ya && Ya.share2)) {
						var jsUrl = forcedHTTP + "://yastatic.net/share2/share.js";
						var load;
						load = new loadJsCss([jsUrl], initScript);
					} else {
						initScript();
					}
				};
				debounce(logic, 200).call(root);
			};
			if (btn && yaShare2) {
				if ("undefined" !== typeof getHTTP && getHTTP()) {
					btn[_addEventListener]("click", handleShareButton);
				} else {
					setStyleDisplayNone(btn);
				}
			}
		};
		manageShareButton();

		var vlike;
		var manageVKLikeButton = function () {
			var vkLikeId = "vk-like";
			var vkLike = document[getElementById](vkLikeId) || "";
			var holderVkLike = document[getElementsByClassName]("holder-vk-like")[0] || "";
			var btn = document[getElementsByClassName]("btn-show-vk-like")[0] || "";
			var handleVKLikeButton = function (ev) {
				ev.stopPropagation();
				ev.preventDefault();
				var logic = function () {
					holderVkLike[classList].toggle(isActiveClass);
					hideOtherIsSocial(holderVkLike);
					var initScript = function () {
						if (!vlike) {
							try {
								VK.init({
									apiId: (vkLike[dataset].apiid || ""),
									nameTransportPath: "/xd_receiver.htm",
									onlyWidgets: true
								});
								VK.Widgets.Like(vkLikeId, {
									type: "button",
									height: 24
								});
								vlike = true;
							} catch (err) {
								throw new Error("cannot VK.init " + err);
							}
						}
					};
					if (!(root.VK && VK.init && VK.Widgets && VK.Widgets.Like)) {
						var jsUrl = forcedHTTP + "://vk.com/js/api/openapi.js?154";
						var load;
						load = new loadJsCss([jsUrl], initScript);
					} else {
						initScript();
					}
				};
				debounce(logic, 200).call(root);
			};
			if (btn && vkLike) {
				if ("undefined" !== typeof getHTTP && getHTTP()) {
					btn[_addEventListener]("click", handleVKLikeButton);
				} else {
					setStyleDisplayNone(btn);
				}
			}
		};
		manageVKLikeButton();

		var initDownloadAppBtn;
		initDownloadAppBtn = function () {
			var navigatorUserAgent = navigator.userAgent || "";
			var cls = "btn-download-app";
			var an = "animated";
			var an2 = "bounceInRight";
			var an4 = "bounceOutRight";
			var bgUrl;
			var linkHref;
			if (/Windows/i.test(navigatorUserAgent) && /(WOW64|Win64)/i.test(navigatorUserAgent)) {
				bgUrl = "url(../../libs/products/img/download_windows_app_144x52.png)";
				linkHref = "https://github.com/englishextra/englishextra-app/releases/download/v1.0.0/englishextra-win32-x64-setup.exe";
			} else if (/(x86_64|x86-64|x64;|amd64|AMD64|x64_64)/i.test(navigatorUserAgent) && /(Linux|X11)/i.test(navigatorUserAgent)) {
				bgUrl = "url(../../libs/products/img/download_linux_app_144x52.png)";
				linkHref = "https://github.com/englishextra/englishextra-app/releases/download/v1.0.0/englishextra-linux-x64.tar.gz";
			} else if (/IEMobile/i.test(navigatorUserAgent)) {
				bgUrl = "url(../../libs/products/img/download_wp_app_144x52.png)";
				linkHref = "https://github.com/englishextra/englishextra-app/releases/download/v1.0.0/englishextra.Windows10_x86_debug.appx";
			} else {
				if (/Android/i.test(navigatorUserAgent)) {
					bgUrl = "url(../../libs/products/img/download_android_app_144x52.png)";
					linkHref = "https://github.com/englishextra/englishextra-app/releases/download/v1.0.0/englishextra-debug.apk";
				}
			}
			var arrange = function () {
				var handleDownloadAppBtn = function (ev) {
					ev.stopPropagation();
					ev.preventDefault();
					openDeviceBrowser(linkHref);
				};
				var link = document[createElement]("a");
				link.style.backgroundImage = bgUrl;
				link[classList].add(cls);
				link[classList].add(an);
				link[classList].add(an2);
				link.href = linkHref;
				if ("undefined" !== typeof getHTTP && getHTTP()) {
					link.target = "_blank";
					link.rel = "noopener";
				} else {
					link[_addEventListener]("click", handleDownloadAppBtn);
				}
				appendFragment(link, docBody);
				var timer = setTimeout(function () {
					clearTimeout(timer);
					timer = null;
					link[classList].remove(an2);
					link[classList].add(an4);
					var timer2 = setTimeout(function () {
						clearTimeout(timer2);
						timer2 = null;
						link[_removeEventListener]("click", handleDownloadAppBtn);
						removeElement(link);
					}, 750);
				}, 8000);
			};
			if (docBody && navigatorUserAgent && linkHref) {
				var timer = setTimeout(function () {
					clearTimeout(timer);
					timer = null;
					arrange();
				}, 3000);
			}
		};
		/* initDownloadAppBtn(); */

		var disqs;
		var initDisqusOnScroll = function () {
			var disqusThread = document[getElementById]("disqus_thread") || "";
			var btn = document[getElementsByClassName]("btn-show-disqus")[0] || "";
			var locationHref = root.location.href || "";
			var disqusThreadShortname = disqusThread ? (disqusThread[dataset].shortname || "") : "";
			var loadDisqus = function () {
				var initScript = function () {
					if (!disqs) {
						disqs = true;
						setStyleDisplayNone(btn);
						disqusThread[classList].add(isActiveClass);
					}
				};
				if (!root.DISQUS) {
					var jsUrl = forcedHTTP + "://" + disqusThreadShortname + ".disqus.com/embed.js";
					var load;
					load = new loadJsCss([jsUrl], initScript);
				} else {
					initScript();
				}
			};
			var addHandler = function () {
				var handleDisqusButton = function (ev) {
					ev.preventDefault();
					ev.stopPropagation();
					btn[_removeEventListener]("click", handleDisqusButton);
					loadDisqus();
				};
				btn[_addEventListener]("click", handleDisqusButton);
			};
			if (btn && disqusThread && disqusThreadShortname && locationHref) {
				if ("undefined" !== typeof getHTTP && getHTTP()) {
					addHandler();
				} else {
					removeChildren(disqusThread);
					var msgText = document[createRange]().createContextualFragment("<p>Комментарии доступны только в веб версии этой страницы.</p>");
					appendFragment(msgText, disqusThread);
					disqusThread.removeAttribute("id");
					setStyleDisplayNone(btn[parentNode]);
				}
			}
		};
		initDisqusOnScroll();

		var kaml;
		var initKamilAutocomplete = function () {
			var searchForm = document[getElementsByClassName]("search-form")[0] || "";
			var textInputSelector = "#text";
			var textInput = document[getElementById]("text") || "";
			var container = document[getElementById]("container") || "";
			var suggestionUlId = "kamil-typo-autocomplete";
			var suggestionUlClass = "kamil-autocomplete";
			var jsonUrl = "../../libs/noushevr-contents-cards/json/contents.json";
			var processJsonResponse = function (jsonResponse) {
				var ac;
				try {
					var jsonObj = safelyParseJSON(jsonResponse);
					if (!jsonObj.pages[0].hasOwnProperty("title")) {
						throw new Error("incomplete JSON data: no title");
					}
					ac = new Kamil(textInputSelector, {
							source: jsonObj.pages,
							property: "title",
							minChars: 2
						});
				} catch (err) {
					console.log("cannot init generateMenu", err);
					return;
				}
				var suggestionUl = document[createElement]("ul");
				var suggestionLi = document[createElement]("li");
				var handleTypoSuggestion = function () {
					setStyleDisplayNone(suggestionUl);
					setStyleDisplayNone(suggestionLi);
				};
				var showTypoSuggestion = function () {
					setStyleDisplayBlock(suggestionUl);
					setStyleDisplayBlock(suggestionLi);
				};
				suggestionUl[classList].add(suggestionUlClass);
				suggestionUl.id = suggestionUlId;
				handleTypoSuggestion();
				suggestionUl[appendChild](suggestionLi);
				textInput[parentNode].insertBefore(suggestionUl, textInput.nextElementSibling);
				ac.renderMenu = function (ul, stance) {
					var items = stance || "";
					var itemsLength = items[_length];
					var _this = this;
					var limitKamilOutput = function (e, i) {
						if (i < 10) {
							_this._renderItemData(ul, e, i);
						}
					};
					if (items) {
						var i;
						for (i = 0; i < itemsLength; i += 1) {
							limitKamilOutput(items[i], i);
						}
						i = null;
					}
					while (itemsLength < 1) {
						var textValue = textInput.value;
						if (/[^\u0000-\u007f]/.test(textValue)) {
							textValue = fixEnRuTypo(textValue, "ru", "en");
						} else {
							textValue = fixEnRuTypo(textValue, "en", "ru");
						}
						showTypoSuggestion();
						removeChildren(suggestionLi);
						suggestionLi[appendChild](document[createTextNode]("" + textValue));
						if (textValue.match(/^\s*$/)) {
							handleTypoSuggestion();
						}
						if (textInput.value[_length] < 3 || textInput.value.match(/^\s*$/)) {
							handleTypoSuggestion();
						}
						itemsLength += 1;
					}
					var lis = ul ? ul[getElementsByTagName]("li") || "" : "";
					var truncateKamilText = function (e) {
						var truncText = e.firstChild.textContent || "";
						var truncTextObj = document[createTextNode](truncString(truncText, 24));
						e.replaceChild(truncTextObj, e.firstChild);
						e.title = "" + truncText;
					};
					if (lis) {
						var j,
						m;
						for (j = 0, m = lis[_length]; j < m; j += 1) {
							truncateKamilText(lis[j]);
						}
						j = m = null;
					}
				};
				var handleSuggestionLi = function (ev) {
					ev.stopPropagation();
					ev.preventDefault();
					textInput.focus();
					textInput.value = suggestionLi.firstChild.textContent || "";
					setStyleDisplayNone(suggestionUl);
				};
				suggestionLi[_addEventListener]("click", handleSuggestionLi);
				if (container) {
					container[_addEventListener]("click", handleTypoSuggestion);
				}
				ac.on("kamilselect", function (e) {
					var kamilItemLink = e.item.href || "";
					var handleKamilItem = function () {
						e.inputElement.value = "";
						handleTypoSuggestion();
						root.location.href = kamilItemLink;
					};
					if (kamilItemLink) {
						handleKamilItem();
					}
				});
			};
			var initScript = function () {
				if (!kaml) {
					kaml = true;
					loadUnparsedJSON(jsonUrl, processJsonResponse);
				}
			};
			if (root.Kamil && searchForm && textInput) {
				initScript();
			}
		};
		initKamilAutocomplete();

		var initUiTotop = function () {
			var btnClass = "ui-totop";
			var btn = document[getElementsByClassName](btnClass)[0] || "";
			if (!btn) {
				btn = document[createElement]("a");
				btn[classList].add(btnClass);
				/* jshint -W107 */
				btn.href = "javascript:void(0);";
				/* jshint +W107 */
				btn.title = "Наверх";
				docBody[appendChild](btn);
			}
			var handleUiTotopAnchor = function (ev) {
				ev.stopPropagation();
				ev.preventDefault();
				scroll2Top(0, 20000);
			};
			var handleUiTotopWindow = function (_this) {
				var logic = function () {
					var scrollPosition = _this.pageYOffset || docElem.scrollTop || docBody.scrollTop || "";
					var windowHeight = _this.innerHeight || docElem.clientHeight || docBody.clientHeight || "";
					if (scrollPosition && windowHeight && btn) {
						if (scrollPosition > windowHeight) {
							btn[classList].add(isActiveClass);
						} else {
							btn[classList].remove(isActiveClass);
						}
					}
				};
				throttle(logic, 100).call(root);
			};
			if (docBody) {
				btn[_addEventListener]("click", handleUiTotopAnchor);
				root[_addEventListener]("scroll", handleUiTotopWindow, {passive: true});
			}
		};
		initUiTotop();

		hideProgressBar();
	};

	var scripts = [];

	var supportsPassive = (function () {
		var support = false;
		try {
			var opts = Object[defineProperty] && Object[defineProperty]({}, "passive", {
					get: function () {
						support = true;
					}
				});
			root[_addEventListener]("test", function () {}, opts);
		} catch (err) {}
		return support;
	})();

	var needsPolyfills = (function () {
		return !String.prototype.startsWith ||
		!supportsPassive ||
		!root.requestAnimationFrame ||
		!root.matchMedia ||
		("undefined" === typeof root.Element && !("dataset" in docElem)) ||
		!("classList" in document[createElement]("_")) ||
		document[createElementNS] && !("classList" in document[createElementNS]("http://www.w3.org/2000/svg", "g")) ||
		(root.attachEvent && !root[_addEventListener]) ||
		!("onhashchange" in root) ||
		!Array.prototype.indexOf ||
		!root.Promise ||
		!root.fetch ||
		!document[querySelectorAll] ||
		!document[querySelector] ||
		!Function.prototype.bind ||
		(Object[defineProperty] &&
			Object[getOwnPropertyDescriptor] &&
			Object[getOwnPropertyDescriptor](Element.prototype, "textContent") &&
			!Object[getOwnPropertyDescriptor](Element.prototype, "textContent").get) ||
		!("undefined" !== typeof root.localStorage && "undefined" !== typeof root.sessionStorage) ||
		!root.WeakMap ||
		!root.MutationObserver;
	})();

	if (needsPolyfills) {
		scripts.push("../../cdn/polyfills/js/polyfills.fixed.min.js");
	}

	scripts.push("../../libs/noushevr-paper/js/vendors.min.js");

	var bodyFontFamily = "Roboto";
	var onFontsLoadedCallback = function () {
		var slot;
		var onFontsLoaded = function () {
			clearInterval(slot);
			slot = null;
			if (!supportsSvgSmilAnimation && "undefined" !== typeof progressBar) {
				progressBar.increase(20);
			}
			var load;
			load = new loadJsCss(scripts, run);
		};
		var checkFontIsLoaded;
		checkFontIsLoaded = function () {
			if (doesFontExist(bodyFontFamily)) {
				onFontsLoaded();
			}
		};
		/* if (supportsCanvas) {
			slot = setInterval(checkFontIsLoaded, 100);
		} else {
			slot = null;
			onFontsLoaded();
		} */
		onFontsLoaded();
	};

	var load;
	load = new loadJsCss(["../../libs/noushevr-paper/css/bundle.min.css"], onFontsLoadedCallback);
})("undefined" !== typeof window ? window : this, document);
