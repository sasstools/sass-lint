# Brace Style

Rule `brace-style` will enforce the use of the chosen brace style.

## Options

* `style`: [`'1tbs'`](https://en.wikipedia.org/wiki/Indent_style#Variant:_1TBS), [`'stroustrup'`](https://en.wikipedia.org/wiki/Indent_style#Variant:_Stroustrup), [`'allman'`](https://en.wikipedia.org/wiki/Indent_style#Allman_style) (defaults to `1tbs`)
* `allow-single-line`: `true`/`false` (defaults to `true`)

## Examples

### `style`

When `style: '1tbs'` or `style: 'stroustrup'`, the following are allowed. When `style: 'allman'` the following are disallowed:

```scss
.foo {
  content: 'foo';
}

.foo,
.bar {
  content: 'bar';
}

@function foo() {
  @return 'foo';
}

@mixin bar() {
  content: 'bar';
}
```

When `style: 'allman'`, the following are allowed. When `style: '1tbs'` or `style: 'stroustrup'`, the following are disallowed:


```scss
.foo
{
  content: 'foo';
}

.foo,
.bar
{
  content: 'bar';
}

@function foo()
{
  @return 'foo';
}

@mixin bar()
{
  content: 'bar';
}

```


#### Differences between `1tbs` and `stroustrup`

When `style: '1tbs'`, the following are allowed. When `style: 'stroustrup'` or `style: 'allman'`, the following are disallowed:

```scss
@if ($foo) {
  $bar: 'bar';
} @else {
  $bar: false;
}
```

When `style: 'stroustrup'`, the following are allowed. When `style: '1tbs'` or `style: 'stroustrup'`, the following are disallowed:

```scss
@if ($foo) {
  $bar: 'bar';
}
@else {
  $bar: false;
}
```

---

### `allow-single-line`

When `allow-single-line: true`, the following are allowed. When `allow-single-line: false`, the following are disallowed:

```scss
.foo { content: 'foo'; }
.foo, .bar { content: 'bar'; }

@if ($foo) { $bar: 'foo'; }

// Allowed with style: '1tbs', disallowed with style: 'stroustrup' or style: 'allman'
@if ($foo) { $bar: 'foo'; } @else { $bar: false; }

// Allowed with style: 'stroustrup' or style: 'allman', disallowed with style: '1tbs'
@if ($foo) { $bar: 'foo'; }
@else { $bar: false; }
```
