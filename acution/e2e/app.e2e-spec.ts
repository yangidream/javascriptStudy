import { AcutionPage } from './app.po';

describe('acution App', () => {
  let page: AcutionPage;

  beforeEach(() => {
    page = new AcutionPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
