var createMock = function() {
  var mock = document.createElement('div');
  mock.className = 'slider-wrapper';
  mock.innerHTML = '<div class="slider"><div class="slide"><img src="http://s.glbimg.com/es/ge/f/original/2014/11/12/fellipe1.png" /></div><div class="slide"><img src="http://s.glbimg.com/es/ge/f/original/2014/11/06/caio.jpg" /></div><div class="slide"><img src="http://s.glbimg.com/es/ge/f/original/2014/11/12/eduardo.jpg" /></div></div>';

  document.querySelector('body').appendChild(mock);
}

describe('Instance', function() {
  beforeEach(function() {
    createMock();
  });

  it('should be in window object', function() {
    expect(SliderTouchable).toBeDefined();
  });

  it('should be a function', function() {
    isFunction = typeof SliderTouchable === 'function';
    expect(isFunction).toBeTruthy();
  });

  it('should throw a exeption when \'element\' or \'slider\' is not passed', function() {
    var slider1 = function() {
      return new window.SliderTouchable({
        'element': ''
      });
    };

    var slider2 = function() {
      return new window.SliderTouchable({});
    };

    var slider3 = function() {
      return new window.SliderTouchable({
        'slider':''
      });
    };

    var slider4 = function() {
      return new window.SliderTouchable({
        'element': '.slider-wrapper',
        'slider': '.slider'
      });
    };

    expect(slider1).toThrow(); // element empty and missing slider class
    expect(slider2).toThrow(); // missing element and slider class
    expect(slider3).toThrow(); // slider empty and missing element class
    expect(slider4).not.toThrow(); // pass
  });
});

