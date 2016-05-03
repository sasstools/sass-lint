# No Universal Selector

Rule `no-universal-selector` will enforce that the `*` (universal) selector is not allowed to be used.

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
