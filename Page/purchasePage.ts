import { Page } from '@playwright/test';
import {CommonActions} from './Common';

// Example data to provide

export type ProductVariant = {
    variantName: string;
    variantQuantity: string;
    variantPrice: string;
  }

export class PurchaseOrder extends CommonActions {
  constructor(page: Page){
    super(page);
  }

  async createRFQ(vendor:string, currency: string): Promise<string>{
    await this.page.getByRole('option', { name: 'Purchase' }).click();
    await this.page.getByRole('button', { name: 'New' }).click();
    await this.page.getByRole('combobox', { name: 'Name, TIN, Email, or Reference' }).click();
    await this.page.getByRole('combobox', { name: 'Name, TIN, Email, or Reference' }).fill(vendor);
    await this.page.getByRole('option', { name: vendor }).click();
    await this.page.getByRole('combobox', { name: 'Currency' }).click();
    await this.page.getByRole('combobox', { name: 'Currency' }).fill(currency);
    await this.page.getByRole('option', { name: currency }).click();
    await this.page.getByRole('textbox', { name: 'Order Deadline?' }).click();
    await this.page.getByRole('button', { name: '15' }).click();
    await this.page.getByRole('button', { name: ' Apply' }).click();
    await this.page.getByRole('button', { name: 'Save manually' }).click();
    const orderNumber = this.page.getByRole('heading').locator('div').filter({ hasText: /^(P\d+)/ });
    await orderNumber.waitFor({ state: 'visible' });
    return await orderNumber.innerText()


  }

  async addPOLineItems(productList: ProductVariant[]){
    for (const product of productList){
      const newRow = await this.addNewRow("product");
      await this.fillNewRowCell(newRow, "product_template_id", product.variantName);
      await this.fillNewRowCell(newRow, "product_qty", product.variantQuantity);
      await this.fillNewRowCell(newRow, "price_unit", product.variantPrice)
      await this.page.getByRole('button', { name: 'Save manually' }).click();
    }
  }

  async confirmPO(){
    await this.page.getByRole('button', {name: "Confirm"}).click();
  }

  async searchPO(poName: string){
    await this.searchRecord(poName)
  }

}