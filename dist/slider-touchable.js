(function(global, d) {
	'use strict';

	var SliderTouchable = function(params) {
		if (!params) throw 'You need to pass a few parameters!';
		if (! ('element' in params)) throw 'You need to pass a \'element\' parameter to find slider wrapper!';
		if (! ('slider' in params)) throw 'You need to pass a \'slider\' parameter to find slider element!';

		this._config(params);
	};

	SliderTouchable.prototype = {
		_params: 		{ },
		_isTouched: 	false,
		_element: 		undefined,
		_wrapperWidth: 	undefined,
		_totalWidth: 	undefined,
		_limitRigth: 	undefined,
		_slider: 		undefined,
		_startX: 		undefined,
		_oldCurrent: 	undefined,
		_limitLeft: 	0,
		_current: 		0,
		_sliderOffset: 	0, 
		_deadline: 		100,

		_transitionProperies: ['transition', 'webkitTransition', 'MozTransition', 'msTransition', 'oTransition'],
		_transformProperies:  ['transform', 'webkitTransform', 'MozTransform', 'msTransform', 'oTransform'],


		_toLeft: function() {
			if (this._current < this._limitRight) {
				this._oldCurrent = this._current;
				++this._current;
				this._updateSlider();
			}
		},

		_toRight: function() {
			if (this._current > this._limitLeft) {
			  	this._oldCurrent = this._current;
			    --this._current;
				this._updateSlider();
			}
		},

		_stay: function() {
			this._updateSlider();
		},

		_updateSlider: function() {
			var newValue = this._getSliderOffset();
			this._setTransform(newValue);
			this._slider.attributes['data-position'].value = this._current;
		},

		_getSliderOffset: function() {
			return this._wrapperWidth * this._current;
		},

		_setTransition: function(transition) {
			var _transition = transition;

			for (var i=0; i < this._transitionProperies.length; i++) {
				var item = this._transitionProperies[i];

				if (typeof this._slider.style[item] !== 'undefined')
					this._slider.style[item] = _transition;
			}
		},

		_setTransform: function(translateValue) {
			var _translateValue = 'translateX('+ -translateValue +'px)';

			for (var i=0; i < this._transformProperies.length; i++) {
				var item = this._transformProperies[i];

				if (typeof this._slider.style[item] !== 'undefined')
					this._slider.style[item] = _translateValue;
			}
		},

		_bindEvents: function() {
			var self = this,
				handlers;
			
			handlers = {
				touchstart: function(e) {
					var touches = e.changedTouches;

					if (!self._isTouched && touches.length === 1) {
					  self._isTouched = true;
					  self._startX = touches[0].pageX;
					}
				},

				touchend: function(e) {
					if (!self._isTouched) return;

					var offset,
						endSliderX,
						touches = e.changedTouches;

					self._setTransition('');

					endSliderX = touches[0].pageX;
					offset = Math.abs(endSliderX - self._startX);

					if 		((endSliderX > self._startX) && (offset > self._deadline) && (self._current > self._limitLeft)) self._toRight();
					else if ((endSliderX < self._startX) && (offset > self._deadline) && (self._current < self._limitRight)) self._toLeft();
					else 	self._stay();

					self._sliderOffset = self._getSliderOffset();
					self._isTouched = false;
				},

				touchmove: function(e) {
					e.preventDefault();

					var touches = e.changedTouches,
					    translateValue,
						pageX = touches[0].pageX,
					    diff = self._startX - pageX;

					self._isTouched = touches.length === 1 ? true : false;

					if (touches.length === 1 && self._isTouched) {
						self._setTransition('none');
						translateValue = (self._wrapperWidth * self._current) + diff;

						if ((translateValue > -self._deadline) && (translateValue < self._totalWidth + self._deadline))
							self._setTransform(translateValue);

					} else {
						return;
					}
				}
			};

			this._slider.addEventListener('touchstart', handlers.touchstart);
			this._slider.addEventListener('touchend', handlers.touchend);
			this._slider.addEventListener('touchmove', handlers.touchmove);
		},

		_config : function(params) {
			this._params = params;
			this._element = d.querySelector(this._params.element);
			this._wrapperWidth = this._element.offsetWidth;
			this._slider = this._element.querySelector(this._params.slider);
			this._limitRight = this._slider.childElementCount - 1;
			this._totalWidth = this._wrapperWidth * this._limitRight;
			this._deadline = ('deadline' in params) ? params.deadline : 100;
			this._sliderOffset = this._getSliderOffset();

			if (this._slider.attributes['data-position']) {
				this._current = parseInt(this._slider.attributes['data-position'].value, 10);
			} else {
				this._current = 0;
				this._slider.setAttribute('data-position', 0);
			}

			this._setTransition('none');
			this._updateSlider();
			this._bindEvents();
		}
	};


	global.SliderTouchable = function(params) {
		return new SliderTouchable(params);
	};

}(window, document));

// var slider = window.SliderTouchable({
// 	'element': 	'.slider-wrapper',
// 	'slider': 	'.slider',
// 	'deadline': 150
// });