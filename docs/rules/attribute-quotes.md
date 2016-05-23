# Attribute Quotes

Rule `attribute-quotes` will enforce the use of the use of quotes in attribute values.

## Options

* `include`: `true`/`false` (defaults to `true`)

## Examples

### `include`

When `include: true`, the following are allowed. When `include: false`, the following are disallowed:

```scss

span[lang="pt"] {
  color: green;
}

span[lang~="en-us"] {
  color: blue;
}

span[class^="main"] {
  background-color: yellow;
}

a[href*="example"] {
  background-color: #CCCCCC;
}

input[type="email" i] {
  border-color: blue;
}
```

When `include: false`, the following are allowed. When `include: true`, the following are disallowed:

```scss

span[lang=pt] {
  color: green;
}

span[lang~=en-us] {
  color: blue;
}

span[class^=main] {
  background-color: yellow;
}

a[href*=example] {
  background-color: #CCCCCC;
}

input[type=email i] {
  border-color: blue;
}
```
