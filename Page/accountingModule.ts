import { Page, expect, Locator } from '@playwright/test';
import {CommonActions, ProductVariant} from './Common';

export type Invoice = {
    Invoice: string,
    LineItems: ProductVariant[]

}

export class accounting extends CommonActions {
  constructor(page: Page){
    super(page);
  }

  async toAccounting(){
    await this.selectModule('Accounting');
  }

  async locateInvoice(invoice: Invoice){
    await this.clickNavigationMenu('Customers', "Invoices");
    await this.searchRecord(invoice["Invoice"])  
  }

  async locateInvoiceLine(text: string): Promise<Locator>{
    return await this.locateRow("tr.o_data_row", "span",text)
  }
  async updateInvoiceLineItems(invoice: Invoice){
    for (const lineItem of invoice.LineItems){
        if (await this.page.locator("table", {hasText: lineItem.variantName}).isVisible()){
            const theRow = await this.locateInvoiceLine(lineItem.variantName)
            await this.fillNewRowCell(theRow, "quantity", lineItem.variantQuantity);
            await this.fillNewRowCell(theRow, "price_unit", lineItem.variantPrice)
        }else{
        const newRow = await this.addNewRow("tr.o_data_row", "line", ["o_selected_row"]);
        await this.fillNewRowCell(newRow, "product_id", lineItem.variantName);
        await this.fillNewRowCell(newRow, "quantity", lineItem.variantQuantity);
        await this.fillNewRowCell(newRow, "price_unit", lineItem.variantPrice)

      }
      await this.page.getByRole('button', { name: 'Save manually' }).click();
    }

}

async removeLineItem(sku: string){
  const theRow = await this.locateInvoiceLine(sku);
  await theRow.getByRole("button", { name: "delete"}).click();
  await this.save();

}

async updatePrice(sku: string, price: string){
  const theRow = await this.locateInvoiceLine(sku);
  await this.fillNewRowCell(theRow, "price_unit", price)
  await this.save();
}

async updateQuantity(sku:string , quantity: string){
  const theRow = await this.locateInvoiceLine(sku);
  await this.fillNewRowCell(theRow, "quantity", quantity);
  await this.save();

  
}

async deleteTaxTag(tag:string){
  await this.deleteTag(tag)
  await this.save()

}

}