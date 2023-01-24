// Auto-generated with deno_bindgen
import { CachePolicy, prepare } from "https://deno.land/x/plug@0.5.2/plug.ts"

function encode(v: string | Uint8Array): Uint8Array {
  if (typeof v !== "string") return v
  return new TextEncoder().encode(v)
}

function decode(v: Uint8Array): string {
  return new TextDecoder().decode(v)
}

function readPointer(v: any): Uint8Array {
  const ptr = new Deno.UnsafePointerView(v as bigint)
  const lengthBe = new Uint8Array(4)
  const view = new DataView(lengthBe.buffer)
  ptr.copyInto(lengthBe, 0)
  const buf = new Uint8Array(view.getUint32(0))
  ptr.copyInto(buf, 4)
  return buf
}

const url = new URL("../target/release", import.meta.url)
let uri = url.toString()
if (!uri.endsWith("/")) uri += "/"

let darwin: string | { aarch64: string; x86_64: string } = uri
  + "libdeno_modern_installer.dylib"

if (url.protocol !== "file:") {
  // Assume that remote assets follow naming scheme
  // for each macOS artifact.
  darwin = {
    aarch64: uri + "libdeno_modern_installer_arm64.dylib",
    x86_64: uri + "libdeno_modern_installer.dylib",
  }
}

const opts = {
  name: "deno_modern_installer",
  urls: {
    darwin,
    windows: uri + "deno_modern_installer.dll",
    linux: uri + "libdeno_modern_installer.so",
  },
  policy: undefined,
}
const _lib = await prepare(opts, {
  create_installer: {
    parameters: ["pointer", "usize"],
    result: "void",
    nonblocking: false,
  },
})
export type BundleSettingsInstaller = {
  identifier: string | undefined | null
  icon: Array<string> | undefined | null
  resources: Array<string> | undefined | null
  copyright: string | undefined | null
  short_description: string | undefined | null
  long_description: string | undefined | null
}
export type InstallerSettings = {
  src_path: string
  out_path: string
  bundle: BundleSettingsInstaller
  package: PackageSettingsInstaller
}
export type PackageSettingsInstaller = {
  product_name: string
  version: string
  description: string
  homepage: string | undefined | null
  authors: Array<string> | undefined | null
  default_run: string | undefined | null
}
export function create_installer(a0: InstallerSettings) {
  const a0_buf = encode(JSON.stringify(a0))
  const a0_ptr = Deno.UnsafePointer.of(a0_buf)
  let rawResult = _lib.symbols.create_installer(a0_ptr, a0_buf.byteLength)
  const result = rawResult
  return result
}
