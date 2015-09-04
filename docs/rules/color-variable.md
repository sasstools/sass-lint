# Color Variable

Rule `color-variable` will disallow the use of color literals and basic color functions in any declarations other than variables or maps/lists.

Variables should always be used to define colors as defining them directly onto properties can make your code hard to manage / update and maintain.

Using the names of css color literals such as `red` for map property names is also not good and should be avoided.

The list of affected color functions are as follows:
* rgb
* rgba
* hsl
* hsla

You can still use functions such as `adjust-color` but you must pass the original color in as a variable.

## Options

* There are no configurable options

## Examples

When `enabled`, the following are disallowed. When `disabled`, the following are allowed:

```scss
.literal {
  color: mediumslateblue;
}

.linear-gradient-func {
  background: linear-gradient(top, #fff, white);
}

.box-shadow {
  box-shadow: 1px 1px black, 1px 1px black;
}

.background {
  background: 1px solid white;
}

.hex {
  color: #fff;
}

.adj {
  color: adjust-color(rgb(255, 0, 0), $blue: 5);
}

.scale {
  color: scale-color(hsl(120, 70%, 80%), $lightness: 50%);
}

.change {
  color: change-color(hsl(25, 100%, 80%), $lightness: 40%, $alpha: .8);
}

.function {
  color: test(#fff);
}

.rgb {
  color: rgb(255, 255, 255);
}

.rgba {
  color: rgba(255, 255, 255, .3);
}

.hsl {
  color: hsl(40, 50%, 50%);
}

.hsla {
  color: hsla(40, 50%, 50%, .3);
}

//  using color literals as property names
$colors: (
  red: #fff,
  blue : (
    orange: #fff
  )
);
```

When `enabled`, the following are allowed.

```scss
$literal: mediumslateblue;
$hexVar: #fff;
$rgb: rgb(255, 255, 255);
$rgba: rgba(255, 255, 255, .3);
$hsl: hsl(40, 50%, 50%);
$hsla: hsla(40, 50%, 50%, .3);

.literal {
  color: $literal;
}

.linear-gradient-func {
  background: linear-gradient(top, $hexVar, $literal);
}

.background {
  background: 1px solid $literal;
}

.hex {
  color: $hexVar;
}

.adj {
  color: adjust-color($off-red, $blue: 5);
}

.scale {
  color: scale-color($off-blue, $lightness: 50%);
}

.change {
  color: change-color($orange-extra, $lightness: 40%, $alpha: .8);
}

.function {
  color: test($hexVar);
}

.rgb {
  color: $rgb;
}

.rgba {
  color: $rgba;
}

.hsl {
  color: $hsl;
}

.hsla {
  color: $hsla;
}
```
