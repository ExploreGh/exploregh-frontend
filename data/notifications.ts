import { Role } from '@/context/ProfileContext';

export type AppNotification = {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  icon: string;
  color: string;
  forRoles: Role[];
};

export const notifications: AppNotification[] = [
  {
    id: '1',
    title: 'Booking accepted',
    message: 'Kwame Asante accepted your booking request for 20 August 2026.',
    time: '5 minutes ago',
    read: false,
    icon: 'checkmark-circle',
    color: '#006B3F',
    forRoles: ['tourist'],
  },
  {
    id: '2',
    title: 'Safety alert nearby',
    message: 'Pickpocket warning reported near Makola Market, Accra Central.',
    time: '2 hours ago',
    read: false,
    icon: 'warning',
    color: '#CE1126',
    forRoles: ['tourist', 'vendor', 'guide'],
  },
  {
    id: '3',
    title: 'New message from vendor',
    message: 'Akosua Kente Weaves replied to your message.',
    time: '1 day ago',
    read: true,
    icon: 'chatbubble-ellipses',
    color: '#006B3F',
    forRoles: ['tourist'],
  },
  {
    id: '4',
    title: 'Application approved',
    message: 'Your guide application has been reviewed and approved!',
    time: '2 days ago',
    read: true,
    icon: 'ribbon',
    color: '#FCD20F',
    forRoles: ['guide'],
  },
  {
    id: '5',
    title: 'New booking request',
    message: 'A tourist requested a booking for 22 August 2026.',
    time: '30 minutes ago',
    read: false,
    icon: 'calendar',
    color: '#006B3F',
    forRoles: ['guide'],
  },
  {
    id: '6',
    title: 'New listing inquiry',
    message: 'A tourist is interested in your Kente cloth listing.',
    time: '3 hours ago',
    read: false,
    icon: 'storefront',
    color: '#006B3F',
    forRoles: ['vendor'],
  },
];