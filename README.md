# MerSui
Simple "Buy Me a Coffee" React button with payments in SUI.

## Demo

[mersui.xyz](https://mersui.xyz)

## Installation

```bash
pnpm add mersui || yarn add mersui || npm install mersui
```

## Usage

First of all, wrap your main app component into the `MerSuiProvider` component.

```tsx
import { MerSuiProvider } from "mersui";

function App() {
  return (
    <MerSuiProvider>
      <YourApp />
    </MerSuiProvider>
  );
}
```

Then, use the `MerSuiWidget` component to render the button.

```tsx
import { MerSuiWidget } from "mersui";

function App() {
  return (
    <div>
      <MerSuiWidget recipientAddress="0x..." />
    </div>
  );
}
```

Enjoy!

### Props

| Prop                | Type     | Default | Description |
| ------------------- | -------- | ------- | ----------- |
| buttonLabel         | string   | -       | Button label |
| recipientAddress    | string   | -       | Sui address of the recipient |
| containerClassName  | string   | -       | Optional class name for the button container |
| buttonClassName     | string   | -       | Optional class name for the button |
| statusClassName     | string   | -       | Optional class name for the status message. The `status-success` and `status-error` classes are automatically added for your convenience. |

## Pyth integration

MerSui uses [Pyth's Sponsored Feed for SUI/USD](https://docs.pyth.network/price-feeds/sponsored-feeds/sui) to properly calculate the transaction amount in SUI. 
See [lib/MerSuiWidget.tsx/fetchSuiPrice](/lib/components/MerSuiWidget.tsx#L184).

## Development

The `lib` folder contains the source code of the library.

The `src` folder contains a demo app that you can use to play with the library locally.

But before that, you need to set up the environment variables:

```
# .env.local
VITE_RECIPIENT_ADDRESS=0x...
```

Then, run the development server:

```bash
pnpm dev
```

## Build the library

```bash
pnpm build
```

## License & copyright

Copyright (c) 2024 Konstantin Komelin

Licensed under the [MIT License](LICENSE).
