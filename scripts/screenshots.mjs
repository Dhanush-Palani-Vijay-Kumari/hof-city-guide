// Builds the app, serves it, and takes phone-sized screenshots into images/ (demo mode: ?demo).
// First time: run `npx playwright install chromium`. Or set CHROME_PATH to a Chrome/Chromium binary.
import { build, preview } from 'vite'
import { chromium } from 'playwright-core'
await build({ logLevel: 'warn' })
const server = await preview({ preview: { port: 4173, open: false } })
const url = (server.resolvedUrls?.local[0] ?? 'http://localhost:4173/') + '?demo'
const browser = await chromium.launch(
  process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {},
)
const page = await (
  await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
  })
).newPage()
const shot = async (name) => {
  await page.waitForTimeout(300)
  await page.screenshot({ path: `images/${name}.png` })
}
await page.goto(url + '&lang=en')
await shot('01-places')
await page.locator('.card').first().click()
await shot('02-place-detail')
await page.click('.close')
await page.locator('nav button').nth(2).click()
await shot('03-quiz')
await page.locator('nav button').nth(3).click()
await shot('04-progress')
await page.goto(url + '&lang=de')
await page.locator('.chips button').nth(2).click()
await shot('05-natur-de')
await browser.close()
server.httpServer.close()
console.log('screenshots written to images/')
