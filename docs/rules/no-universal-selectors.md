# No Universal Selectors

Rule `no-universal-selectors` will warn against the use of `*` (universal) selectors.

## Examples

When enabled, the following are disallowed:

```scss
* {
  content: 'foo';
}

* [lang^=en] {
  content: 'bar';
}

*.warning {
  content: 'baz';
}

*#maincontent {
  content: 'qux';
}

*:before,
*:after {
  content: 'norf';
}
```
