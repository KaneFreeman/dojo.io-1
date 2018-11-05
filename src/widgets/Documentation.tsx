import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { tsx } from '@dojo/framework/widget-core/tsx';
import Outlet from '@dojo/framework/routing/Outlet';
import Link from '@dojo/framework/routing/ActiveLink';
import * as css from './styles/Home.m.css';

import list from '../generated/list';
import content from '../generated/sample-tutorial';

export default class Documentation extends WidgetBase {
	protected render() {
		return (
			<div classes={[css.root]}>
				{ list.map((tutorial) => (
					<Link to='tutorial' params={ { tutorial } } activeClasses={['active']}>
						{ tutorial }
					</Link>
				)) }
				<Outlet id="tutorial" renderer={({ params }) => {
					const { tutorial } = params;
					console.log(tutorial);
					return content() as any;
				}} />
			</div>
		);
	}
}
