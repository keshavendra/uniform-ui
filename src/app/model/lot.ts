import { Vendor } from './vendor';
import { LotItem } from './lotItem';

export class Lot {
    lotId?: number;
    invoiceNumber: string;
    lotVendor: Vendor;
    lotItems: LotItem[];
    extras: number;
    lotCreatedDate: Date;
    lotModifiedDate: Date;
}
