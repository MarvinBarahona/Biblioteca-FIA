import { BibliotecaUESAdminPage } from './app.po';

describe('biblioteca-ues-admin App', () => {
  let page: BibliotecaUESAdminPage;

  beforeEach(() => {
    page = new BibliotecaUESAdminPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
