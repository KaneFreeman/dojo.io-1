import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { tsx } from '@dojo/framework/widget-core/tsx';
import Intersection from '@dojo/framework/widget-core/meta/Intersection';

const CodeSandboxStyles = {
	'border': 'none',
	'width': '100%',
	'minHeight': '600px'
};

interface CodeSandboxProperties {
	url: string;
}

export default class CodeSandbox extends WidgetBase<CodeSandboxProperties> {
	render() {
		const { url } = this.properties;
		const { isIntersecting } = this.meta(Intersection).get('root');
		return (
			<div key='root' styles={ CodeSandboxStyles }>
				{ (isIntersecting ? <iframe styles={ CodeSandboxStyles } src={ `${url}?autoresize=1&hidenavigation=1` }></iframe> : null) }
			</div>
		);
	}
}
