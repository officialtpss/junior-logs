import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class CryptoSecurityService {
  secretKey: string = 'Tech-Prastish';
  constructor() { }

  encrypt(arg: string): string {
    return CryptoJS.AES.encrypt(arg, this.secretKey).toString();
  }

  decrypt(arg: string): string {
    return CryptoJS.AES.decrypt(arg, this.secretKey).toString(CryptoJS.enc.Utf8);
  }
}
