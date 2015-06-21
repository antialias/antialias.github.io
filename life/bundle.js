/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	var canvas = document.createElement("canvas");
	var zoom = 4;
	canvas.width = window.innerWidth / zoom;
	canvas.height = window.innerHeight / zoom;
	canvas.style.zoom = zoom;
	var x;
	var y;
	var ctx = canvas.getContext('2d');
	// CanvasRenderingContext2D.webkitImageSmoothingEnabled = false;
	// CanvasRenderingContext2D.imageSmoothingEnabled = false;
	var image = ctx.getImageData(0, 0, canvas.width, canvas.height);
	var colorval = [];
	var threshold = 0.8;
	var delay = 0;
	for(x = 0; x < image.data.length; x+=4) {
	    colorval[0] = Math.random() > threshold ? 255 : 0;
	    colorval[1] = Math.random() > threshold ? 255 : 0;
	    colorval[2] = Math.random() > threshold ? 255 : 0;
	    image.data[x + 0] = colorval[0];
	    image.data[x + 1] = colorval[1];
	    image.data[x + 2] = colorval[2];
	    image.data[x + 3] = 255;
	}
	ctx.putImageData(image, 0, 0);
	document.body.appendChild(canvas);
	var buffer = new Uint8ClampedArray(canvas.width * 4);
	var neighbors = [];
	var self = [];
	var empty = [0,0,0];
	var neighborCases = [
	    empty, // 0 -- starve
	    empty, // 1 -- starve
	    self, // 2 -- persists
	    neighbors, // 3 -- reproduces
	    empty, // 4 -- overpopulated
	    empty, // 5 -- overpopulated
	    empty, // 6 -- overpopulated
	    empty, // 7 -- overpopulated
	    empty // 8 -- overpopulated
	];
	var frames = 0;
	var start;
	var life = function () {
	    var i;
	    var alive;
	    var colorWidth = image.width * 4;
	    var bi = 0;
	    var colorval;
	    var oldindex;
	    var neighborsCount;
	    var basei;
	    for(i = 0; i < image.data.length + colorWidth; i += 4) {
	        var x;
	        var y;
	        neighborsCount = 0;
	        neighbors[0] = 0;
	        neighbors[1] = 1;
	        neighbors[2] = 2;
	        for(x = -1; x <=1; ++x) {
	            for(y = -1; y <= 1; ++y) {
	                basei = i + y * colorWidth + x * 4;
	                if (basei < 0) {
	                    continue;
	                }
	                if (basei > image.data.length) {
	                    continue;
	                }
	                if (x === 0 && y === 0) {
	                    self[0] = image.data[basei + 0];
	                    self[1] = image.data[basei + 1];
	                    self[2] = image.data[basei + 2];
	                    continue;
	                }
	                neighbors[0] += image.data[basei + 0];
	                neighbors[1] += image.data[basei + 1];
	                neighbors[2] += image.data[basei + 2];
	                neighborsCount +=
	                    image.data[basei + 0] +
	                    image.data[basei + 1] +
	                    image.data[basei + 2] > 0 ? 1 : 0;
	            }
	        }
	        for(x = 0; x < neighbors.length; ++x) {
	            neighbors[x] = neighbors[x] > 127 * neighborsCount ? 255 : 0;
	        }
	        colorval = neighborCases[neighborsCount];
	        bi += 4;
	        if (bi > buffer.length) {
	            bi = 0;
	        }
	        oldindex = i - colorWidth - 4;
	        if (oldindex < image.data.length) {
	            image.data[oldindex + 0] = buffer[bi + 0];
	            image.data[oldindex + 1] = buffer[bi + 1];
	            image.data[oldindex + 2] = buffer[bi + 2];
	        }
	        buffer[bi + 0] = colorval[0];
	        buffer[bi + 1] = colorval[1];
	        buffer[bi + 2] = colorval[2];
	    }
	    ++frames;
	    ctx.putImageData(image, 0, 0);
	    setTimeout(life, delay);
	};
	setInterval(function () {
	    console.log(1000 * frames / (new Date() - start));
	}, 1000);
	start = new Date();
	life();


/***/ }
/******/ ]);