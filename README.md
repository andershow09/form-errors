# Form Errors (v1.1.x Universal)

[![npm version](https://badge.fury.io/js/form-errors.svg)](https://badge.fury.io/js/form-errors)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> Componente universal para exibição de erros em formulários Angular para **Ionic 2, 3, 4, 5 e 6**.

> 💡 **Usando Ionic 7 ou 8?** Utilize a versão moderna Standalone com Signals: [`form-errors@latest`](https://www.npmjs.com/package/form-errors).

---

## 🎯 Por que a v1.1.x?

A versão **1.1.x** foi completamente reformulada para resolver todos os problemas históricos das versões antigas (`0.0.10`):

- ✅ **Zero Dependências em Runtime:** Não depende mais de `ionic-angular`, `ionicons` ou `font-awesome`.
- ✅ **Livre de Referências Circulares:** Elimina o bug `IonicModule.forRoot(FormErrorsComponent)` que quebrava builds.
- ✅ **Ícone SVG Seguro e Nativo:** Sem scripts externos ou fontes de ícones pesadas; SVG inline renderizado com CSS nativo.
- ✅ **Cores Adaptativas:** Usa automaticamente `--ion-color-danger` no Ionic 4/5/6 com fallback transparente (`#f04141`) no Ionic 2/3.
- ✅ **Compatibilidade Abrangente:** Funciona tanto passando o `FormControl` diretamente (`[control]="form.controls.email"`) quanto passando o objeto de erros (`[control]="form.controls.email.errors"`).

---

## 📋 Matriz de Compatibilidade

| Versão do Ionic | Versão do Angular | Versão Recomendada da Lib |
|---|---|---|
| **Ionic 2** | Angular 2 a 4 | `form-errors@1.1.1` ✅ |
| **Ionic 3** | Angular 5 | `form-errors@1.1.1` ✅ |
| **Ionic 4** | Angular 7 a 8 | `form-errors@1.1.1` ✅ |
| **Ionic 5** | Angular 9 a 12 | `form-errors@1.1.1` ✅ |
| **Ionic 6** | Angular 13 a 15 | `form-errors@1.1.1` ✅ |
| **Ionic 7 & 8** | Angular 17 a 19+ | `form-errors@2.x` (tag: `latest`) 🚀 |

---

## 📦 Instalação

```bash
npm install form-errors@1.1.1 --save
```
*(Ou via tag legada: `npm install form-errors@legacy --save`)*

---

## 📚 Casos de Uso (Cases)

### Caso 1: Ionic 2 / Ionic 3 (App Module Global)

Importe o `FormErrorsModule` no seu `app.module.ts`:

```typescript
// app.module.ts
import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { FormErrorsModule } from 'form-errors';
import { MyApp } from './app.component';

@NgModule({
  declarations: [MyApp],
  imports: [
    IonicModule.forRoot(MyApp),
    FormErrorsModule, // Importe aqui!
  ],
  bootstrap: [IonicApp],
})
export class AppModule {}
```

---

### Caso 2: Ionic 3 com Lazy Loading (`IonicPage`)

Se você usa páginas sob demanda (`IonicPageModule`), importe no módulo da própria página:

```typescript
// login.module.ts
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FormErrorsModule } from 'form-errors';
import { LoginPage } from './login';

@NgModule({
  declarations: [LoginPage],
  imports: [
    IonicPageModule.forChild(LoginPage),
    FormErrorsModule, // Importe no módulo da página
  ],
})
export class LoginPageModule {}
```

---

### Caso 3: Ionic 4, Ionic 5 ou Ionic 6 (`@ionic/angular`)

No Ionic 4+, cada página geralmente possui seu próprio módulo Angular:

```typescript
// login.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FormErrorsModule } from 'form-errors';
import { LoginPage } from './login.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    FormErrorsModule, // Importe aqui!
  ],
  declarations: [LoginPage],
})
export class LoginPageModule {}
```

---

### Caso 4: Uso no Template com Reactive Forms (Recomendado)

Passe a instância do `FormControl` diretamente. O componente verifica automaticamente se o campo foi modificado (`dirty` ou `touched`):

```html
<form [formGroup]="loginForm" (ngSubmit)="doLogin()">
  <ion-list>
    <ion-item>
      <ion-label position="floating">E-mail</ion-label>
      <ion-input type="email" formControlName="email"></ion-input>
    </ion-item>
    <!-- Exibição de erros logo abaixo do item -->
    <form-errors
      [control]="loginForm.controls.email"
      required="O e-mail é obrigatório"
      email="Informe um e-mail válido">
    </form-errors>

    <ion-item>
      <ion-label position="floating">Senha</ion-label>
      <ion-input type="password" formControlName="password"></ion-input>
    </ion-item>
    <form-errors
      [control]="loginForm.controls.password"
      required="A senha é obrigatória"
      minLength="Mínimo de caracteres exigido:"
      pattern="A senha deve conter letras e números">
    </form-errors>

    <div padding class="ion-padding">
      <button ion-button block type="submit" [disabled]="!loginForm.valid">Entrar</button>
    </div>
  </ion-list>
</form>
```

No seu TypeScript:

```typescript
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'page-login',
  templateUrl: './login.html',
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/),
        ],
      ],
    });
  }
}
```

---

### Caso 5: Passando o Objeto de Erros Diretamente

Se você tem lógica customizada ou validação manual, pode passar diretamente o objeto `control.errors`:

```html
<form-errors
  [control]="loginForm.get('cpf').errors"
  required="CPF obrigatório"
  custom="CPF inválido">
</form-errors>
```

---

### Caso 6: Ocultando o Ícone de Alerta

Por padrão, um ícone SVG de exclamação é exibido ao lado da mensagem. Para ocultá-lo:

```html
<form-errors
  [control]="loginForm.controls.name"
  required="Nome é obrigatório"
  [showIcon]="false">
</form-errors>
```

---

### Caso 7: Validação de Mínimo e Máximo Numérico (`min` / `max`)

```html
<ion-item>
  <ion-label position="floating">Idade</ion-label>
  <ion-input type="number" formControlName="age"></ion-input>
</ion-item>
<form-errors
  [control]="form.controls.age"
  required="Idade é obrigatória"
  min="Idade mínima permitida é 18 anos"
  max="Idade máxima permitida é 120 anos">
</form-errors>
```

---

## 🎛️ Parâmetros Disponíveis (`Inputs`)

| Parâmetro | Tipo | Padrão | Descrição |
|---|---|---|---|
| `[control]` | `AbstractControl \| ValidationErrors` | *obrigatório* | Controle do formulário ou objeto `.errors` |
| `[required]` | `string` | `''` | Mensagem para erro de campo obrigatório (`Validators.required`) |
| `[email]` | `string` | `''` | Mensagem para e-mail inválido (`Validators.email`) |
| `[min]` | `string` | `''` | Mensagem para valor numérico abaixo do mínimo (`Validators.min`) |
| `[max]` | `string` | `''` | Mensagem para valor numérico acima do máximo (`Validators.max`) |
| `[minLength]` / `[minlength]` | `string` | `''` | Mensagem para tamanho mínimo de caracteres (`Validators.minLength`) |
| `[maxLength]` / `[maxlength]` | `string` | `''` | Mensagem para tamanho máximo de caracteres (`Validators.maxLength`) |
| `[pattern]` | `string` | `''` | Mensagem para falha na expressão regular (`Validators.pattern`) |
| `[custom]` | `string` | `''` | Mensagem padrão/fallback para validadores customizados |
| `[showIcon]` | `boolean` | `true` | Exibe ou oculta o ícone SVG de alerta |

---

## 🔄 Migração de `0.0.10` para `1.1.0`

Nenhuma alteração de template é necessária! A `v1.1.0` é **100% retrocompatível** com o markup da versão legada, corrigindo os bugs internos e removendo as dependências vulneráveis.

---

## 📄 Licença

[MIT](LICENSE) © Anderson Pereira
