import { GotClientPage } from './app.po';

describe('got-client App', () => {
  let page: GotClientPage;

  beforeEach(() => {
    page = new GotClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
