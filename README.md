# Mummy Paratha & Cafe

A mobile-first cafe menu and ordering website built with React, Vite, Tailwind CSS, React Router, Zustand and React Three Fiber. Orders are saved in the browser and handed to the cafe through WhatsApp; there is no backend or online payment.

## Run locally

```powershell
npm install
Copy-Item .env.example .env
# Set VITE_WHATSAPP_NUMBER to the cafe number with country code and digits only (no +).
npm run dev
```

For a production build, run `npm run build` and `npm run preview`.

The WhatsApp number is intentionally not hardcoded. Until `VITE_WHATSAPP_NUMBER` is set in `.env`, checkout displays a configuration message and does not place the order.

## Editing cafe information

- Update the cafe name, tagline, phone display number, address, opening hours, delivery details and social/delivery links in `src/config.js`.
- Update categories, prices, descriptions, images and `isFeatured` flags in `src/data/menu.js`. Keep product IDs unique. Items without an image automatically use a gradient food-icon placeholder.
- Replace sample feedback in `src/data/reviews.js` with real, approved customer reviews.
- Update the cafe photo gallery in `src/data/gallery.js` with approved photos when available.

## Brand assets and 3D model

- The header uses the cafe mascot cropped from the supplied artwork at `public/images/brand-mascot.webp`; the favicon is `public/images/logo.svg`.
- The hero paratha is procedural geometry in `src/three/Paratha.jsx`; its static fallback uses `public/images/food/paratha.webp`. Add an optimized model under `public/models/` and update that component when one is ready.
- The hero canvas is disabled for reduced-motion preferences and detected low-end devices. Those users see a static food visual instead.

## Food imagery

The menu and gallery use optimized local Pexels photos as representative dish imagery, not photos of this cafe's own plates. Replace them with original cafe photography when available. Pexels photo sources:

- [Parathas](https://www.pexels.com/photo/delicious-parathas-cooking-on-tawa-grill-38834853/)
- [Vegetarian thali](https://www.pexels.com/photo/traditional-indian-vegetarian-thali-meal-32797056/)
- [Chai](https://www.pexels.com/photo/authentic-indian-masala-chai-glass-close-up-37186989/)
- [Cold coffee](https://www.pexels.com/photo/chilled-iced-coffee-on-wooden-table-outdoors-33542190/)
- [Milkshakes](https://www.pexels.com/photo/close-up-shot-of-milkshakes-6463660/)
- [Veg burgers](https://www.pexels.com/photo/photograph-of-burgers-on-a-wooden-surface-7786565/)
- [Sandwiches](https://www.pexels.com/photo/toasted-sandwiches-beside-fried-french-fries-11256670/)
- [Noodles](https://www.pexels.com/photo/close-up-of-chopsticks-holding-asian-noodles-38778417/)
- [Pasta](https://www.pexels.com/photo/close-up-of-spaghetti-with-tomato-sauce-on-plate-31637793/)
- [French fries](https://www.pexels.com/photo/close-up-photo-of-fries-with-sauce-5779487/)
- [Dal](https://www.pexels.com/photo/yellow-chickpea-soup-served-in-black-bowl-next-to-tomato-17200447/)

## Ordering behavior

Customers add menu items to a persisted local cart, enter their name and mobile number, select delivery or pickup, and submit the order. The app creates an `MPC-YYMMDD-XXXX` ID and stores the order in local storage before opening WhatsApp with a prefilled message. The customer must press **Send** in WhatsApp to deliver it to the cafe. Order history and cart data are stored only in that browser.

## Deploy

Build the project with `npm run build` and deploy the generated `dist/` directory to Vercel, Netlify, or Cloudflare Pages. Configure `VITE_WHATSAPP_NUMBER` as a build-time environment variable in the hosting dashboard. Configure SPA rewrites so `/checkout` and `/order-success` serve `index.html`:

- **Vercel:** add a rewrite from `/(.*)` to `/`.
- **Netlify:** add `/* /index.html 200` in a `_redirects` file in the published directory.
- **Cloudflare Pages:** use the SPA fallback behavior (or add a `_redirects` file containing `/* /index.html 200`).

## Before launch

Confirm opening hours, WhatsApp number, delivery area and charges outside 2 km, and the menu prices noted in `src/data/menu.js`. Replace sample reviews, placeholders, and `#` social and delivery links with real approved content.
