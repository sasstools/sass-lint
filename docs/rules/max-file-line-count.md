# Max File Line Count

Rule `max-file-line-count` will enforce that a file's length doesn't exceed a certain number of lines

## Options

* `length`: `number`, (defaults to 300)

## Examples

When enabled, the following are disallowed:

```scss
/*
* line count is represented along the
* left hand side of the following example
*/
  1| .test {
  2|   color: red
  3| }
=====
~ snip ~
=====
299| .bar {
300|   color: blue;
301| }
```
