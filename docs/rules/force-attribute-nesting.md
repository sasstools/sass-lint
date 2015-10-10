# Force Attribute Nesting

Rule `force-attribute-nesting` will enforce the nesting of attributes


## Examples

When enabled, the following are disallowed:
```scss
input[type='radio'] {
  color: red;
}

a[target='_blank'] {
  content: '';
}

.form {
  .class input[type='text'] {
    padding: 0;
  }
}
```

When enabled, the following are allowed:

```scss
input {
  &[type='radio'] {
    color: red;
  }
}

a {
  &[target='_blank'] {
    content: '';
  }
}

.form {
  .class input {
    &[type='text'] {
      padding: 0;
    }
  }
}
```
