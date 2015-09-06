# No CSS Comments

Rule `no-css-comments` will enforce the use of Sass single-line comments and disallow CSS comments.

## Options

* `allowed`: `regular expression`

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
