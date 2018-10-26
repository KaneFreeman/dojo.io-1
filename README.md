# dojo.io poc

## About

This POC is a small demonstration in how we can generate the entire dojo.io site as a static site using dojo. This has a number of advantages, we can build the whole thing with just `@dojo build` (so this is trivially turned into a PWA, is code split appropriately, takes advantage of Build Time Rendering etc).

A small content processing node script at `scripts/compile.js`, which uses the `unified` ecosystem to generate dojo consumable `VNodes` and `WNodes` from markdown and html.

To define components add a tuple to the `handlers` array in `scripts/compile.js`, the first value being the name, the second whether it is an `inline` element (does not take children). Next register the component in the registry in `main.ts`, components are all prefixed with `docs-`.

Example:

register in `handlers` of `scripts/compile.js`
```ts
[ 'Thing' ]
```

register in `main.ts`
```ts
registry.define('docs-thing', MyThing)
```

usage in markdown:

```text
[Thing hello="world", foo="bar"]
Some content
[/Thing]
```

becomes:
```ts
w('docs-thing', { hello: 'world', foo: 'bar' }, [
    'Some content'
])
```

A number of sample components are provided.


This project was generated with the [Dojo CLI](https://github.com/dojo/cli) & [Dojo CLI create app command](https://github.com/dojo/cli-create-app).

## Build

Run `dojo build --mode dist` (the `mode` option defaults to `dist`) to create a production build for the project. The built artifacts will be stored in the `output/dist` directory.

## Development Build

Run `dojo build --mode dev` to create a development build for the project. The built artifacts will be stored in the `output/dev` directory.

## Development server

Run `dojo build --mode dev --watch memory --serve` to create an in memory development build and start a development server with hot reload. By default the server runs on port `9999`, navigate to `http://localhost:9999/`.

To change the port of the development use the `--port` option.

## Running unit tests

To run units tests in node only use `dojo test` which uses JIT (just in time) compilation.

To run the unit tests against built bundles, first the run a test build with `dojo build --mode unit`. The build test artifacts are written to the `output/tests/unit` directory.

Then `dojo test -c local` to run the projects unit tests. These tests are located in the `tests/unit` directory. The `--watch` options can be used with the test build which means that `dojo test` can be re-run without needing to re-build the full application each time.

## Running functional tests

To run the functional tests, first the run a test build with `dojo build --mode functional` and then `dojo test -f` to run the projects functional tests. These tests are located in the `tests/functional` directory.

## Further help

To get help for these commands and more, run `dojo` on the command line.
