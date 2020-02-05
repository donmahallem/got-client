
import {
    SearchUtil
} from './search-util';

describe('SearchUtil', () => {
    describe('sanitzie()', () => {
        it('should remove doubled whitespace characters', () => {
            expect(SearchUtil.sanitize('test  footage  of    stuff')).toEqual('test footage of stuff');
        });
        it('should remove all line breaks', () => {
            expect(SearchUtil.sanitize('te\r\nst te\r\nst')).toEqual('test test', 'should remove all \\r\\n');
            expect(SearchUtil.sanitize('te\nst te\nst')).toEqual('test test', 'should remove all \\n');
            expect(SearchUtil.sanitize('te\rst te\rst')).toEqual('test test', 'should remove all \\r');
        });
    });
});
