/// <reference path="./typings/tsd.d.ts" />

interface NotificationOptionsForCreate {
  type: string;
  iconUrl: string;
  title: string;
  message: string;
  contextMessage?: string;
  priority?: number;
  eventTime?: number;
  buttons?: Array<chrome.notifications.ButtonOptions>;
  items?: Array<chrome.notifications.ItemOptions>;
  progress?: number;
  isClickable?: boolean;
}

class Notifications {
  private static basicOptions : NotificationOptionsForCreate = {
    type: 'basic',
    iconUrl: './images/default_icon.gif',
    title: 'Title',
    message: 'Message',
    buttons: [
      { title: 'OK' },
      { title: 'Dismiss' },
    ],
  };

  private static listOptions : NotificationOptionsForCreate = {
    type: 'list',
    iconUrl: './images/default_icon.gif',
    title: 'Title',
    message: 'Message',
    items: [
      { title: 'Item 1', message: 'hoge' },
      { title: 'Item 2', message: 'hoge' },
    ],
  };

  private static progressOptions : NotificationOptionsForCreate = {
    type: 'progress',
    iconUrl: './images/default_icon.gif',
    title: 'Title',
    message: 'Message',
    progress: 45,
  };

  private static optionsByType : { [index: string]: NotificationOptionsForCreate } = {
    basic: Notifications.basicOptions,
    list: Notifications.listOptions,
    progress: Notifications.progressOptions,
  };

  requestPermitted () : Promise<string> {
    return new Promise((done, fail) => {
      chrome.notifications.getPermissionLevel((level) => {
        if (level == 'granted') {
          done(level);
        } else {
          fail(level);
        }
      })
    });
  }

  create (notice : NotificationOptionsForCreate) : Promise<string> {
    return this.requestPermitted()
        .then((level) => {
          return new Promise((done, fail) => {
            chrome.notifications.create('', notice, (notificationId : string) => { done(notificationId) });
          });
        });
  }

  optionsFor (templateType : string) : NotificationOptionsForCreate {
    return Notifications.optionsByType[templateType];
  }
}

export = new Notifications()
