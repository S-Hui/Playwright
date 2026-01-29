import { Page } from '@playwright/test';
import {CommonActions, ProductVariant} from './Common';

// Example data to provide

export class PurchaseOrder extends CommonActions {
  constructor(page: Page){
    super(page);
  }

  async toPurchaseModule(){
    await this.selectModule('Purchase');
  }

  async createRFQ(vendor:string, currency: string): Promise<string>{
    await this.createNewRecord();
    await this.clickAndCompleteCombobox('Name, TIN, Email, or Reference', vendor);
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
      const newRow = await this.addNewRow("tr.o_data_row", "product", ["o_selected_row"]);
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