# Project rules

- Keep delivery-proof captions in a local WebVTT track, enabled by default, so viewers can understand the recording without sound and without loading a second video.
- Keep section geometry cached outside scroll handlers and refresh it on layout changes to avoid scroll-time layout work.
- Lazy-load the admin page so buyers do not download admin-only code on the storefront.
- Disable continuous motion and counter updates for touch visitors; keep the full navigation collapsed until it fits on desktop.