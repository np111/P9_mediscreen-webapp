import {notification as antdNotification} from 'antd';
import {ArgsProps, NotificationApi} from 'antd/lib/notification';

export const notification: NotificationApi = {...antdNotification};

for (const method of ['success', 'error', 'info', 'warning', 'warn', 'open'] as const) {
    notification[method] = (args: ArgsProps) => {
        return antdNotification[method].call(antdNotification, {
            duration: 3,
            placement: 'bottomRight',
            ...args,
        });
    };
}
