# Declarations Before Nesting

Rule `declarations-before-nesting` will enforce that declarations should be written before nesting in a ruleset.

## Examples

When enabled, the following are allowed:

```scss
.foo {
  content: 'baz';

  .bar {
    content: 'qux';
  }
}
```

When enabled, the following are disallowed:

```scss
.foo {
  .bar {
    content: 'qux';
  }
  
  content: 'baz';
}
```
