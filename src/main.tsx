import renderer from '@dojo/framework/widget-core/vdom';
import Registry from '@dojo/framework/widget-core/Registry';
import { tsx } from '@dojo/framework/widget-core/tsx';
import { registerRouterInjector } from '@dojo/framework/routing/RouterInjector';
import has from '@dojo/framework/has/has';
import { HashHistory } from '@dojo/framework/routing/history/HashHistory';
import { StateHistory } from '@dojo/framework/routing/history/StateHistory';

import routes from './routes';
import App from './App';

import CodeSandbox from './widgets/CodeSandbox';
import CodeBlock from './widgets/CodeBlock';
import Task from './widgets/Task';
import Instruction from './widgets/Instruction';
import Aside from './widgets/Aside';
import Metadata from './widgets/Metadata';

const registry = new Registry();

registerRouterInjector(routes, registry, {
	HistoryManager: has('build-time-render') ? HashHistory : StateHistory
});

registry.define('docs-aside', Aside);
registry.define('docs-codeblock', CodeBlock);
registry.define('docs-task', Task);
registry.define('docs-instruction', Instruction);
registry.define('docs-codesandbox', CodeSandbox);
registry.define('docs-metadata', Metadata);

const r = renderer(() => <App />);
const domNode = document.getElementById('root') as HTMLElement;
r.mount({ registry, domNode });
