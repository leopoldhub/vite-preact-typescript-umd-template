# \[Vite + Preact + Typescript + umd build\] template

This template includes:

- vite
- preact
- typescript
- the necessary configuration to build an umd file for vanilla html/js injection as a library

## steps to reproduce from scratch

1. Create a new vite + preact + typescript project
2. move `preact` into the `peerDependencies` in the `package.json`
   ```json
   {
      ...
       "peerDependencies": {
           ...
           "preact": "^10.22.1"
           ...
       },
      ...
   }
   ```
3. `npm i`
4. Add the following in your `vite.config.ts`
   ```ts
   export default defineConfig({
     ...
     build: {
       lib: {
         entry: "src/main.tsx", // replace with the path to your main.jsx file
           name: "MyLib", // the name you want to use when importing the library in HTML
           fileName: "my-lib", // the output file name
           formats: ["umd"] // to support importing in HTML
       }
     }
     ...
   });
   ```
5. Edit your `main.tsx` this way
   ```tsx
   import {render} from "preact";
   import {App} from "./app.tsx";
   import "./index.css";
   
   export function start(htmlElement: HTMLElement) {
   render(<App/>, htmlElement);
   }
   
   export default start;
   ```
6. Create a `main-dev.tsx`
   ```tsx
   import {start} from "./main.tsx";
   
   start(document.getElementById("app")!);
   ```
7. Edit you `index.html` to point to `main-dev.tsx` instead
   ```html
   ...
   <script type="module" src="/src/main-dev.tsx"></script>
   ...
   ```
8. `npm run build`
9. Add the following to your final `html` file (the start should be called after the `my-custom-render` declaration)
   ```html
   ...
   <script src="dist/my-lib.umd.cjs"></script>
   <link type="text/css" rel="stylesheet" href="dist/style.css">
   <div id="my-custom-render"></div>
   <script>
       MyLib.start(document.getElementById("my-custom-render"));
   </script>
   ...
   ```
10. Enjoy!

**Please note that everything in the `public` folder should be present at the root of your page to be loaded correctly!**