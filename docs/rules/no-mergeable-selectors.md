# No Mergeable Selectors

Rule `no-mergeable-selectors` will enforce that selectors aren't repeated and that their properties are merged. You may also pass a whitelist of selectors you wish to exclude from merging.

## Options

* `whitelist`: `[array of selectors]` (defaults to empty array `[]`)

## Examples

When `enabled` with the default options, the following will generate a warning/error :

```scss
.foo {
  content: 'bar';
}

//duplicate selector
.foo {
  color: red;
}

h1,
h2,
h3 {
  content: '';
}

// mergeable idents
h1, h2, h3 {
  content: '';
}

.test {
  .bar {
    color: blue;
  }
}

// 2 mergeable selectors .test & .test .bar
.test {
  .bar {
    color: red;
  }
}
```

When `whitelist: ['div p', 'div a']` the following will be allowed and no longer generate any mergeable warnings or errors:

```scss
div p {
  color: red;
}

// will not be warned as mergeable / duplicate
div p {
  content: '';
}

div a {
  color: blue;
}

// will not be warned as mergeable / duplicate
div a {
  content: '';
}
```
