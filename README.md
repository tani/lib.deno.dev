# Deno Version Aliasing

This service provide a version aliasing for deno library.

```typescript
import abc from "https://pkg.deno.dev/x/abc@v1/mod.ts"
import abc from "https://pkg.deno.dev/x/abc@v1.3/mod.ts"
import abc from "https://pkg.deno.dev/x/abc@v1.3.3/mod.ts"
// ↓
import abc from "https://deno.land/x/abc@v1.3.3/mode.ts"
```

## Motivation

In the modern CDN providers such as jsDelivr and unpkg, we can use __version alias__ to retrieve a patch update without modifications. We bring this system to deno.land using Deno Deploy. You can get the latest compatible version every cache updates.

## Usage

This system is a drop-in replacement of the `deno.land`.
You need to replace `deno.land` by `pkg.deno.dev`.

## License

2020 &copy; TANIGUCHI Masaya, [MIT License](https://masaya.mit-license.org)
