# Brace Style

Rule `brace-style` will enforce the use of the chosen brace style.

## Options

* `style`: [`'1tbs'`](https://en.wikipedia.org/wiki/Indent_style#Variant:_1TBS), [`'stroustrup'`](https://en.wikipedia.org/wiki/Indent_style#Variant:_Stroustrup), [`'allman'`](https://en.wikipedia.org/wiki/Indent_style#Allman_style)

## Examples

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

---
### Differences between `1tbs` and `stroustrup`

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
