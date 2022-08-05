/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const navigationData: FuseNavigationItem[] = [
    {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'basic',
        icon: 'heroicons_outline:chart-square-bar',
        link: '/dashboard/home'
    },
    {
        id: 'users',
        title: 'Users',
        type: 'basic',
        icon: 'heroicons_outline:users',
        link: '/dashboard/users'
    },
    {
        id: 'places',
        title: 'Add Favorite Places',
        type: 'basic',
        icon: 'heroicons_outline:location-marker',
        link: '/dashboard/places'
    }
];
export const defaultNavigation: FuseNavigationItem[] = navigationData;
export const compactNavigation: FuseNavigationItem[] = navigationData;
export const futuristicNavigation: FuseNavigationItem[] = navigationData;
export const horizontalNavigation: FuseNavigationItem[] = navigationData;



