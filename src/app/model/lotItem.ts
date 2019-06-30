import { Uniform } from './uniform';

export class LotItem {
    lotItemId?: number;
    uniform: Uniform;
    costPrice: number;
    gst: number;
    quantity: number;
}
