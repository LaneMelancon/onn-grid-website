import { Button, Group } from '@mantine/core';
import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { SectionHeader } from '@/components/ui/SectionHeader';

export default function NotFound() {
  return (
    <main id="main">
      <Section container="sm">
        <SectionHeader
          heading="Page not found"
          body="The page you're looking for doesn't exist or has been moved."
          headingOrder={1}
        />
        <Group mt="xl">
          <Button component={Link} href="/">
            Go home
          </Button>
        </Group>
      </Section>
    </main>
  );
}
