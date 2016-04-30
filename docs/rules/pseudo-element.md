# Pseudo-element

Rule `pseudo-element` will enforce that:

* Pseudo-**elements** must start with **double colons**.
* Pseudo-**classes** must start with **single colon**.

## Examples

When enabled, the following are allowed:

```scss
.foo::before {
  content: "bar";
}

.foo:hover {
  content: "bar";
}
```

When enabled, the following are disallowed:

```scss
.foo:before {
  content: "bar";
}

.foo::hover {
  content: "bar";
}
```
