# Sample Tutorial

## Metadata
[Metadata overview="Learn how to create and style custom widgets in Dojo.", topic="widgets"]

## Aside
[Aside title="Mandatory object for properties"]
The 2nd argument of the `w()` function is mandatory even you have no properties to pass in. This is to ensure the correct type guarding for all widgets in TypeScript.
[/Aside]

## Task
[Task]
Create a new root node for the application
[/Task]

## Instruction
[Instruction]
Add these lines at the top of the file.
[/Instruction]

## CodeSandbox Embed
[CodeSandbox url=https://codesandbox.io/embed/github/dojo/examples/tree/master/todo-mvc]

## CodeBlock from file
[CodeBlock path=./sample-code.ts, language=ts]

## CodeBlock from file with region
[CodeBlock path=./sample-code.ts, region=renderFunc, language=ts]

## Standard code fences
```ts
render() {
	return v('div', [ 'some inline code' ]);
}
```
