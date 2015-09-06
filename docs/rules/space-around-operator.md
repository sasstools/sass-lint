# Space Around Operator

Rule `space-around-operator` will enforce operators to be formatted with a single space on both sides of an infix operator. These include `+`, `-`, `*`, `/`, `%`, `==`, `!=`, `>`, `>=`, `<`, and `<=`.

Note that this linter only applies to actual, evaluated operators. So values like `nth-child(2n+1)` will not be disallowed.


## Examples

When enabled, the following are allowed:

```scss
.bar {
  font: 16px / 24px Arial sans-serif;
  margin: 5px + 5px;
}
```

When enabled, the following are disallowed:

```scss
.bar {
  margin: 5px   +   5px;
  font: 16px/24px Arial sans-serif;
}
```

