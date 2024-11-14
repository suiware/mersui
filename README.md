# MerSui
Simple "Buy Me a Coffee" React button with payments in SUI.

## Demo

[mersui.xyz](https://mersui.xyz)

## Installation

```bash
pnpm add mersui || yarn add mersui || npm install mersui
```

## Usage

First of all, wrap your main app component into the `MersuiProvider` component.

```tsx
import { MersuiProvider } from "mersui";

function App() {
  return (
    <MersuiProvider>
      <YourApp />
    </MersuiProvider>
  );
}
```

Then, use the `MersuiWidget` component to render the button.

```tsx
import { MersuiWidget } from "mersui";

function App() {
  return (
    <div>
      <MersuiWidget recipientAddress="0x..." />
    </div>
  );
}
```

That's it.

### Props

| Prop                | Type     | Default | Description |
| ------------------- | -------- | ------- | ----------- |
| buttonLabel         | string   | -       | Button label |
| recipientAddress    | string   | -       | Sui address of the recipient |
| containerClassName  | string   | -       | Optional class name for the button container |
| buttonClassName     | string   | -       | Optional class name for the button |
| statusClassName     | string   | -       | Optional class name for the status message. The `status-success` and `status-error` classes are automatically added for your convenience. |

## Pyth Integration

MerSui uses Pyth's Sponsored Feed for SUI/USD to properly calculate the transaction amount in SUI. 
See `lib/MerSuiWidget.tsx/fetchSuiPrice`.

## Development

The `src` folder contains a demo app that you can use to play with the library locally.

```bash
pnpm dev
```

The `lib` folder contains source code of the library.

## License & Copyright

Copyright (c) 2024 Konstantin Komelin

Licensed under the [MIT License](LICENSE).
