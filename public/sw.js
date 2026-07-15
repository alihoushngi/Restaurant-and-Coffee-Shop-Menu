if (!self.define) {
  let e,
    a = {};
  const s = (s, i) => (
    (s = new URL(s + ".js", i).href),
    a[s] ||
      new Promise((a) => {
        if ("document" in self) {
          const e = document.createElement("script");
          ((e.src = s), (e.onload = a), document.head.appendChild(e));
        } else ((e = s), importScripts(s), a());
      }).then(() => {
        let e = a[s];
        if (!e) throw new Error(`Module ${s} didn’t register its module`);
        return e;
      })
  );
  self.define = (i, t) => {
    const n =
      e ||
      ("document" in self ? document.currentScript.src : "") ||
      location.href;
    if (a[n]) return;
    let c = {};
    const r = (e) => s(e, n),
      o = { module: { uri: n }, exports: c, require: r };
    a[n] = Promise.all(i.map((e) => o[e] || r(e))).then((e) => (t(...e), c));
  };
}
define(["./workbox-4754cb34"], function (e) {
  "use strict";
  (importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: "/_next/static/BHpaB2pUpJnhgz3xtmME7/_buildManifest.js",
          revision: "f00742126510e471f485eb1ff783442a",
        },
        {
          url: "/_next/static/BHpaB2pUpJnhgz3xtmME7/_ssgManifest.js",
          revision: "b6652df95db52feb4daf4eca35380933",
        },
        {
          url: "/_next/static/chunks/148-f0a83497b38ccd98.js",
          revision: "f0a83497b38ccd98",
        },
        {
          url: "/_next/static/chunks/211-2dd0cb7116de9bec.js",
          revision: "2dd0cb7116de9bec",
        },
        {
          url: "/_next/static/chunks/4bd1b696-215e5051988c3dde.js",
          revision: "215e5051988c3dde",
        },
        {
          url: "/_next/static/chunks/592-0f75615990a15cda.js",
          revision: "0f75615990a15cda",
        },
        {
          url: "/_next/static/chunks/600-00738d4085dfdd2c.js",
          revision: "00738d4085dfdd2c",
        },
        {
          url: "/_next/static/chunks/658-d42c7f47909ad26a.js",
          revision: "d42c7f47909ad26a",
        },
        {
          url: "/_next/static/chunks/794-0fc36bf1952fbc29.js",
          revision: "0fc36bf1952fbc29",
        },
        {
          url: "/_next/static/chunks/app/_global-error/page-aba28f88d5781771.js",
          revision: "aba28f88d5781771",
        },
        {
          url: "/_next/static/chunks/app/_not-found/page-cbe1211bca7de872.js",
          revision: "cbe1211bca7de872",
        },
        {
          url: "/_next/static/chunks/app/deliverymenu/page-97a89b9739ec2740.js",
          revision: "97a89b9739ec2740",
        },
        {
          url: "/_next/static/chunks/app/favorites/page-ad76d5f41562664f.js",
          revision: "ad76d5f41562664f",
        },
        {
          url: "/_next/static/chunks/app/layout-6bb001d4966a0ad5.js",
          revision: "6bb001d4966a0ad5",
        },
        {
          url: "/_next/static/chunks/app/page-eed154626d885409.js",
          revision: "eed154626d885409",
        },
        {
          url: "/_next/static/chunks/app/search/page-ac2e9cf0f12455c8.js",
          revision: "ac2e9cf0f12455c8",
        },
        {
          url: "/_next/static/chunks/app/tablemenu/page-cae0091664422670.js",
          revision: "cae0091664422670",
        },
        {
          url: "/_next/static/chunks/f7333993-a1f79f7f7343499f.js",
          revision: "a1f79f7f7343499f",
        },
        {
          url: "/_next/static/chunks/framework-228d67440a9d5288.js",
          revision: "228d67440a9d5288",
        },
        {
          url: "/_next/static/chunks/main-aab2a26464b27016.js",
          revision: "aab2a26464b27016",
        },
        {
          url: "/_next/static/chunks/main-app-7098282e42e585e8.js",
          revision: "7098282e42e585e8",
        },
        {
          url: "/_next/static/chunks/next/dist/client/components/builtin/app-error-aba28f88d5781771.js",
          revision: "aba28f88d5781771",
        },
        {
          url: "/_next/static/chunks/next/dist/client/components/builtin/forbidden-aba28f88d5781771.js",
          revision: "aba28f88d5781771",
        },
        {
          url: "/_next/static/chunks/next/dist/client/components/builtin/global-error-84949862396c11df.js",
          revision: "84949862396c11df",
        },
        {
          url: "/_next/static/chunks/next/dist/client/components/builtin/not-found-aba28f88d5781771.js",
          revision: "aba28f88d5781771",
        },
        {
          url: "/_next/static/chunks/next/dist/client/components/builtin/unauthorized-aba28f88d5781771.js",
          revision: "aba28f88d5781771",
        },
        {
          url: "/_next/static/chunks/polyfills-42372ed130431b0a.js",
          revision: "846118c33b2c0e922d7b3a7676f81f6f",
        },
        {
          url: "/_next/static/chunks/webpack-6f9346deb87130eb.js",
          revision: "6f9346deb87130eb",
        },
        {
          url: "/_next/static/css/30dfb44d9ccb9e87.css",
          revision: "30dfb44d9ccb9e87",
        },
        {
          url: "/_next/static/css/d501472975592552.css",
          revision: "d501472975592552",
        },
        {
          url: "/_next/static/media/0b7b20f60296dc0e-s.p.woff2",
          revision: "7958481fe611c2574940c172068921bb",
        },
        {
          url: "/_next/static/media/1cce283dc5dcd0a8-s.p.woff2",
          revision: "d5fbd61bcef413ea9a150093a773b69f",
        },
        {
          url: "/_next/static/media/24cf69a0604700d7-s.p.woff2",
          revision: "a0f99309cd35ee8634cac7d7f6d9f9bc",
        },
        {
          url: "/_next/static/media/2c8554bdab87ece2-s.p.woff2",
          revision: "dd2193b32cbe791734c97e4e167816bf",
        },
        {
          url: "/_next/static/media/5bb88b962ce9ac51-s.p.woff2",
          revision: "6cfb460b4140c8544af1cee2e23359a2",
        },
        {
          url: "/_next/static/media/75265c7b733eeace-s.p.woff2",
          revision: "24ebc7a2a6f878987d6c3c65ecfa304a",
        },
        {
          url: "/_next/static/media/7762c1a408d70509-s.p.woff2",
          revision: "6458eed8cf924e973b43dac780a737f8",
        },
        {
          url: "/_next/static/media/77a5213e6c4f1531-s.p.woff2",
          revision: "cdc140628f111dc1f6185775f968e379",
        },
        {
          url: "/_next/static/media/Vazirmatn-Black.5bb88b96.woff2",
          revision: "5bb88b96",
        },
        {
          url: "/_next/static/media/Vazirmatn-Bold.0b7b20f6.woff2",
          revision: "0b7b20f6",
        },
        {
          url: "/_next/static/media/Vazirmatn-ExtraBold.24cf69a0.woff2",
          revision: "24cf69a0",
        },
        {
          url: "/_next/static/media/Vazirmatn-ExtraLight.ea9014d9.woff2",
          revision: "ea9014d9",
        },
        {
          url: "/_next/static/media/Vazirmatn-Light.7762c1a4.woff2",
          revision: "7762c1a4",
        },
        {
          url: "/_next/static/media/Vazirmatn-Medium.2c8554bd.woff2",
          revision: "2c8554bd",
        },
        {
          url: "/_next/static/media/Vazirmatn-Regular.77a5213e.woff2",
          revision: "77a5213e",
        },
        {
          url: "/_next/static/media/Vazirmatn-SemiBold.c9f82b62.woff2",
          revision: "c9f82b62",
        },
        {
          url: "/_next/static/media/Vazirmatn-Thin.9ed12002.woff2",
          revision: "9ed12002",
        },
        {
          url: "/_next/static/media/a781ce35ed523309-s.p.woff2",
          revision: "c7dea49030c7e52435a61b54b6c886fb",
        },
        {
          url: "/_next/static/media/befb4216e42a11e2-s.p.woff2",
          revision: "11804d503fc920a3da15c9869175d7db",
        },
        {
          url: "/_next/static/media/c9f82b62003923c5-s.p.woff2",
          revision: "9260c192787251165aacac4e12c997ad",
        },
        {
          url: "/_next/static/media/d9b8ff22eba58806-s.p.woff2",
          revision: "b20a98118dffd3f22064a88a1b20de0b",
        },
        {
          url: "/_next/static/media/ea9014d9f1434ed8-s.p.woff2",
          revision: "3d8ceebeffb457d5cb97b08977e23a3f",
        },
        {
          url: "/_next/static/media/logo.c88d8904.png",
          revision: "4f647a514794d3ecd52ae61836f40085",
        },
        {
          url: "/icons/icon-192x192.png",
          revision: "648a5f0c10a3ca66e36a70f2e80975d2",
        },
        {
          url: "/icons/icon-512x512.png",
          revision: "0b49387f29e6a4dbd15e464bd20973b1",
        },
        { url: "/manifest.json", revision: "0c835291c842f6626e9815932c0aade5" },
        { url: "/robots.txt", revision: "1c3c6067d9b6d7d8958642b8d89c88ce" },
        {
          url: "/screenshots/homepage-mobile.png",
          revision: "0518217df1178bb4a364c132a8e58ff7",
        },
        {
          url: "/screenshots/homepage.png",
          revision: "1db33fb2953fc0e04fbd1f07419634d4",
        },
        { url: "/sitemap-0.xml", revision: "a398e0ac938b670459a85daa9b52f286" },
        { url: "/sitemap.xml", revision: "b7b76fc2010f8405ebaf68aae78daed8" },
      ],
      { ignoreURLParametersMatching: [] },
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      "/",
      new e.NetworkFirst({
        cacheName: "start-url",
        plugins: [
          {
            cacheWillUpdate: async ({
              request: e,
              response: a,
              event: s,
              state: i,
            }) =>
              a && "opaqueredirect" === a.type
                ? new Response(a.body, {
                    status: 200,
                    statusText: "OK",
                    headers: a.headers,
                  })
                : a,
          },
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: "google-fonts-webfonts",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: "google-fonts-stylesheets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-font-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-image-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-image",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: "static-audio-assets",
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:mp4)$/i,
      new e.CacheFirst({
        cacheName: "static-video-assets",
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-js-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-style-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-data",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: "static-data-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        const a = e.pathname;
        return !a.startsWith("/api/auth/") && !!a.startsWith("/api/");
      },
      new e.NetworkFirst({
        cacheName: "apis",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        return !e.pathname.startsWith("/api/");
      },
      new e.NetworkFirst({
        cacheName: "others",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      ({ url: e }) => !(self.origin === e.origin),
      new e.NetworkFirst({
        cacheName: "cross-origin",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 }),
        ],
      }),
      "GET",
    ));
});
