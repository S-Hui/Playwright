import { Page } from '@playwright/test';
import {CommonActions} from './Common';

export class employees extends CommonActions {
  constructor(page: Page){
    super(page);
  }



  async createEmployee(organization: string, email: string, phone){
    await this.selectModule('CRM');
    await this.createRecord();
    const completeOrganizationField = this.page.locator("o_wrap_field d-flex d-sm-contents flex-column mb-3 mb-sm-0").first().getByRole('combobox')
    await completeOrganizationField.click();
    await completeOrganizationField.fill(organization);
    await page.getByRole('textbox', { name: 'Email' }).click();
    await page.getByRole('textbox', { name: 'Email' }).fill(email);
    await page.getByRole('textbox', { name: 'Phone' }).click();
    await page.getByRole('textbox', { name: 'Phone' }).fill(phone);
    await page.getByRole('button', { name: 'Add', exact: true }).click();
     await page.getByRole('textbox', { name: 'Employee\'s Name' }).click();
  await page.getByRole('textbox', { name: 'Employee\'s Name' }).fill('Annie');
  await page.getByRole('textbox', { name: 'Job Position' }).click();
  await page.getByRole('textbox', { name: 'Job Position' }).fill('ERP Consultant');
  await page.getByRole('combobox', { name: 'Tags' }).click();
  await page.getByRole('combobox', { name: 'Tags' }).fill('Consultant');
  await expect(page.getByRole('option', { name: 'Create "Consultant"' })).toBeVisible();

  await page.getByRole('option', { name: 'Consultant', exact: true }).click();
  await expect(page.getByRole('link', { name: 'Delete' })).toBeVisible();

  await page.getByRole('combobox', { name: 'Department' }).click();
  await page.getByRole('combobox', { name: 'Department' }).fill('IT');
  await page.getByRole('option', { name: 'Create "IT"' }).click();
  await expect(page.getByRole('button', { name: 'Internal link' })).toBeVisible();

  await page.getByRole('combobox', { name: 'Job Position' }).click();
  await page.getByRole('combobox', { name: 'Job Position' }).fill('Consultant');
  await expect(page.getByRole('option', { name: 'Create "Consultant"' })).toBeVisible();

  await page.getByRole('option', { name: 'Consultant', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Consultant' })).toBeVisible();

  await page.getByRole('combobox', { name: 'Manager' }).click();
  await page.getByRole('combobox', { name: 'Manager' }).fill('Abrigal');
  await page.getByRole('option', { name: 'Create "Abrigal"' }).click();
  await expect(page.getByRole('button', { name: ' Org Chart' })).toBeVisible();

  await page.getByRole('tab', { name: 'Work Information' }).click();
  await expect(page.getByRole('combobox', { name: 'Work Address' })).toBeVisible();

  await page.getByRole('combobox', { name: 'Expense?' }).click();
  await page.getByRole('combobox', { name: 'Expense?' }).fill('Mitchell');
  await expect(page.getByRole('option', { name: 'Create "Mitchell"' })).toBeVisible();

  await page.getByRole('option', { name: 'Mitchell Admin' }).click();
  await expect(page.getByRole('button', { name: 'Internal link' })).toBeVisible();

  await page.locator('.o_inner_group.grid.hide-group-if-empty > div:nth-child(3) > .o_cell.o_wrap_input > .o_field_widget > .d-flex').click();
  await expect(page.getByRole('option', { name: 'Mitchell Admin' })).toBeVisible();

  await page.locator('.o_inner_group.grid.hide-group-if-empty > div:nth-child(3) > .o_cell.o_wrap_input > .o_field_widget > .d-flex').click();
  await page.getByRole('combobox', { name: 'Time Off?' }).click();
  await page.getByRole('combobox', { name: 'Time Off?' }).fill('Mitchell Admin');
  await expect(page.getByRole('option', { name: 'Create "Mitchell Admin"' })).toBeVisible();

  await page.getByRole('option', { name: 'Mitchell Admin', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Internal link' })).toBeVisible();

  await page.getByRole('tab', { name: 'Private Information' }).click();
  await expect(page.getByRole('textbox', { name: 'Private Address' })).toBeVisible();

  await page.getByRole('tab', { name: 'HR Settings' }).click();
  await expect(page.getByLabel('Employee Type?')).toBeVisible();

  await page.getByRole('combobox', { name: 'Related User?' }).click();
  await page.getByRole('combobox', { name: 'Related User?' }).fill('Mitche');
  await expect(page.getByRole('option', { name: 'Create "Mitche"' })).toBeVisible();

  await page.getByRole('option', { name: 'Mitchell Admin' }).click();
  await expect(page.getByRole('button', { name: ' 0 / 6 Courses' })).toBeVisible();

  await page.getByRole('button', { name: 'Save manually' }).click();
  await expect(page.getByText('Stay hereDiscard changesOh')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Oh snap!' })).toBeVisible();
  await page.getByText('Discard changes').click();
    }

}