import { Page } from '@playwright/test';
import {CommonActions} from './Common';

export class crm extends CommonActions {
  constructor(page: Page){
    super(page);
  }

  async toCRM(){
    await this.selectModule('CRM');
  }

  async createOpportunity(organization: string, email: string, phone: string){

    await this.createNewRecord();
    const completeOrganizationField = this.page.locator("o_wrap_field d-flex d-sm-contents flex-column mb-3 mb-sm-0").first().getByRole('combobox')
    await completeOrganizationField.click();
    await completeOrganizationField.fill(organization);
    await this.page.getByRole('textbox', { name: 'Email' }).click();
    await this.page.getByRole('textbox', { name: 'Email' }).fill(email);
    await this.page.getByRole('textbox', { name: 'Phone' }).click();
    await this.page.getByRole('textbox', { name: 'Phone' }).fill(phone);
    await this.page.getByRole('button', { name: 'Add', exact: true }).click();
    }

}