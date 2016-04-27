# No Color Literals

Rule `no-color-literals` will disallow the use of color literals and basic color functions in any declarations other than variables or maps/lists.

The list of affected color functions are as follows:
* `rgb`
* `rgba`
* `hsl`
* `hsla`

Other color functions, such as `adjust-color` and `mix`, may be used, but the original color must be passed in as a variable.

## Options

* `allow-map-identifiers`: `true`/`false` (defaults to `true`)
* `allow-rgba`: `true`/`false` (defaults to `false`)
* `allow-variable-identifiers`: `true`/`false` (defaults to `true`)

## Examples

When enabled and default options are used the following are disallowed.

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

// rgb function passed directly as function argument
.adj {
  color: adjust-color(rgb(255, 0, 0), $blue: 5);
}

// hsl function passed directly as function argument
.scale {
  color: scale-color(hsl(120, 70%, 80%), $lightness: 50%);
}

// hsl function passed directly as function argument
.change {
  color: change-color(hsl(25, 100%, 80%), $lightness: 40%, $alpha: .8);
}

// color literal passed directly as function argument
.function {
  color: test(#fff);
}

// color functions used directly as property values
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

```

When enabled and default options are used the following are allowed.

```scss
$literal: mediumslateblue;
$hexVar: #fff;
$rgb: rgb(255, 255, 255);
$rgba: rgba(255, 255, 255, .3);
$hsl: hsl(40, 50%, 50%);
$hsla: hsla(40, 50%, 50%, .3);

// using color literals as property names
$colors: (
  red: #fff,
  blue : (
    orange: #fff
  )
);

// using color literals as variable identifiers
$black: #000;

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

---

## [allow-rgba: true]

When enabled and `allow-rgba` is set to `true`, the following will be allowed:

```scss
// rgba in variables is still fine
$rgba: rgba(255, 0, 0, .5);
$red: rgb(255, 255, 255,);

// rgba can be used directly to alter a variables opacity
.color {
  color: rgba($red, .3);
}
```

In addition, when enabled and `allow-rgba` is set to `true`, the following will be disallowed:

```scss
.color {
  // you must use variables and not literals
  color: rgba(0, 0, 0, .3);
  color: rgba(black, .3);
}
```

---

## [allow-variable-identifiers: false]

When enabled and `allow-variable-identifiers` is set to `false`, the following will be disallowed

```scss

// variable uses a color literal as an identifier
$black: #000

// variable using a color literal as an identifier is passed to a function
.test {
  color: adjust-color($off-red, $blue: 5)
}

```

When enabled and `allow-variable-identifiers` is set to `false`, the following will be allowed

```scss

// variable not directly using a color literal as an identifier
$primary-black: #000

```

---

## [allow-map-identifiers: false]

When enabled and `allow-map-identifiers` is set to `false`, the following will be disallowed

```scss

// map identifiers red, blue and orange share their name with a
// color literal and therefore shouldn't be used
$colors: (
  red: #f00,
  blue: (
    orange: $orange
  )
)

```

When enabled and `allow-map-identifiers` is set to `false`, the following will be allowed

```scss

$colors: (
  primary-red: #f00,
  map-blue: (
    off-orange: $orange
  )
)

```
