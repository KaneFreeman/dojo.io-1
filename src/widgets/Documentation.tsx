import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { tsx } from '@dojo/framework/widget-core/tsx';

import * as css from './styles/Home.m.css';

export default class Documentation extends WidgetBase {
	private _tutorial: any;
	constructor() {
		super();
		this._getTutorial();
	}
	private async _getTutorial() {
		const tutorial = 'sample-tutorial';
		const result = await require(`@dojo/webpack-contrib/promise-loader?global!../generated/${tutorial}`)();
		this._tutorial = result.default();
		this.invalidate();
	}
	protected render() {
		return <div classes={[css.root]}>{ this._tutorial || null }</div>;
	}
}
