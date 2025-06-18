# Online Store - Angular 20

This repository contains a minimal example of an online store built with Angular 20 features such as standalone components, the new control flow syntax, and signals.

Due to environment limitations there is no generated build or installed dependencies. The structure is intentionally small so you can run `npm install` and `ng build` locally once you have access to the internet.

## Features

- **Standalone components** - All components are marked `standalone: true`.
- **New control flow** - The `@for` block is used inside templates.
- **Signals** - A simple `ProductService` exposes products via signals.

## Structure

- `src/main.ts` – bootstraps the standalone `AppComponent` and router.
- `src/app.component.ts` – root component using the new style guide.
- `src/product-list.component.ts` – lists products using the `@for` control flow.
- `src/product.service.ts` – provides products via an Angular signal.
- `tsconfig.json` – minimal TypeScript configuration targeting ES2022.

To run the project locally, install Angular CLI and dependencies:

```bash
npm install
ng serve
```

This will compile the project using the latest Angular release.
