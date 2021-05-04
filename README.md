# vscode-copy-fqn

VS Code extention to copy fully qualified name of thing at editor cursor.

## Examples

If the cursor is on ```startsWith``` method name in Java editor:

```java
("Hello World").startsWith("Hello");
```

Invoking ```Copy Fully Qualified Name``` command from command pallette or editor context menu, copies:

```java
java.lang.String.startsWith(String prefix)
```
to clipboard.

If the cursor is on ```AuthorizationServerConfigurerAdapter``` method name in Java editor:

```java
public class AuthorizationServerConfig extends AuthorizationServerConfigurerAdapter {
```

Invoking ```Copy Fully Qualified Name``` command from command pallette or editor context menu, copies:

```java
org.springframework.security.oauth2.config.annotation.web.configuration.AuthorizationServerConfigurerAdapter
```
to clipboard.

If the cursor is on ```activate``` function name in typescript editor:
```typescript
export function activate(context: vscode.ExtensionContext) {
```
Invoking ```Copy Fully Qualified Name``` command from command pallette or editor context menu, copies:
```typescript
function activate(context: vscode.ExtensionContext): void
```
to clipboard.
## Known Issues

- Does not work for Java fields

## Release Notes

### 1.0.0

Initial release

### 1.0.1

For Java try to match the Eclipse JDT's Copy Qualified Name command. Works for Classes and methods and parameters. Does not work for fields.

### 1.0.2

Minor fixes.

### 1.0.3

Update README.
