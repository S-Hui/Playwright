import { expect, test } from '@playwright/test';
import { Invoice, accounting } from '../Page/accountingModule';
import { Invoice} from '../TestData/data-Invoice';

test.beforeEach(async ({page}) => {
    await page.goto('');
})

test.describe('updateInvoiceExcludingTax', () => {
    test('update Invoice', async ({ page }) => {
        const generatedOrderNumber = await po.createRFQ(PO_USD.vendor, PO_USD.currency);
        await po.addPOLineItems( PO_USD.products)
        await po.confirmPO()
      });
  });