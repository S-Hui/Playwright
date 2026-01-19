import { Page, expect } from '@playwright/test';
import {CommonActions} from './Common';

export class employees extends CommonActions {
  constructor(page: Page){
    super(page);
  }

  async toEmployees(){
    await this.selectModule('Employees');
  }

  async createEmployee(name: string, position:string, department:string, manager: string, tags: string[], expenseApprover: string, timeoffApprover: string, email: string, phone: string, emergencyContact: string, emergencyPhone: string, employeeType: string, odooUser: string){
    await this.createNewRecord();
    await this.page.getByRole('textbox', { name: 'Employee\'s Name' }).click();
    await this.page.getByRole('textbox', { name: 'Employee\'s Name' }).fill(name);
    await this.page.getByRole('textbox', { name: 'Job Position' }).click();
    await this.page.getByRole('textbox', { name: 'Job Position' }).fill(position);
    for (const tag of tags){
      this.clickAndCompleteCombobox('Tags',tag);
    }
    this.clickAndCompleteCombobox('Department', department);
    this.clickAndCompleteCombobox('Job Position', position);
    this.clickAndCompleteCombobox('Manager', manager);
    await this.page.getByRole('tab', { name: 'Work Information' }).click();
    await expect(this.page.getByRole('textbox', { name: 'APPROVERS' })).toBeVisible();
    this.clickAndCompleteCombobox('Expense?', expenseApprover)
    this.clickAndCompleteCombobox('Time Off?', timeoffApprover)
    await this.page.getByRole('tab', { name: 'Private Information' }).click();
    await expect(this.page.getByRole('textbox', { name: 'PRIVATE CONTACT' })).toBeVisible();
    await this.page.getByRole('textbox', { name: 'Email', exact: true }).click();
    await this.page.getByRole('textbox', { name: 'Email', exact: true }).fill(email);
    await this.page.getByRole('textbox', { name: 'Phone', exact: true }).click();
    await this.page.getByRole('textbox', { name: 'Phone', exact: true }).fill(phone);
    await this.page.getByRole('textbox', { name: 'Contact Name' }).click();
    await this.page.getByRole('textbox', { name: 'Contact Name' }).fill(emergencyContact);
    await this.page.getByRole('textbox', { name: 'Contact Phone' }).click();
    await this.page.getByRole('textbox', { name: 'Contact Phone' }).fill(emergencyPhone);
    await this.page.getByRole('tab', { name: 'HR Settings' }).click();
    await expect(this.page.getByRole('textbox', { name: 'STATUS' })).toBeVisible();
    await this.page.getByLabel('Employee Type?').selectOption(employeeType);
    this.clickAndCompleteCombobox('Related User?', odooUser)
    await this.page.getByRole('button', { name: 'Save manually' }).click();
    }

}