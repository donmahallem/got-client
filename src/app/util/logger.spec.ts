import { Logger } from './logger';
import { environment } from './../environment';
describe('Logger', () => {
    const testArg: string[] = ['a', 'b', 'c'];
    describe('log()', () => {
        let spy: jasmine.Spy;
        beforeEach(() => {
            spy = spyOn(console, 'log');
        });
        it('should output not in production', () => {
            environment.production = false;
            Logger.log('a', 'b', 'c');
            expect(spy.calls.count()).toEqual(1);
            expect(spy.calls.argsFor(0)).toEqual(testArg);
        });
        it('should not output in production', () => {
            environment.production = true;
            Logger.log('a', 'b', 'c');
            expect(spy.calls.count()).toEqual(0);
        });
    });
    describe('info()', () => {
        let spy: jasmine.Spy;
        beforeEach(() => {
            spy = spyOn(console, 'info');
        });
        it('should output not in production', () => {
            environment.production = false;
            Logger.info('a', 'b', 'c');
            expect(spy.calls.count()).toEqual(1);
            expect(spy.calls.argsFor(0)).toEqual(testArg);
        });
        it('should not output in production', () => {
            environment.production = true;
            Logger.info('a', 'b', 'c');
            expect(spy.calls.count()).toEqual(0);
        });
    });
    describe('error()', () => {
        let spy: jasmine.Spy;
        beforeEach(() => {
            spy = spyOn(console, 'error');
        });
        it('should output not in production', () => {
            environment.production = false;
            Logger.error('a', 'b', 'c');
            expect(spy.calls.count()).toEqual(1);
            expect(spy.calls.argsFor(0)).toEqual(testArg);
        });
        it('should not output in production', () => {
            environment.production = true;
            Logger.error('a', 'b', 'c');
            expect(spy.calls.count()).toEqual(0);
        });
    });
});
