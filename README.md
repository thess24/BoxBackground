# BoxBackground
BoxBackground is a library to build backgrounds consisting of columns and rows of colored rectangles that dynamically change.


#### Tech Overview

- D3.js
- Javascript
 
#### Features

- Adjusts to size of screen
- Dynamically updating cells
- Ability to change cell size, color, etc.

#### Basic Example 

![ScreenShot](https://raw.githubusercontent.com/thess24/BoxBackground/master/screenshots/example.gif)
 
 ```html
<svg id='graph'></svg>

<script type="text/javascript" src="js/d3.min.js"></script>
<script type="text/javascript" src="js/BoxBackground.js"></script>

<script type="text/javascript">
    var args = { 
         element:document.querySelector('#graph'),
         displayType:'rain',
         lagTime:700
    };
    BoxBackground.Graph( args );
</script>
```

#### Arugments
 
###### element (required)

- accepts DOM element associated with svg

###### height

- the height of the background (int)

###### cellWidth

- the width of an individual cell (int)

###### cellHeight

- the height of an individual cell (int)

###### cellSpace

- the space in a between cells (int)

###### lagtime

- the lag time between cell changes (int)

###### displayType

- the type of 'display' in the background (string, accepts one)
  - click - cells change color by clicking them
  - slowfade - random cells will fade in and out
  - rain - color changes will cascade down columns

###### mainColor
 
- the base color of the cells (string)


#### Want to Help?

Contributors are welcome! Here are some things I haven't gotten around to yet:
- adding more displayTypes
- updating on screen resize
