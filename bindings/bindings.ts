// Auto-generated with deno_bindgen
function encode(v: string | Uint8Array): Uint8Array {
  if (typeof v !== "string") return v
  return new TextEncoder().encode(v)
}

function decode(v: Uint8Array): string {
  return new TextDecoder().decode(v)
}

// deno-lint-ignore no-explicit-any
function readPointer(v: any): Uint8Array {
  const ptr = new Deno.UnsafePointerView(v)
  const lengthBe = new Uint8Array(4)
  const view = new DataView(lengthBe.buffer)
  ptr.copyInto(lengthBe, 0)
  const buf = new Uint8Array(view.getUint32(0))
  ptr.copyInto(buf, 4)
  return buf
}

const url = new URL("../target/release", import.meta.url)

let uri = url.pathname
if (!uri.endsWith("/")) uri += "/"

// https://docs.microsoft.com/en-us/windows/win32/api/libloaderapi/nf-libloaderapi-loadlibrarya#parameters
if (Deno.build.os === "windows") {
  uri = uri.replace(/\//g, "\\")
  // Remove leading slash
  if (uri.startsWith("\\")) {
    uri = uri.slice(1)
  }
}

const { symbols } = Deno.dlopen(
  {
    darwin: uri + "libdeno_modern_installer.dylib",
    windows: uri + "deno_modern_installer.dll",
    linux: uri + "libdeno_modern_installer.so",
    freebsd: uri + "libdeno_modern_installer.so",
    netbsd: uri + "libdeno_modern_installer.so",
    aix: uri + "libdeno_modern_installer.so",
    solaris: uri + "libdeno_modern_installer.so",
    illumos: uri + "libdeno_modern_installer.so",
  }[Deno.build.os],
  {
    create_installer: {
      parameters: ["buffer", "usize"],
      result: "void",
      nonblocking: false,
    },
  },
)
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

  const rawResult = symbols.create_installer(a0_buf, a0_buf.byteLength)
  const result = rawResult
  return result
}
