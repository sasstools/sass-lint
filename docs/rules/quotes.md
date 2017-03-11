# Quotes

Rule `quotes` will enforce whether single quotes (`''`) or double quotes (`""`) should be used for all strings.
You can specify a different value for attribute selectors.

## Options

* `style`: `single`/`double` (defaults to `single`)
* `attribute`: `single`/`double` (defaults to `single`)

## Examples

When `style: single`, the following are allowed. When `style: double`, the following are disallowed:

```scss
.foo {
  content: 'bar';
}
```

When `style: double`, the following are allowed. When `style: single`, the following are disallowed:

```scss
.foo {
  content: "bar";
}
```

When `attribute: single`, the following are allowed. When `attribute: double`, the following are disallowed:

```scss
[class='foo'] {
  color: red;
}
```

When `attribute: double`, the following are allowed. When `attribute: single`, the following are disallowed:

```scss
[class="foo"] {
  color: red;
}
```
