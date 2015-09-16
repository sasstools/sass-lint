# No Qualifying Elements

Rule `no-qualifying-elements` will enforce that selectors are not allowed to have qualifying elements.

## Options

* `allow-element-with-attribute`: `true`/`false` (defaults to `false`)
* `allow-element-with-class`: `true`/`false` (defaults to `false`)
* `allow-element-with-id`: `true`/`false` (defaults to `false`)

## Examples

By default, the following are disallowed:

```scss
div.foo {
  content: 'foo';
}

ul#foo {
  content: 'foo';
}

input[type='email'] {
  content: 'foo';
}
```

### `allow-element-with-attribute`

When `allow-element-with-attribute: true`, the following are allowed. When `allow-element-with-attribute: false`, the following are disallowed.

```scss
input[type='email'] {
  content: 'foo';
}

a[href] {
  content: 'foo';
}
```

### `allow-element-with-class`

When `allow-element-with-class: true`, the following are allowed. When `allow-element-with-class: false`, the following are disallowed.

```scss
div.foo {
  content: 'foo';
}

h1.bar {
  content: 'foo';
}
```

### `allow-element-with-id`

When `allow-element-with-id: true`, the following are allowed. When `allow-element-with-id: false`, the following are disallowed.

```scss
ul#foo {
  content: 'foo';
}

p#bar {
  content: 'foo';
}
```
