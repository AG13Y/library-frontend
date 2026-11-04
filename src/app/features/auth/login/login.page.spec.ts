import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { LoginPage } from './login.page';

describe('LoginPage', () => {
  let fixture: ComponentFixture<LoginPage>;
  let component: LoginPage;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginPage],
      providers: [provideHttpClient(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the GestBook brand', () => {
    expect(fixture.nativeElement.textContent).toContain('GestBook');
  });

  // TODO (testes futuros):
  // - formulário inválido não chama AuthService.login
  // - login com sucesso navega para /dashboard
  // - login com sucesso respeita returnUrl válido
  // - returnUrl externo (ex.: //evil.com) é ignorado
  // - 401 mostra "Usuário ou senha inválidos."
  // - outros erros mostram a mensagem genérica
  // - botão de olho alterna o tipo do campo entre password e text
  // - Caps Lock ativado exibe o aviso no campo de senha
});