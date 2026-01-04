import { Page, Locator, expect } from '@playwright/test'

export class CommonActions {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }



  // About addAWhat:
  // If the button says Add a line, addAWhat should be "Line"
  // If the button says Add a product, addAWhat should be "product" and so forth
  async addNewRow(addAWhat: string): Promise<Locator>{
    const rows = this.page.locator('tr.o_data_row')
    const initialCount = await rows.count();
    await this.page.getByRole('button', { name: `Add a ${addAWhat}` }).click();
    await expect(rows).toHaveCount(initialCount +1 );
    const newRow = this.page.locator('tr.o_data_row.o_selected_row').last();
    return newRow
  }

  async fillNewRowCell(newRow: Locator, column: string, data: string){
    const cell = newRow.locator(`td[name="${column}"]`).locator('input, textarea').first()
    await cell.click()
    await cell.fill(data)
    const role = await cell.getAttribute("role")
    if (role == 'combobox'){
      await this.page.getByRole('option', { name: data }).click();
    }
  }

  async searchRecord(data:string){
    await this.page.getByRole('searchbox', { name: 'Search...' }).click();
    await this.page.getByRole('searchbox', { name: 'Search...' }).fill(data);
    await this.page.getByRole('searchbox', { name: 'Search...' }).press('Enter');
  }


}