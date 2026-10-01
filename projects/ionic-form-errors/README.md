# @AShows/ionic-form-errors

[![npm version](https://badge.fury.io/js/%40AShows%2Fionic-form-errors.svg)](https://www.npmjs.com/package/@AShows/ionic-form-errors)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> Biblioteca Angular moderna para exibição de erros de validação em formulários do **Ionic 7 e 8+**.

**100% Standalone** · **Zero dependências em runtime** · **Suporte a Signals** · **Compatível com NgModule**

> 🏛️ **Precisa de suporte para Ionic 2, 3, 4, 5 ou 6?**  
> Utilize a versão universal legada [`form-errors@1.1.0`](https://www.npmjs.com/package/form-errors) mantida na branch [`v1-legacy`](https://github.com/andershow09/form-errors/tree/v1-legacy).

---

## ✨ Recursos

- 🚀 **100% Standalone:** Não requer `NgModule`. Importe e use diretamente em componentes modernos.
- 🧩 **Compatível com NgModule:** Funciona perfeitamente dentro de módulos clássicos do Angular 17+.
- 🎨 **Integração Visual com Ionic:** Respeita as CSS Custom Properties (`--ion-color-danger`) e a API nativa `errorText`.
- 📦 **Duas Formas de Uso:**
  1. `<ion-form-errors>`: Componente visual com ícone SVG nativo e animação fluida.
  2. `[ionFormErrors]`: Diretiva inline para preencher o slot `errorText` nativo do `<ion-input>` sem markup extra.
- 🌍 **Pronto para i18n:** Mensagens podem ser strings estáticas ou funções dinâmicas com parâmetros.
- 🎯 **Estratégias de Exibição:** Controle quando os erros aparecem (`dirty`, `touched`, `dirtyOrTouched`, ou `immediate`).
- ⚙️ **Configuração Global:** Defina mensagens e comportamento padrão uma única vez com `provideIonFormErrors()`.

---

## 📋 Matriz de Versões

| Versão da Lib | Ecossistema Alvo | Versão do Ionic | Versão do Angular |
|---|---|---|---|
| **`@AShows/ionic-form-errors@2.x`** (Esta) | **Moderno** | **Ionic 7 e 8+** | **Angular 17, 18, 19+** |
| **`form-errors@1.1.0`** ([branch `v1-legacy`](https://github.com/andershow09/form-errors/tree/v1-legacy)) | **Legado Universal** | **Ionic 2, 3, 4, 5 e 6** | **Angular 2 a 15** |

---

## 📦 Instalação

```bash
npm install @AShows/ionic-form-errors
```

---

## ⚙️ Configuração Global (Opcional)

No seu `app.config.ts` (ou no `providers` do seu `AppModule`):

```typescript
// app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideIonFormErrors } from '@AShows/ionic-form-errors';

export const appConfig: ApplicationConfig = {
  providers: [
    provideIonFormErrors({
      defaultMessages: {
        required: 'Este campo é obrigatório',
        email: 'Informe um endereço de e-mail válido',
        minlength: ({ requiredLength, actualLength }) =>
          `Mínimo de ${requiredLength} caracteres (digitados: ${actualLength})`,
        maxlength: ({ requiredLength }) =>
          `Máximo de ${requiredLength} caracteres permitidos`,
        min: ({ min }) => `Valor mínimo permitido é ${min}`,
        max: ({ max }) => `Valor máximo permitido é ${max}`,
        pattern: 'Formato inválido',
      },
      displayStrategy: 'dirty', // 'dirty' | 'touched' | 'dirtyOrTouched' | 'immediate'
      maxErrors: 1,
    }),
  ],
};
```

---

## 📚 Casos de Uso (Cases)

### Caso 1: Componente Standalone em Página Ionic 8 (Recomendado)

```typescript
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonInput, IonItem, IonList, IonTitle, IonToolbar, IonButton } from '@ionic/angular/standalone';
import { IonFormErrorsComponent } from '@AShows/ionic-form-errors';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonInput,
    IonButton,
    IonFormErrorsComponent, // Importe o componente diretamente!
  ],
  template: `
    <ion-content class="ion-padding">
      <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <ion-list>
          <ion-item>
            <ion-input formControlName="email" label="E-mail" labelPlacement="floating" type="email" />
          </ion-item>
          <!-- Exibe erros do campo com mensagens customizadas -->
          <ion-form-errors
            [control]="form.controls.email"
            [messages]="{ required: 'O e-mail é obrigatório para continuar' }" />

          <ion-item>
            <ion-input formControlName="password" label="Senha" labelPlacement="floating" type="password" />
          </ion-item>
          <ion-form-errors [control]="form.controls.password" />

          <ion-button expand="block" type="submit" [disabled]="form.invalid">
            Entrar
          </ion-button>
        </ion-list>
      </form>
    </ion-content>
  `,
})
export class LoginPage {
  private fb = inject(FormBuilder);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  onSubmit() {
    if (this.form.valid) {
      console.log('Login:', this.form.value);
    }
  }
}
```

---

### Caso 2: Diretiva Inline `[ionFormErrors]` (Sem Markup Extra)

A diretiva conecta automaticamente o status de validação à propriedade nativa `errorText` do componente Ionic:

```html
<ion-item>
  <ion-input
    formControlName="email"
    label="E-mail"
    labelPlacement="floating"
    type="email"
    ionFormErrors
    [errorMessages]="{
      required: 'E-mail obrigatório',
      email: 'Formato de e-mail inválido'
    }">
  </ion-input>
</ion-item>
```

---

### Caso 3: Uso em Projetos com `NgModule` Clássico (Ionic 7 ou 8)

Mesmo que sua aplicação ainda utilize a estrutura tradicional baseada em `NgModule`, você pode consumir a biblioteca sem problemas:

```typescript
// login.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IonFormErrorsComponent, IonFormErrorsDirective } from '@AShows/ionic-form-errors';
import { LoginPage } from './login.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    IonFormErrorsComponent, // Componentes standalone são aceitos no imports do NgModule!
    IonFormErrorsDirective,
  ],
  declarations: [LoginPage],
})
export class LoginPageModule {}
```

---

### Caso 4: Exibição de Múltiplos Erros Simultâneos

Por padrão, a biblioteca exibe 1 erro por vez (o primeiro ativo). Você pode configurar para exibir múltiplos erros no mesmo campo:

```html
<ion-form-errors
  [control]="form.controls.password"
  [maxErrors]="3"
  [messages]="{
    required: 'Senha é obrigatória',
    minlength: 'Mínimo de 8 dígitos',
    pattern: 'Deve conter letras e números'
  }">
</ion-form-errors>
```

---

### Caso 5: Mensagens Dinâmicas com Parâmetros do Validador

Você pode fornecer funções que recebem os parâmetros exatos calculados pelo Angular:

```typescript
const customMessages: ErrorMessages = {
  minlength: ({ requiredLength, actualLength }) =>
    `Faltam ${Number(requiredLength) - Number(actualLength)} caracteres`,
  min: ({ min, actual }) =>
    `Valor digitado (${actual}) é menor que o mínimo (${min})`,
};
```

```html
<ion-form-errors [control]="form.controls.age" [messages]="customMessages" />
```

---

## 📖 Referência da API

### `<ion-form-errors>` Component

| Input | Tipo | Padrão | Descrição |
|---|---|---|---|
| `control` | `AbstractControl` | *obrigatório* | Controle do formulário a ser observado |
| `messages` | `ErrorMessages` | `{}` | Mensagens no nível do componente (sobrescrevem globais) |
| `maxErrors` | `number` | config global (`1`) | Quantidade máxima de erros simultâneos |

### `[ionFormErrors]` Directive

| Input | Tipo | Padrão | Descrição |
|---|---|---|---|
| `errorMessages` | `ErrorMessages` | `{}` | Mensagens específicas para o input |
| `[ionFormErrors]` | `ErrorMessages` | `{}` | Alias permitindo binding direto: `[ionFormErrors]="msgs"` |

### `provideIonFormErrors(config)`

| Opção | Tipo | Padrão | Descrição |
|---|---|---|---|
| `defaultMessages` | `ErrorMessages` | Padrão inglês | Mensagens globais de fallback |
| `displayStrategy` | `DisplayStrategy` | `'dirty'` | Quando exibir erros (`'dirty'`, `'touched'`, `'dirtyOrTouched'`, `'immediate'`) |
| `maxErrors` | `number` | `1` | Limite padrão de erros por campo |

---

## 🔄 Tabela de Migração da v1 (Legada)

| Recurso | Versão Legada (`v1.x`) | Versão Moderna (`v2.x`) |
|---|---|---|
| **Pacote npm** | `form-errors` | `@AShows/ionic-form-errors` |
| **Arquitetura** | `NgModule` (`FormErrorsModule`) | **100% Standalone** |
| **Reatividade** | Invocação estática / getter | **Change Detection integrada** |
| **Diretiva Inline** | ❌ Não suportada | ✅ `[ionFormErrors]` com `errorText` nativo |
| **Configuração Global** | ❌ Não suportada | ✅ `provideIonFormErrors()` |
| **Suporte i18n / Funções** | ❌ Apenas strings estáticas | ✅ Strings ou funções dinâmicas |
| **Cobertura de Testes** | 0% | **98.29% (Vitest)** |

---

## 📄 Licença

[MIT](LICENSE) © Anderson Pereira
