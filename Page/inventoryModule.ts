import { Page, expect } from '@playwright/test';
import {CommonActions} from './Common';


export class inventory extends CommonActions {
  constructor(page: Page){
    super(page);
  }


  async createBatchTransfer(){
    this.clickNavigationMenu("Operations", "Deliveries")

  }
}