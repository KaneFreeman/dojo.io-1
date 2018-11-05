const fs = require('fs-extra');
const fsPath = require('path');
const manifest = require('../content/manifest.json');
const unified = require('unified');
const parse = require('remark-parse');
const { v, w } = require('@dojo/framework/widget-core/d');
const toH = require('hast-to-hyperscript');
const remark2rehype = require('remark-rehype');
const refractor = require('refractor');
const rehypePrism = require('@mapbox/rehype-prism');
const rehype = require('rehype-parse');
const macro = require('remark-macro')()
var all = require('mdast-util-to-hast/lib/all')

const handlers = [
	[ 'Aside' ],
	[ 'Task' ],
	[ 'Instruction' ],
	[ 'CodeBlock', true ],
	[ 'CodeSandbox', true ],
	[ 'Metadata', true ]
];

const widgets = {
	'docs-codeblock': (type, props, children) => {
		let { path, region, language = 'ts' } = props;
		path = fsPath.resolve(__dirname, '../', 'content', path);
		let code = fs.readFileSync(path, 'utf-8');
		if (region) {
			const regionRegEx = new RegExp(`\/\/@start-region ${region}\\n(.[\\s\\S]*)\/\/@end-region ${region}`, 'gm');
			const regionMatches = regionRegEx.exec(code);
			if (regionMatches && regionMatches.length) {
				code = regionMatches[1];
			}
		}
		code = code.replace(/\/\/\@.*-region.*/g, '');
		code = `<pre><code class="language-${language}">${code}</pre></code>`;
		return w(type, props, [ fromHtml(code) ]);
	}
}

const pragma = (...args) => {
	const [ tag, props, children ] = args;
	if (tag.substr(0, 1) === tag.substr(0, 1).toUpperCase()) {
		const type = `docs-${tag.toLowerCase()}`;
		if (widgets[type]) {
			return widgets[type](type, props, children);
		}
		return w(type, props, children);
	}
	return v(...args);
}

const fromHtml = (content) => {
	const pipeline = unified()
		.use(rehype, { fragment: true })
		.use(rehypePrism, { ignoreMissing: true });

	const nodes = pipeline.parse(content);
	const result = pipeline.runSync(nodes);
	return toH(pragma, result);
}

function registerHandlers(types) {
	return types.reduce((handlers, [ type, inline = false ]) => {
		if (inline) {
			macro.addMacro(type, (props)=> ({ type, props }), true);
			handlers[type] = (h, node) => h(node, node.type, node.props);
		} else {
			macro.addMacro(type, (content, props, { transformer, eat }) => {
				return { type, props, children: transformer.tokenizeBlock(content, eat.now()) };
			});
			handlers[type] = (h, node) => h(node, node.type, node.props, all(h, node));
		}
		return handlers;
	}, {})
}

const fromMarkdown = (content) => {
	const pipeline = unified()
		.use(parse)
		.use(macro.transformer)
		.use(remark2rehype, { handlers: registerHandlers(handlers) })
		.use(rehypePrism, { ignoreMissing: true });

	const nodes = pipeline.parse(content);
	const result = pipeline.runSync(nodes);
	return toH(pragma, result);
}


manifest.tutorials.map(({ path }) => {
	const outputPath = path.replace(/\.md$/, '.ts');
	path = fsPath.resolve(__dirname, '../', 'content', path);
	const content = fs.readFileSync(path, 'utf-8');
	const nodes = fromMarkdown(content);
	fs.outputFileSync(fsPath.resolve('src', 'generated', outputPath), `export default () => { return ${JSON.stringify(nodes)} }`)
});

const paths = manifest.tutorials.map(({ name, path }) => ({ name, path: fsPath.parse(path).name }));
fs.outputFileSync(fsPath.resolve('src', 'generated', 'list.ts'), `export default ${JSON.stringify(paths)};`)
