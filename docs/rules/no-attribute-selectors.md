# No Attribute Selectors

Rule `no-attribute-selectors` will warn against the use of attribute selectors.

## Examples

When enabled, the following are disallowed:

```scss
[autoplay] {
  content: 'foo';
}

[lang=en] {
  content: 'bar';
}

[lang~=en-us] {
  content: 'baz';
}

[lang|=us] {
  content: 'qux';
}

[href^="#"] {
  content: 'norf';
}

[href$=".com"] {
  content: 'foo';
}

[href*=news] {
  content: 'bar';
}
```
