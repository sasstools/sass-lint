# Force Pseudo Nesting

Rule `force-pseudo-nesting` will enforce the nesting of pseudo elements/classes.


## Examples

When enabled, the following are disallowed:
```scss
p:nth-of-type(2) {
  margin: 0;
}

.parent {
  .child {
    p::first-line {
      color: #ff0000;
    }
  }
}

.parent {
  .child {
    .sub p::first-line {
      color: #ff0000;
    }
  }
}
```

When enabled, the following are allowed:

```scss
p {
  &:nth-of-type(2) {
    margin: 0;
  }
}

.parent {
  .child {
    p {
      &::first-line {
        color: #ff0000;
      }
    }
  }
}

.parent {
  .child {
    .sub p {
      &::first-line {
        color: #ff0000;
      }
    }
  }
}
```
