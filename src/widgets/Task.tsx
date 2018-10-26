import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { tsx } from '@dojo/framework/widget-core/tsx';

const TaskStyles = {
	'borderLeft': '4px solid #009dff',
	'paddingLeft': '0.5rem',
	'fontWeight': 'bold'
}

export default class Task extends WidgetBase {
	render() {
		return (
			<div styles={ TaskStyles }>{ this.children }</div>
		);
	}
}
