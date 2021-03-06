/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React from 'react';
import SettingsIcon from '@material-ui/icons/Settings';
import ChatIcon from '@material-ui/icons/Chat';
import { Label } from '../../../../components'
import { colors } from '@material-ui/core';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import HomeIcon from '@material-ui/icons/Home';
import AssignmentIcon from '@material-ui/icons/Assignment';

export default [
  {
    title: 'General',
    pages: [
      {
        title: 'Overview',
        href: '/overview',
        icon: HomeIcon
      },
      {
        title: 'Tasks',
        href: '/tasks',
        icon: AssignmentIcon,
        children: [
          {
            title: 'Browse',
            href: '/tasks'
          },
          {
            title: 'Create',
            href: '/tasks/create'
          },
        ]
      },
      {
        title: 'Conversations',
        href: '/chat',
        icon: ChatIcon,
      },
      {
        title: 'Settings',
        href: '/settings/general',
        icon: SettingsIcon,
        // children: [
        //   {
        //     title: 'General',
        //     href: '/settings/general'
        //   },
        // ]
      },
    ]
  },
  {
    title: 'Management',
    pages: [
      {
        title: 'Disputes',
        href: '/disputes',
        icon: ImportContactsIcon,
      },
    ]
  },
  {
    title: 'Support',
    pages: [
      {
        title: 'Changelog',
        href: '/changelog',
        icon: ViewModuleIcon,
        label: () => <Label color={colors.blue['500']}>v0.5.7</Label>
      }
    ]
  }
];
