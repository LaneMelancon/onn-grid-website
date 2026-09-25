import { PlayIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

type MediaKind = 'image' | 'video';

function kindOf(parent: unknown): MediaKind | undefined {
  return (parent as { kind?: MediaKind } | undefined)?.kind;
}

export const media = defineType({
  name: 'media',
  title: 'Media',
  type: 'object',
  icon: PlayIcon,
  fields: [
    defineField({
      name: 'kind',
      type: 'string',
      initialValue: 'image',
      options: {
        list: [
          { title: 'Image', value: 'image' },
          { title: 'Video', value: 'video' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
    }),
    defineField({
      name: 'image',
      type: 'imageWithAlt',
      hidden: ({ parent }) => kindOf(parent) !== 'image',
    }),
    defineField({
      name: 'video',
      type: 'file',
      description: 'MP4 (H.264). Videos play muted and inline.',
      options: { accept: 'video/mp4' },
      hidden: ({ parent }) => kindOf(parent) !== 'video',
    }),
    defineField({
      name: 'poster',
      title: 'Video poster',
      type: 'image',
      description: 'Shown while the video loads.',
      hidden: ({ parent }) => kindOf(parent) !== 'video',
    }),
    defineField({
      name: 'loop',
      title: 'Loop video',
      type: 'boolean',
      initialValue: true,
      hidden: ({ parent }) => kindOf(parent) !== 'video',
    }),
  ],
  preview: {
    select: { kind: 'kind', image: 'image', poster: 'poster', alt: 'image.alt' },
    prepare: ({ kind, image, poster, alt }) => ({
      title: kind === 'video' ? 'Video' : alt || 'Image',
      media: kind === 'video' ? poster : image,
    }),
  },
});
