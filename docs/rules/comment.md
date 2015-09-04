# Comment

Rule `comment` will enforce the comment style used, preventing the use of multiline comments which would appear in your compiled CSS.

## Options

* `allowed`: regEx - regular expression

e.g.

`allowed: '^[\/* ]*Bad'`

## Examples

When enabled the following are allowed:

```scss

// This is a good comment

// =========
// This is a good comment
// =========

//////////////////
// This is a good comment
//////////////////
```

When enabled the following are disallowed:

```scss

/* This comment will appear in your compiled css */

/*
 * Mulitline comments are bad
 */
```

When enabled and a regular expression is passed to the allowed option you can bypass the linter

```yaml
comment:
  - 1
  -
    allowed
     - '/\* Allowed Comment'
```

```scss
/*
 * Allowed Comment
 */
```
