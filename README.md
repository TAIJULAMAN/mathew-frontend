# Conditional rendering

Your components will often need to display different things depending on different conditions. In React, you can conditionally render JSX using JavaScript syntax like if statements, &&, and ? : operators.

In React, **conditional rendering** lets you show or hide UI elements based on certain conditions—usually controlled by **props**, **state**, or **logic**.

## Basic `if` Statement

```jsx
 function Greeting({ isLoggedIn }) {
  if (isLoggedIn) {
    return <h1>Welcome back!</h1>;
  }
  return <h1>Please sign in.</h1>;
}

```

## Ternary Operator (Inline Conditions)

Good for short conditions. Avoid nesting ternaries — it becomes unreadable.

```jsx
function Greeting({ isLoggedIn }) {
  return (
    <h1>
      {isLoggedIn ? "Welcome back!" : "Please sign in."}
    </h1>
  );
}
```

## `&&` Operator (Render if True Only)

Use `&&` when you want to render something **only if** the condition is `true`.

```jsx
function Cart({ items }) {
  return (
    <div>
      <h2>Your Cart</h2>
      {items.length > 0 && <p>You have {items.length} items.</p>}
    </div>
  );
}
```

## `null` as a Fallback (Render Nothing)

Common in permission-based rendering.

```jsx
function AdminPanel({ isAdmin }) {
  if (!isAdmin) return null;

  return <div>Welcome, Admin!</div>;
}

```

## Using `switch` or Helper Functions

For multiple condition options:

```jsx
function Status({ state }) {
  switch (state) {
    case "loading":
      return <p>Loading...</p>;
    case "error":
      return <p>Error occurred.</p>;
    case "success":
      return <p>Loaded successfully!</p>;
    default:
      return null;
  }
}
```

## Conditional Component Rendering

```jsx
function App({ isDarkMode }) {
  return (
    <div>
      {isDarkMode ? <DarkTheme /> : <LightTheme />}
    </div>
  );
}
```

## Conditional Class Names or Styles

```jsx
<button className={`px-4 py-2 ${active ? "bg-blue-500" : "bg-gray-300"}`}>
  Save
</button>

```

## Shorten with Optional Chaining

```jsx
{user?.name && <h2>Hello, {user.name}</h2>}

```

## Best Practices

| ✅ Do | ❌ Avoid |
| --- | --- |
| Keep conditions readable | Avoid deeply nested ternaries |
| Use `null` to render nothing | Don’t use `undefined` as JSX |
| Break logic into functions | Don’t mix logic and JSX too much |
| Use early returns if possible | Don’t clutter return statements |