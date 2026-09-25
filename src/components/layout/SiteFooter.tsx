import { Container, Text } from '@mantine/core';
import { siteName } from '@/lib/site';

/** Placeholder footer. The full footer (link columns, partner badge) comes in the build phase. */
export function SiteFooter() {
  return (
    <footer data-tone="subtle">
      <Container size="xl" py="xl">
        <Text size="sm" c="dimmed">
          © {new Date().getFullYear()} {siteName}
        </Text>
      </Container>
    </footer>
  );
}
