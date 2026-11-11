# Agro+ - Sistema de gerenciamento de comunidades

Este projeto foi gerado usando [Angular CLI](https://github.com/angular/angular-cli) versão 20.3.7.

## Configuração inicial

Para executar seu projeto adicione as váriaveis de configuração do Firebase no caminho:
```bash
src/environments/environment.ts
```

No caminho adicione os seguintes itens:

```ts
export const environment = {
  firebaseConfig: {
    apiKey: 'SUA_API_KEY',
    authDomain: 'seu-projeto.firebaseapp.com',
    projectId: 'seu-projeto',
    storageBucket: 'seu-projeto.appspot.com',
    messagingSenderId: '000000000000',
    appId: '1:000000000000:web:xxxxxxxxxxxxxx'
  }
};
```