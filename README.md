# snowfall.js

### A lightweight Javascript library for creating snowfall effect.

-----------------------------
# Author
### [Spiff Jekey-Green](http://spiffjg.herokuapp.com)

-----------------------------
### `Demo`
Codepen demo <br>
http://codepen.io/SpiffJekeyGreen/pen/dj3

-----------------------------

### `Usage`

Load snowfall.js and configure the snow-particles

__index.html__
```html
<script src="snowfall.js"></script>
<script src="app.js"></script>

<div id="snow-board"></div>
```

__app.js__
```javascript
var canvas_values = {
    container: "snow-cont",
    density: 100,
    particleSize: 5,
    containerWidth: "100%",
    containerHeight: "800px",
};

var canvasFall = new SnowFall.Canvas(canvas_values);
canvasFall.init();
```

------------------------------
### `Snowfall Methods`
Below are the methods with which the snowfall effect could be established.
* *SnowFall.Canvas( )*
* *SnowFall.Image( )*
* *SnowFall.Text( )*
* *SnowFall.Svg( )*
* *SnowFall.Icon( )*


-------------------------------
### `Options`

| key             | type      | use case            | example       | required |
| --------------- | --------- | ------------------- | ------------- | -------- |
| `container`       | string    | `*` | `"snow-board"` | `true` |
| `density` | number | Icon, Canvas, Svg | `100`, `80` | `false` |
| `size` | number | Text, Image | `22` | `false` |
| `particleSize` | number | Canvas, Svg | `5` | `true` |
| `src` | string | Image | `"http://cdn.example.com/util/snow1.png"` | `true` |
| `containerWidth` | string | Canvas | `"100%"` | `true` |
| `containerHeight` | string | Canvas | `"500px"` | `true` |
| `speed` | number | `*` | `700` | `false` |
| `text` | string | Text | `"*"` | `true` |
| `color` | string | `*` | `"#ffffff"` | `false` |
| `background` | string | `*` | `"#333"` | `false`|
| `tagIcon` | string | Icon | `"<i class='fa fas-lock'></i>"` | `true` |



------------------------------
### `Hosting / CDN`
__*Please use this host or your own to load snowfall.js on your projects*__

[http://www.jsdelivr.com/#!snowfall.js](http://www.jsdelivr.com/#!snowfall.js)

