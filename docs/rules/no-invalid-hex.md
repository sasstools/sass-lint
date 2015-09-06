# No Invalid Hex

Rule `no-invalid-hex` will enforce that only valid of hexadecimal values are written.

## Examples

When enabled any invalid hexadecimal characters will generate a warning/error:

```scss

// must be 3 or 6 characters
$invalid-long: #1234567;
$invalid-med: #1234;
$invalid-short: #12;
$invalid-letters-long: #abcdefg;
$invalid-letters-med: #abcd;
$invalid-letters-short: #ab;
$invalid-mixed-long: #1bcdefg;
$invalid-mixed-med: #1bcd;
$invalid-mixed-short: #1b;
$invalid-mixed-letters-long: #abcdef7;
$invalid-mixed-letters-med: #abc4;
$invalid-mixed-letters-short: #a1;

// mustn't contain invalid characters
$invalid-character-map: (
  invalid-characters-upper-letters: #GHIJKL,
  invalid-characters-upper-letters-short: #GHI,
  even-more-invalid-map: (
    invalid-characters-lower-letters-short: #ghijkl,
    invalid-characters-lower-letters-short: #ghi
  )
);
```
