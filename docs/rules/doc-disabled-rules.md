# Document Disabled Rules

Rule `doc-disabled-rules` will enforce that disabled rules have a comment immediately preceding the disabled rule.

## Examples

When enabled, the following are disallowed.

```scss
// sass-lint:disable-all
p {
  border: none;
}
// sass-lint:enable-all

// sass-lint:disable border-zero
a {
  border: none;
}

li {
  // sass-lint:disable-block border-zero
  border: none;
}

dd {
  border: none; // sass-lint:disable-line border-zero
}
```

When enabled, the following are allowed.

```scss
// Paragraphs are special ponies
// sass-lint:disable-all
p {
  border: none;
}
// sass-lint:enable-all

// We really prefer `border: none` in this file, for reasons.
// sass-lint:disable border-zero
a {
  border: none;
}

li {
  // We really prefer `border: none` in this file, for reasons.
  // sass-lint:disable-block border-zero
  border: none;
}

dd {
  // We really prefer `border: none` in this file, for reasons.
  border: none; // sass-lint:disable-line border-zero
}
```
