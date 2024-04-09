'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"version.json": "4a83cb1f5204ff592806087e24002462",
"index.html": "c831cbfcd7a748ec5a60465eacbddef2",
"/": "c831cbfcd7a748ec5a60465eacbddef2",
"main.dart.js": "16bd4b7b1c433a4fd481466c3c6f9fb5",
"flutter.js": "6fef97aeca90b426343ba6c5c9dc5d4a",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"logo.jpg": "f8ee2ef6dcf64a1b7ca8e1af09db636c",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"manifest.json": "cda412c1dd70da086a36d1507e129eb7",
"assets/AssetManifest.json": "66c723a9418899ad748227c47ab58a11",
"assets/NOTICES": "946d73e020ed485518c01897e5fd6bbe",
"assets/FontManifest.json": "4ee2a336cf55c79d84dd4fd8f55e4290",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "57d849d738900cfd590e9adc7e208250",
"assets/shaders/ink_sparkle.frag": "f8b80e740d33eb157090be4e995febdf",
"assets/AssetManifest.bin": "79d10468e05b66869f4fe5cf21f7c7f1",
"assets/fonts/MaterialIcons-Regular.otf": "62ec8220af1fb03e1c20cfa38781e17e",
"assets/assets/images/loader.png": "450025df5b342706c15823d372d34338",
"assets/assets/images/white_logo.png": "6e044c4144c886a8dbae302f7ec625ee",
"assets/assets/images/top_banner.jpg": "7947d932c48862a961f3580d0831d006",
"assets/assets/images/reviews1.png": "e4ceee7b18042cedd4ea4f12a1731e39",
"assets/assets/images/offer.jpg": "88a903c0337ab97057c6b90bb0bf3759",
"assets/assets/images/instagram_white.png": "74a8f874a30b8e0e10658814802293ee",
"assets/assets/images/instagram.png": "8ce47fd872187bfa8d11505b3bd8944e",
"assets/assets/images/review.png": "80088226b7b6cfe7c38d76661c1eba0d",
"assets/assets/images/middle_banner.png": "f88ac14939f2070194c4c28e939a3162",
"assets/assets/images/back_arrow.png": "ac6e421c3d4eb3eaf7bd12c76a5be0ee",
"assets/assets/images/background.jpg": "ac587165e127b2a7d2838ec7227c50ee",
"assets/assets/images/hambuger.png": "e1148d1bfe0f2a07c4e17222ac8677e9",
"assets/assets/images/logo.jpg": "f8ee2ef6dcf64a1b7ca8e1af09db636c",
"assets/assets/images/facebook_white.png": "0df7eedf77e7b190671afa74a1ebb0cf",
"assets/assets/images/customer_review.png": "1b687fdb684c57d014c20fc2d678e4c0",
"assets/assets/images/up_arrow.png": "b0f1b86eea4f7abd53d90c81df176b72",
"assets/assets/images/youtube.png": "7a964654f775274557251cf13c78fd51",
"assets/assets/images/youtube_white.png": "3e32ccb2e4cb97c6317169c86c54973c",
"assets/assets/images/whatsapp_white.png": "73bdf70213a23dbff0b0abd40e60d5d4",
"assets/assets/images/whatsapp.png": "5e6704ef3415f0dfb1a518e0329f0d5d",
"assets/assets/images/bottom_banner.jpeg": "ea485f7a1879dc8ba6945d2e32cab0b5",
"assets/assets/images/gift_banner.jpg": "c6d2b667e783899d40a9e784cc9bb10d",
"assets/assets/images/facebook.png": "0833b053623deeac53edebf59cfc5429",
"assets/assets/fonts/bankgothic_medium.ttf": "1d9f2941c1cb3bc8eaf9ade805f14421",
"assets/assets/fonts/Saira_VariableFont_wdthwght.ttf": "112d18bfc62a7452b2ba5e4b0b0e494f",
"assets/assets/fonts/ComicNeue_Regular.ttf": "26d37a6883b56cb83fd73b8bc16de513",
"assets/assets/fonts/PatrickHand_Regular.ttf": "0b94e62171b862ddb28135554050f315",
"canvaskit/skwasm.js": "1df4d741f441fa1a4d10530ced463ef8",
"canvaskit/skwasm.wasm": "6711032e17bf49924b2b001cef0d3ea3",
"canvaskit/chromium/canvaskit.js": "8c8392ce4a4364cbb240aa09b5652e05",
"canvaskit/chromium/canvaskit.wasm": "fc18c3010856029414b70cae1afc5cd9",
"canvaskit/canvaskit.js": "76f7d822f42397160c5dfc69cbc9b2de",
"canvaskit/canvaskit.wasm": "f48eaf57cada79163ec6dec7929486ea",
"canvaskit/skwasm.worker.js": "19659053a277272607529ef87acf9d8a"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
