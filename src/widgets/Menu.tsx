import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { tsx } from '@dojo/framework/widget-core/tsx';
import Link from '@dojo/framework/routing/ActiveLink';

const logo = require('./styles/dojo2-logo-white.svg');

import * as css from './styles/Menu.m.css';

export default class Menu extends WidgetBase {
	protected render() {
		return (
			<div classes={css.root}>
				<div classes={css.menu}>
					<div classes={css.left}>
						<Link to='home' activeClasses={[css.selected]}>
							<img classes={[css.logo]} alt='logo' src={logo} />
						</Link>
					</div>
					<div classes={[css.menuItem]}>
						<Link to='blog' classes={[css.link]} activeClasses={[css.selected]}>
							Blog
						</Link>
					</div>
					<div classes={[css.menuItem]}>
						<Link to='documentation' classes={[css.link]} activeClasses={[css.selected]}>
							Documentation
						</Link>
					</div>
					<div classes={[css.menuItem]}>
						<Link to='examples' classes={[css.link]} activeClasses={[css.selected]}>
							Examples
						</Link>
					</div>
					<div classes={[css.menuItem]}>
						<Link to='playground' classes={[css.link]} activeClasses={[css.selected]}>
							Playground
						</Link>
					</div>
					<div classes={[css.menuItem]}>
						<Link to='community' classes={[css.link]} activeClasses={[css.selected]}>
							Community
						</Link>
					</div>
				</div>
			</div>
		);
	}
}
