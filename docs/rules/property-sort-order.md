# Property Sort Order

Rule `property-sort-order` will enforce the order in which declarations are written.

## Options

* `order`: `'alphabetical'`, [`'concentric'`](http://rhodesmill.org/brandon/2011/concentric-css/), [`'recess'`](http://twitter.github.io/recess/), [`'smacss'`](http://smacss.com/book/formatting), or `[array of properties]` (defaults to `alphabetical`. Unknown properties are sorted alphabetically)

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
