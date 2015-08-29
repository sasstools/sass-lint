# Property Sort Order

Rule `property-sort-order` will enforce the order in which declarations are written.

## Options

* `order`: `'alphabetical'` or array of properties (defaults to `alphabetical`. Unknown properties from array are sorted alphabetically)

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
