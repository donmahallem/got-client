import {
    MomentFromNowPipe
} from './moment-from-now.pipe';
import * as moment from 'moment';
describe('MomentFromNowPipe', () => {
    const pipe: MomentFromNowPipe = new MomentFromNowPipe();
    it('should match the direct output', () => {
        const timestamp: number = Date.now();
        expect(pipe.transform(timestamp)).toEqual(moment(timestamp).fromNow());
    });
});
