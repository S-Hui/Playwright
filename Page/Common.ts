import { Page, Locator, expect } from '@playwright/test'

export type filterConditions = {
    column: string;
    operator: string;
    value?: string;
}

export type ProductVariant = {
    variantName: string;
    variantQuantity: string;
    variantPrice: string;
    tax?: string
  }

export class CommonActions {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async selectModule(moduleName: string){
    await this.page.getByRole('option', {name: moduleName}).click();
  }

  async createNewRecord(){
    await this.page.getByRole('button', { name: 'New' }).click();
  }

  async locateRow(rowLocator:string, textWithinRowTag: string, textWithinRow: string):Promise<Locator>{
    const row = this.page.locator(rowLocator).filter({
      has: this.page.locator(textWithinRowTag,{ hasText: textWithinRow})
    })
    return row
  }

  // About addAWhat:
  // If the button says Add a line, addAWhat should be "Line"
  // If the button says Add a product, addAWhat should be "product" and so forth
  async addNewRow(rowLocator:string, addAWhat: string, newRowLocator?:string[]): Promise<Locator>{
    const rows = this.page.locator(rowLocator)
    const initialCount = await rows.count();
    await this.page.getByRole('button', { name: `Add a ${addAWhat}` }).click();
    await expect(rows).toHaveCount(initialCount +1 );
      const newRow = this.page.locator([rowLocator, ...(newRowLocator ?? [])].join(".")).last();
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
    await this.page.getByRole('cell', { name: data }).click();

  }


  async fillFilterRows(row: Locator, column:string, operator:string, value: string = ""){
    await row.locator('.o_tree_editor_editor').first().click();
    await row.getByRole('textbox', { name: 'Search...' }).fill(column);
    await row.getByRole('button', { name: column, exact: true }).click();
    await row.getByRole('combobox').selectOption(operator);
    await row.getByRole('textbox').click();
    if (value == ""){
      await row.getByRole('textbox').fill(value);
    }
  }

  async filterRecord(conditions: filterConditions[], logic: string){
    await this.page.locator('.dropdown-toggle.o_searchview_dropdown_toggler').click();
    await expect(this.page.getByRole('heading', { name: 'Filters' })).toBeVisible();
    await this.page.getByRole('menuitem', { name: 'Add Custom Filter' }).click();
    for (let i = 0; i < conditions.length; i++){
      if (i > 0){
        await this.page.getByRole('button', { name: 'Add', exact: true }).click();
      }
      const rowLocator = this.page.locator('.o_tree_editor_node').last()
      const condition = conditions[i]
      this.fillFilterRows(rowLocator, condition.column, condition.operator, condition.value)
    }
    if (logic == "all"){
      await this.page.getByRole('button', { name: 'any', exact: true }).click();
      await this.page.getByRole('menuitem', { name: 'all' }).click();
    }

    await this.page.getByRole('button', { name: 'Add', exact: true }).click();


  }

  async clickAndCompleteCombobox(fieldname:string, data: string){
    await this.page.getByRole('combobox', { name: fieldname }).click();
    await this.page.getByRole('combobox', { name: fieldname }).fill(data);
    const existingOption = this.page.getByRole('option', { name: data})
    if (await existingOption.isVisible()){
      await existingOption.click()
    } else{
      await this.page.getByRole('option', { name: `Create ${data}` }).click();
    }
  }

  async clickNavigationMenu(button: string, menuItem: string){
    await this.page.getByRole('button', { name: button }).click();
    await expect(this.page.getByRole('menuitem', { name: menuItem })).toBeVisible();
    await this.page.getByRole('menuitem', { name: menuItem }).click();
};
}
