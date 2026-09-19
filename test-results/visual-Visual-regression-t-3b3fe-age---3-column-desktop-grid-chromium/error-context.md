# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: visual.spec.ts >> Visual regression tests >> Products page - 3 column desktop grid
- Location: tests\visual.spec.ts:177:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="product-list"]')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" locator('[data-testid="product-list"]') with timeout 5000ms
  - waiting for locator('[data-testid="product-list"]')

```

```yaml
- heading "Directory listing for /" [level=1]
- separator
- list:
  - listitem:
    - link "favicon.svg":
      - /url: favicon.svg
  - listitem:
    - link "icons.svg":
      - /url: icons.svg
- separator
```

# Test source

```ts
  85  | ];
  86  | 
  87  | async function mockApi(page: Page) {
  88  |   await page.route("**/api/items", async (route) => {
  89  |     await route.fulfill({
  90  |       status: 200,
  91  |       contentType: "application/json",
  92  |       body: JSON.stringify({
  93  |         data: products,
  94  |       }),
  95  |     });
  96  |   });
  97  | 
  98  |   await page.route("**/api/items/*", async (route) => {
  99  |     const url = route.request().url();
  100 |     const id = Number(url.split("/").pop());
  101 | 
  102 |     const product = products.find((item) => item.id === id);
  103 | 
  104 |     await route.fulfill({
  105 |       status: product ? 200 : 404,
  106 |       contentType: "application/json",
  107 |       body: JSON.stringify(product || {}),
  108 |     });
  109 |   });
  110 | 
  111 |   await page.route("**/api/itemQuantity/*", async (route) => {
  112 |     await route.fulfill({
  113 |       status: 200,
  114 |       contentType: "application/json",
  115 |       body: JSON.stringify(0),
  116 |     });
  117 |   });
  118 | 
  119 |   await page.route("**/api/user/cart", async (route) => {
  120 |     if (route.request().method() === "GET") {
  121 |       await route.fulfill({
  122 |         status: 200,
  123 |         contentType: "application/json",
  124 |         body: JSON.stringify({
  125 |           items: cart,
  126 |         }),
  127 |       });
  128 |       return;
  129 |     }
  130 | 
  131 |     await route.fulfill({
  132 |       status: 200,
  133 |       contentType: "application/json",
  134 |       body: JSON.stringify({}),
  135 |     });
  136 |   });
  137 | 
  138 |   await page.route("**/api/user/cart/items/*", async (route) => {
  139 |     await route.fulfill({
  140 |       status: 200,
  141 |       contentType: "application/json",
  142 |       body: JSON.stringify({}),
  143 |     });
  144 |   });
  145 | 
  146 |   await page.route("**/api/user/orders", async (route) => {
  147 |     await route.fulfill({
  148 |       status: 200,
  149 |       contentType: "application/json",
  150 |       body: JSON.stringify({
  151 |         data: orders,
  152 |       }),
  153 |     });
  154 |   });
  155 | 
  156 |   await page.route("**/api/orders", async (route) => {
  157 |     await route.fulfill({
  158 |       status: 200,
  159 |       contentType: "application/json",
  160 |       body: JSON.stringify({
  161 |         order: orders[0],
  162 |       }),
  163 |     });
  164 |   });
  165 | }
  166 | 
  167 | test.beforeEach(async ({ page }) => {
  168 |   await page.addInitScript(() => {
  169 |     localStorage.setItem("userId", "1");
  170 |     localStorage.setItem("theme", "light");
  171 |   });
  172 | 
  173 |   await mockApi(page);
  174 | });
  175 | 
  176 | test.describe("Visual regression tests", () => {
  177 |   test("Products page - 3 column desktop grid", async ({ page }) => {
  178 |     await page.setViewportSize({
  179 |       width: 1440,
  180 |       height: 1000,
  181 |     });
  182 | 
  183 |     await page.goto("/");
  184 | 
> 185 |     await expect(page.locator('[data-testid="product-list"]')).toBeVisible();
      |                                                                ^ Error: expect(locator).toBeVisible() failed
  186 |     await expect(page.locator(".product-card")).toHaveCount(6);
  187 | 
  188 |     await expect(page.locator(".product-list")).toHaveScreenshot(
  189 |       "products-grid-desktop.png"
  190 |     );
  191 |   });
  192 | 
  193 |   test("Products page - dark mode", async ({ page }) => {
  194 |     await page.setViewportSize({
  195 |       width: 1440,
  196 |       height: 1000,
  197 |     });
  198 | 
  199 |     await page.goto("/");
  200 | 
  201 |     const body = page.locator("body");
  202 | 
  203 |     await expect(body).toHaveScreenshot("products-light-mode.png");
  204 | 
  205 |     await page.locator("theme-button").click();
  206 | 
  207 |     await expect(body).toHaveScreenshot("products-dark-mode.png");
  208 |   });
  209 | 
  210 |   test("Products page - 3 columns remain at 769px", async ({ page }) => {
  211 |     await page.setViewportSize({
  212 |       width: 769,
  213 |       height: 1000,
  214 |     });
  215 | 
  216 |     await page.goto("/");
  217 | 
  218 |     await expect(page.locator(".product-card")).toHaveCount(6);
  219 | 
  220 |     await expect(page.locator(".product-list")).toHaveScreenshot(
  221 |       "products-grid-769px.png"
  222 |     );
  223 |   });
  224 | 
  225 |   test("Product card title font weight", async ({ page }) => {
  226 |     await page.setViewportSize({
  227 |       width: 1440,
  228 |       height: 1000,
  229 |     });
  230 | 
  231 |     await page.goto("/");
  232 | 
  233 |     const titles = page.locator(".product-card__name");
  234 | 
  235 |     await expect(titles).toHaveCount(6);
  236 | 
  237 |     for (let i = 0; i < await titles.count(); i++) {
  238 |       await expect(titles.nth(i)).toHaveScreenshot(
  239 |         `product-title-${i}.png`
  240 |       );
  241 |     }
  242 |   });
  243 | 
  244 |   test("Checkout page with cart data", async ({ page }) => {
  245 |     await page.setViewportSize({
  246 |       width: 1440,
  247 |       height: 1000,
  248 |     });
  249 | 
  250 |     await page.goto("/checkout");
  251 | 
  252 |     await expect(
  253 |       page.locator(".checkout-page__orderSum")
  254 |     ).toBeVisible();
  255 | 
  256 |     await expect(
  257 |       page.getByText("Order summary")
  258 |     ).toBeVisible();
  259 | 
  260 |     await expect(
  261 |       page.getByText("Cyberpunk 2077")
  262 |     ).toBeVisible();
  263 | 
  264 |     await expect(
  265 |       page.getByText("The Witcher 3")
  266 |     ).toBeVisible();
  267 | 
  268 |     await expect(page).toHaveScreenshot(
  269 |       "checkout-with-data.png"
  270 |     );
  271 |   });
  272 | 
  273 |   test("Orders page with order data", async ({ page }) => {
  274 |     await page.setViewportSize({
  275 |       width: 1440,
  276 |       height: 1000,
  277 |     });
  278 | 
  279 |     await page.goto("/orders");
  280 | 
  281 |     await expect(
  282 |       page.locator(".order-card")
  283 |     ).toHaveCount(1);
  284 | 
  285 |     await expect(
```