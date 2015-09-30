# No Mergeable Selectors

Rule `no-mergeable-selectors` will enforce that selectors aren't repeated and that their properties are merged. With the options provided it can also
enforce the nesting of selectors, pseudo elements/classes and attributes. You may also pass a whitelist of selectors you wish to exclude from merging
though this whitelist will not affect the warnings surrounding nesting.

## Options

* `force-element-nesting`: `true`/`false` (defaults to `true`)
* `force-attribute-nesting`: `true`/`false` (defaults to `true`)
* `force-pseudo-nesting`: `true`/`false` (defaults to `true`)
* `whitelist`: `[array of selectors]` (defaults to empty array `[]`)

## Examples

When `enabled` with the defualt options, the following will generate a warning/error :

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

When `force-element-nesting: true`, the following are disallowed. When `force-element-nesting: false`, the following are allowed:

```scss
// .bar is a nestable selector
.foo .bar {
  content: "bar";
}

// h2 is a nestable selector
div h2 {
  color: red;
}

// .baz is a nestable selector
.foo {
  .bar .baz {
    content: '';
  }
}
```

When `force-attribute-nesting: true`, the following are disallowed. When `force-attribute-nesting: false`, the following are allowed:

```scss
// the attribute [type="text"] should be nested with a parent selector '&[type="text"]'
input[type="text"] {
  content: "bar";
}
```

When `force-pseudo-nesting: true`, the following are disallowed. When `force-pseudo-nesting: false`, the following are allowed:

```scss
// the pseudo element ::first-line should be nested with a parent selector '&::first-line'
p::first-line {
    color: #ff0000;
    font-variant: small-caps;
}

// the pseudo class `:read-only` should be nested with a parent selector `&:read-only`
input:read-only {
  content: '';
}

// the pseudo class `:nth-of-type(2)` should be nested with a parent selector `&:nth-of-type(2)`
p:nth-of-type(2) {
  margin: 0;
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
