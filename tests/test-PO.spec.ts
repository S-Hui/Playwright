import { expect, test } from '@playwright/test';
import { PurchaseOrder } from '../Page/purchasePage';
import { PO_USD} from '../TestData/data-PO';

test.beforeEach(async ({page}) => {
    await page.goto('');
})

test.describe('Purchase Order Happy Path', () => {
    test('should successfully create a new USD purchase order', async ({ page }) => {
        const po = new PurchaseOrder(page);
        const generatedOrderNumber = await po.createRFQ(PO_USD.vendor, PO_USD.currency);
        await po.addPOLineItems( PO_USD.products)
        await po.confirmPO()
      });
  });