# Max Line Length

Rule `max-line-length` will enforce that lines do not exceed a max length / limit.

## Options

* `length`: `number`, (defaults to 80)

## Examples

When enabled, the following are disallowed:

```scss
.really--long--class-name--that-unfortunately--isnt--very--succint--and-looks-stupid {
  color: red;
}

// ==============================================================================
//
// This comment is too long clearly, we should probably make sure we have a rule to
// determine when we breach this length
//
// ==============================================================================
```
