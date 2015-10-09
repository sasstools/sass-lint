# Force Element Nesting

Rule `force-element-nesting` will enforce the nesting of elements

## Examples

When enabled, the following are disallowed:

```scss
div p {
  content: '';
}

.parent {
  &__child h1 {
    content: '';
  }
}

a[target="_blank"] span {
  content: '';
}
```

When enabled, the following are allowed:

```scss
div {
  p {
    content: '';
  }
}

.parent {
  &__child {
    h1 {
      content: '';
    }
  }
}

a[target="_blank"] {
  span {
    content: '';
  }
}
```
