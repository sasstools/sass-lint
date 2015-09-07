# No CSS Comments

Rule `no-css-comments` will enforce the use of Sass single-line comments and disallow CSS comments. Bang comments (`/*! */`, will be printed even in minified mode) are still allowed.

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

/*! This is a good bang comment */

/*!
  * This is a good bang comment
**/
```

When enabled the following are disallowed:

```scss

/* This comment will appear in your compiled css */

/*
 * Mulitline comments are bad
 */
```
