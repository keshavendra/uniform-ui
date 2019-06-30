import { School } from './school';
import { UniformSize } from './uniformSize';

export class Uniform {
    uniformId ?: number;
    school: School;
    uniformDetail: string;
    uniformSize: UniformSize;
}
