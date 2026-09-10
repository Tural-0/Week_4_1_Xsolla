import { test, expect, Page } from "@playwright/test";

const products = [
  {
    id: 1,
    name: "Cyberpunk 2077",
    description: "Night City adventure",
    price: 5999,
    stock: 10,
  },
  {
    id: 2,
    name: "The Witcher 3",
    description: "Monster hunting RPG",
    price: 3999,
    stock: 0,
  },
  {
    id: 3,
    name: "Elden Ring",
    description: "A vast fantasy world",
    price: 5999,
    stock: 7,
  },
  {
    id: 4,
    name: "Hades",
    description: "Escape the underworld",
    price: 2499,
    stock: 12,
  },
  {
    id: 5,
    name: "Minecraft",
    description: "Build your own world",
    price: 2999,
    stock: 20,
  },
  {
    id: 6,
    name: "Hollow Knight",
    description: "Explore Hallownest",
    price: 1499,
    stock: 15,
  },
];

const cart = [
  {
    id: 1,
    name: "Cyberpunk 2077",
    description: "Night City adventure",
    price: 5999,
    stock: 10,
    quantity: 1,
  },
  {
    id: 2,
    name: "The Witcher 3",
    description: "Monster hunting RPG",
    price: 3999,
    stock: 8,
    quantity: 2,
  },
];

const orders = [
  {
    id: 101,
    status: "completed",
    total: 13997,
    line_items: [
      {
        item_id: 1,
        quantity: 1,
        price: 5999,
      },
      {
        item_id: 2,
        quantity: 2,
        price: 3999,
      },
    ],
  },
];

async function mockApi(page: Page) {
  await page.route("**/api/items", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        data: products,
      }),
    });
  });

  await page.route("**/api/items/*", async (route) => {
    const url = route.request().url();
    const id = Number(url.split("/").pop());

    const product = products.find((item) => item.id === id);

    await route.fulfill({
      status: product ? 200 : 404,
      contentType: "application/json",
      body: JSON.stringify(product || {}),
    });
  });

  await page.route("**/api/itemQuantity/*", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(0),
    });
  });

  await page.route("**/api/user/cart", async (route) => {
    if (route.request().method() === "GET") {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          items: cart,
        }),
      });
      return;
    }

    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({}),
    });
  });

  await page.route("**/api/user/cart/items/*", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({}),
    });
  });

  await page.route("**/api/user/orders", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        data: orders,
      }),
    });
  });

  await page.route("**/api/orders", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        order: orders[0],
      }),
    });
  });
}

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem("userId", "1");
    localStorage.setItem("theme", "light");
  });

  await mockApi(page);
});

test.describe("Visual regression tests", () => {
  test("Products page - 3 column desktop grid", async ({ page }) => {
    await page.setViewportSize({
      width: 1440,
      height: 1000,
    });

    await page.goto("/");

    await expect(page.locator(".product-list")).toBeVisible();
    await expect(page.locator(".product-card")).toHaveCount(6);

    await expect(page.locator(".product-list")).toHaveScreenshot(
      "products-grid-desktop.png"
    );
  });

  test("Products page - dark mode", async ({ page }) => {
    await page.setViewportSize({
      width: 1440,
      height: 1000,
    });

    await page.goto("/");

    const body = page.locator("body");

    await expect(body).toHaveScreenshot("products-light-mode.png");

    await page.locator("theme-button").click();

    await expect(body).toHaveScreenshot("products-dark-mode.png");
  });

  test("Products page - 3 columns remain at 769px", async ({ page }) => {
    await page.setViewportSize({
      width: 769,
      height: 1000,
    });

    await page.goto("/");

    await expect(page.locator(".product-card")).toHaveCount(6);

    await expect(page.locator(".product-list")).toHaveScreenshot(
      "products-grid-769px.png"
    );
  });

  test("Product card title font weight", async ({ page }) => {
    await page.setViewportSize({
      width: 1440,
      height: 1000,
    });

    await page.goto("/");

    const titles = page.locator(".product-card__name");

    await expect(titles).toHaveCount(6);

    for (let i = 0; i < await titles.count(); i++) {
      await expect(titles.nth(i)).toHaveScreenshot(
        `product-title-${i}.png`
      );
    }
  });

  test("Checkout page with cart data", async ({ page }) => {
    await page.setViewportSize({
      width: 1440,
      height: 1000,
    });

    await page.goto("/checkout");

    await expect(
      page.locator(".checkout-page__orderSum")
    ).toBeVisible();

    await expect(
      page.getByText("Order summary")
    ).toBeVisible();

    await expect(
      page.getByText("Cyberpunk 2077")
    ).toBeVisible();

    await expect(
      page.getByText("The Witcher 3")
    ).toBeVisible();

    await expect(page).toHaveScreenshot(
      "checkout-with-data.png"
    );
  });

  test("Orders page with order data", async ({ page }) => {
    await page.setViewportSize({
      width: 1440,
      height: 1000,
    });

    await page.goto("/orders");

    await expect(
      page.locator(".order-card")
    ).toHaveCount(1);

    await expect(
      page.getByText("Order #101")
    ).toBeVisible();

    await expect(page).toHaveScreenshot(
      "orders-with-data.png"
    );
  });

  test("Login page", async ({ page }) => {
    await page.setViewportSize({
      width: 1440,
      height: 1000,
    });

    await page.goto("/login");

    await expect(
      page.getByText("Sign in", { exact: true })
    ).toBeVisible();

    await expect(page).toHaveScreenshot(
      "login-page.png"
    );
  });

  test("Login validation visual state", async ({ page }) => {
    await page.setViewportSize({
      width: 1440,
      height: 1000,
    });

    await page.goto("/login");

    await page.getByPlaceholder("you@example.com").fill("wrong");

    await page.getByPlaceholder("********").fill("123");

    await page.getByRole("button", {
      name: /sign in/i,
    }).click();

    await expect(page).toHaveScreenshot(
      "login-validation-error.png"
    );
  });
});