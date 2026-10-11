# Brand files

Drop the real files here with these exact names. Everything on the site points at them.

| File | Used for |
|---|---|
| `wordmark-dark.png` / `.svg` | Ivory wordmark for navy backgrounds (header, footer) |
| `wordmark-light.png` / `.svg` | Black wordmark for ivory backgrounds |
| `wordmark-gradient.png` / `.svg` | Black-to-teal gradient wordmark |
| `hero-face.svg` | **Placeholder** artwork for the particle hero. Replace with the real circuit-face image (see the main README). |
| `microsoft-ai-cloud-partner.png` | Microsoft AI Cloud Partner badge (trust strip) |
| `mark.svg` | The slanted "A" with orbit. Static hero fallback, favicon source, and the shape the 3D hero extrudes |
| `mark.glb` | Optional. If present, the 3D hero loads this model instead of extruding `mark.svg` |

For the 3D extrusion, keep the "A" as **filled** paths and the orbit sweep as a **stroked path with `fill="none"`**.
The orbit is drawn in 3D as the animated teal ring, so it is skipped when extruding.

The wordmarks and partner badge were taken from the October 2026 offerings deck. They are raster images; the `.svg`
versions just wrap the PNG. Swap in vector files when you have them. `mark.svg` is still a placeholder.
