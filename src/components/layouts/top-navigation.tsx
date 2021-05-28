import React from 'react';
import {routes} from '../../routes';
import {useTranslation} from '../ui/i18n/use-translation';
import {Container} from '../ui/layout/container';
import {Menu} from '../ui/menu';
import {Link} from '../ui/util/link';
import styles from './top-navigation.module.scss';

const logo = require('../../assets/images/logo_h60.png');
const logo2x = require('../../assets/images/logo_h60@2x.png');

const index = routes.index();
const menus = [
    {id: 'index', link: index},
];

export interface TopNavigationProps {
    currentPage?: string;
    transparent?: boolean;
}

export function TopNavigation({currentPage, transparent}: TopNavigationProps) {
    const {t} = useTranslation();

    return (
        <header className={styles.header + ' ' + (transparent && top ? styles.top : '')}>
            <Container>
                <div className={styles.navbar}>
                    <div className={styles.logo}>
                        <Link {...index}>
                            <a>
                                <img
                                    alt={t('common:logoTag')}
                                    width="230px"
                                    height="60px"
                                    src={logo}
                                    srcSet={logo + ' 1x, ' + logo2x + ' 2x'}
                                />
                            </a>
                        </Link>
                    </div>
                    <Menu
                        mode="horizontal"
                        selectedKeys={currentPage ? [currentPage] : []}
                    >
                        {menus.map((menu) => (
                            <Menu.Item key={menu.id}>
                                <Link {...menu.link}>
                                    <a>{t('common:page.' + menu.id)}</a>
                                </Link>
                            </Menu.Item>
                        ))}
                    </Menu>
                </div>
            </Container>
        </header>
    );
}
