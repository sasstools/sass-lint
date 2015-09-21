# No Misspelled Properties

Rule `no-misspelled-properties` will enforce the correct spelling of CSS properties and prevent the use of unknown CSS properties.

## Options

* `extra-properties`: `[array of extra properties to check spelling against]` (defaults to empty array `[]`).

## Examples

When enabled, the following are disallowed:

```scss

// incorrect spelling
.foo {
  borders: 0;
}

// unknown property
.bar {
  border-right-left: 0;
}

// incorrect spelling
.baz {
  -webkit-transit1on: width 2s;
}
```


When `extra-properties` contains a property value of `transit1on` as show below:

```yaml
no-misspelled-properties:
  - 1
  -
    'extra-properties':
      - 'transit1on'
```

The following would now be allowed:

```scss

// incorrect spelling now whitelisted
.baz {
  -webkit-transit1on: width 2s;
}

// incorrect spelling now whitelisted
.quz {
  transit1on: width 2s;
}
```

While the following would remain disallowed:

```scss

// incorrect spelling
.foo {
  borders: 0;
}

// unknown property
.bar {
  border-right-left: 0;
}

```
