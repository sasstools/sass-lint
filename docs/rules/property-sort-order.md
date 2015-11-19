# Property Sort Order

Rule `property-sort-order` will enforce the order in which declarations are written.

## Options

* `order`: `'alphabetical'`, [`'concentric'`](http://rhodesmill.org/brandon/2011/concentric-css/), [`'recess'`](http://twitter.github.io/recess/), [`'smacss'`](http://smacss.com/book/formatting), or `[array of properties]` (defaults to `alphabetical`. Unknown properties are sorted alphabetically)
* `ignore-custom-properties`: `true`/`false` (defaults to `false`)

Property orders: https://github.com/sasstools/sass-lint/tree/develop/lib/config/property-sort-orders

## Examples

When enabled (assuming `order: alphabetical`), the following are allowed:

```scss
.foo {
  content: 'baz';
  height: 100vh;
  width: 100vw;
}
```

When enabled (assuming `order: alphabetical`), the following are disallowed:

```scss
.foo {
  width: 100vw;
  height: 100vh;
  content: 'baz';
}
```

### Custom Sort Orders

You have the option to create your own custom property sort orders. These are specified in your `.sass-lint.yml` file as below:

```yaml
property-sort-order:
  - 1
  -
    order:
      - border
      - display
      - color
```

When the custom order is specified as above, the following are allowed:

```scss
.foo {
  border: 1px solid blue;
  display: block;
  color: red;
}
```

When the custom order is specified as above, the following are disallowed:

```scss
.foo {
  display: block;
  color: red;
  border: 1px solid blue;
}
```

### Ignore Custom Properties

When `ignore-custom-properties: false` (assume `order: 'alphabetical'`) the following would be allowed

```scss
.foo {
  border: 1px solid blue;
  color: red;
  composes: heading;
  display: block;
}
```

When `ignore-custom-properties: false` (assume `order: 'alphabetical'`) the following would be disallowed

```scss
.foo {
  composes: heading; // not in alphabetical order
  border: 1px solid blue;
  color: red;
  display: block;
}
```

When `ignore-custom-properties: true` (assume `order: 'alphabetical'`) the following would be allowed

```scss
.foo {
  composes: heading; // custom properties ignored
  border: 1px solid blue;
  color: red;
  display: block;
}
```
