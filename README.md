# deno.land Version Aliasing

This service provides a version aliasing for deno library.

```typescript
// node-semver style
import abc from "https://lib.deno.dev/x/abc@~1.3/mod.ts"
import abc from "https://lib.deno.dev/x/abc@>=1.2/mod.ts"
import abc from "https://lib.deno.dev/x/abc@^1.2/mod.ts"
import abc from "https://lib.deno.dev/x/abc@1/mod.ts"
// weak semver style
import abc from "https://lib.deno.dev/x/abc@v1/mod.ts"
import abc from "https://lib.deno.dev/x/abc@v1.3/mod.ts"
import abc from "https://lib.deno.dev/x/abc@v1.3.3/mod.ts"
// ↓
import abc from "https://deno.land/x/abc@v1.3.3/mode.ts"
```

## Motivation

In the modern CDN providers such as jsDelivr and unpkg, we can use the __version alias__ to retrieve a patch update without modifications. We bring this system to deno.land using Deno Deploy. You can get the latest compatible version every cache updates.

## Usage

This system is a drop-in replacement of the `deno.land`.
You need to replace `deno.land` by `lib.deno.dev`.

## License

2020 &copy; TANIGUCHI Masaya, [MIT License](https://masaya.mit-license.org)
