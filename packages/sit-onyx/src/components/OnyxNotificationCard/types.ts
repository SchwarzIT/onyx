export interface NotificationCardMoleculeProps extends Notification, FormattedNotificationDates {}

export interface Notification<T = object> {
  id: string;
  subject: string;
  content: T;
  receivers: string;
  type: string;
  ttlDays: number;
  createdAt: string;
  isRead: boolean;
  isUrgent: boolean;
}

export interface FormattedNotificationDates {
  createdAtFormatted: string;
  createdTimeAgoFormatted: string;
}
