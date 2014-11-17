beforeEach(function() {
  var mock = document.createElement('div');
  mock.className = 'slider-wrapper';
  mock.innerHTML = '<div class="slider"><div class="slide"><img src="http://s.glbimg.com/es/ge/f/original/2014/11/12/fellipe1.png" /></div><div class="slide"><img src="http://s.glbimg.com/es/ge/f/original/2014/11/06/caio.jpg" /></div><div class="slide"><img src="http://s.glbimg.com/es/ge/f/original/2014/11/12/eduardo.jpg" /></div></div>';

  document.querySelector('body').appendChild(mock);

  var slider = new window.SliderTouchable({
    'element':  '.slider-wrapper',
    'slider':   '.slider',
    'deadline': 150
  });
});

describe('Instance', function() {
  var SliderTouchable = window.SliderTouchable;

  it('should be in window object', function() {
    expect(SliderTouchable).toBeDefined();
  });

  it('should be a function', function() {
    isFunction = typeof SliderTouchable === 'function';
    expect(isFunction).toBeTruthy();
  });
});