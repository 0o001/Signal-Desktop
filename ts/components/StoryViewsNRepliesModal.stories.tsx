// Copyright 2022 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only

import type { Meta, Story } from '@storybook/react';
import React from 'react';

import type { PropsType } from './StoryViewsNRepliesModal';
import * as durations from '../util/durations';
import enMessages from '../../_locales/en/messages.json';
import { IMAGE_JPEG } from '../types/MIME';
import { SendStatus } from '../messages/MessageSendState';
import { StoryViewsNRepliesModal } from './StoryViewsNRepliesModal';
import { fakeAttachment } from '../test-both/helpers/fakeAttachment';
import { getDefaultConversation } from '../test-both/helpers/getDefaultConversation';
import { setupI18n } from '../util/setupI18n';

const i18n = setupI18n('en', enMessages);

export default {
  title: 'Components/StoryViewsNRepliesModal',
  component: StoryViewsNRepliesModal,
  argTypes: {
    authorTitle: {
      defaultValue: getDefaultConversation().title,
    },
    canReply: {
      defaultValue: true,
    },
    getPreferredBadge: { action: true },
    i18n: {
      defaultValue: i18n,
    },
    isMyStory: {
      defaultValue: false,
    },
    onClose: { action: true },
    onSetSkinTone: { action: true },
    onReact: { action: true },
    onReply: { action: true },
    onTextTooLong: { action: true },
    onUseEmoji: { action: true },
    preferredReactionEmoji: {
      defaultValue: ['❤️', '👍', '👎', '😂', '😮', '😢'],
    },
    renderEmojiPicker: { action: true },
    replies: {
      defaultValue: [],
    },
    storyPreviewAttachment: {
      defaultValue: fakeAttachment({
        thumbnail: {
          contentType: IMAGE_JPEG,
          height: 64,
          objectUrl: '/fixtures/nathan-anderson-316188-unsplash.jpg',
          path: '',
          width: 40,
        },
      }),
    },
    views: {
      defaultValue: [],
    },
  },
} as Meta;

function getViewsAndReplies() {
  const p1 = getDefaultConversation();
  const p2 = getDefaultConversation();
  const p3 = getDefaultConversation();
  const p4 = getDefaultConversation();
  const p5 = getDefaultConversation();

  const views = [
    {
      recipient: p1,
      status: SendStatus.Viewed,
      updatedAt: Date.now() - 20 * durations.MINUTE,
    },
    {
      recipient: p2,
      status: SendStatus.Viewed,
      updatedAt: Date.now() - 25 * durations.MINUTE,
    },
    {
      recipient: p3,
      status: SendStatus.Viewed,
      updatedAt: Date.now() - 15 * durations.MINUTE,
    },
    {
      recipient: p4,
      status: SendStatus.Viewed,
      updatedAt: Date.now() - 5 * durations.MINUTE,
    },
    {
      recipient: p5,
      status: SendStatus.Viewed,
      updatedAt: Date.now() - 30 * durations.MINUTE,
    },
  ];

  const replies = [
    {
      ...p2,
      body: 'So cute ❤️',
      timestamp: Date.now() - 24 * durations.MINUTE,
    },
    {
      ...p3,
      body: "That's awesome",
      timestamp: Date.now() - 13 * durations.MINUTE,
    },
    {
      ...p4,
      reactionEmoji: '❤️',
      timestamp: Date.now() - 5 * durations.MINUTE,
    },
  ];

  return {
    views,
    replies,
  };
}

const Template: Story<PropsType> = args => (
  <StoryViewsNRepliesModal {...args} />
);

export const CanReply = Template.bind({});
CanReply.args = {};
CanReply.storyName = 'Can reply';

export const ViewsOnly = Template.bind({});
ViewsOnly.args = {
  isMyStory: true,
  views: getViewsAndReplies().views,
};
ViewsOnly.storyName = 'Views only';

export const InAGroupNoReplies = Template.bind({});
InAGroupNoReplies.args = {
  isGroupStory: true,
};
InAGroupNoReplies.storyName = 'In a group (no replies)';

export const InAGroup = Template.bind({});
{
  const { views, replies } = getViewsAndReplies();
  InAGroup.args = {
    isGroupStory: true,
    replies,
    views,
  };
}
InAGroup.storyName = 'In a group';

export const CantReply = Template.bind({});
CantReply.args = {
  canReply: false,
};

export const InAGroupCantReply = Template.bind({});
{
  const { views, replies } = getViewsAndReplies();
  InAGroupCantReply.args = {
    canReply: false,
    isGroupStory: true,
    replies,
    views,
  };
}
InAGroupCantReply.storyName = "In a group (can't reply)";
