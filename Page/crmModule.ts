import { Page } from '@playwright/test';
import {CommonActions} from './Common';

export class crm extends CommonActions {
  constructor(page: Page){
    super(page);
  }



  async createOpportunity(organization: string, email: string, phone){
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
    }

}