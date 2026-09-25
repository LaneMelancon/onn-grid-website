import {
  Accordion,
  AccordionControl,
  AccordionItem,
  AccordionPanel,
  Button,
  Group,
  SimpleGrid,
  Stack,
  Tabs,
  TabsList,
  TabsPanel,
  TabsTab,
  Text,
  Textarea,
  TextInput,
  Title,
  type TitleOrder,
} from '@mantine/core';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Section, type SectionTone } from '@/components/ui/Section';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { isProductionDeployment } from '@/lib/site';
import { colors } from '@/theme/tokens/colors';
import classes from './page.module.css';

export const metadata: Metadata = {
  title: 'Style guide',
  robots: { index: false, follow: false },
};

const headingOrders: TitleOrder[] = [1, 2, 3, 4, 5, 6];
const textSizes = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'] as const;
const buttonVariants = ['primary', 'secondary', 'inverse', 'translucent', 'link'] as const;
const tones: SectionTone[] = ['light', 'subtle', 'dark', 'brand'];

/** Design-system preview for checking tokens and components. Not available in production. */
export default function StyleGuidePage() {
  if (isProductionDeployment) notFound();

  return (
    <>
      <Section>
        <SectionHeader
          eyebrow="Design system"
          heading="Style guide"
          body="Tokens and component defaults, rendered from the Mantine theme."
          headingOrder={1}
        />
      </Section>

      <Section tone="subtle" spacing="md">
        <Stack gap="xl">
          <Title order={2}>Colors</Title>
          {Object.entries(colors).map(([name, shades]) => (
            <Stack key={name} gap="xs">
              <Text fw="semibold">{name}</Text>
              <div className={classes.palette}>
                {shades.map((shade, index) => (
                  <div
                    key={shade}
                    className={classes.swatch}
                    style={{ backgroundColor: `var(--mantine-color-${name}-${index})` }}
                    title={`${name}.${index} ${shade}`}
                  />
                ))}
              </div>
            </Stack>
          ))}
        </Stack>
      </Section>

      <Section spacing="md">
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
          <Stack gap="md">
            <Title order={2}>Headings</Title>
            {headingOrders.map((order) => (
              <Title key={order} order={order}>
                Heading {order}
              </Title>
            ))}
          </Stack>
          <Stack gap="md">
            <Title order={2}>Text</Title>
            {textSizes.map((size) => (
              <Text key={size} size={size}>
                Text {size}: grow your business with a website that works for you.
              </Text>
            ))}
          </Stack>
        </SimpleGrid>
      </Section>

      {tones.map((tone) => (
        <Section key={tone} tone={tone} spacing="md">
          <Stack gap="xl">
            <SectionHeader
              eyebrow={`Tone: ${tone}`}
              heading="Simple pricing that's just right"
              body="Every section tone redefines text, surface, and border roles, so the same components work on any background."
            />
            <Group>
              {buttonVariants.map((variant) => (
                <Button key={variant} variant={variant}>
                  {variant}
                </Button>
              ))}
            </Group>
          </Stack>
        </Section>
      ))}

      <Section spacing="md">
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
          <Stack gap="md">
            <Title order={2}>Form fields</Title>
            <TextInput label="Name" placeholder="Joe Smith" withAsterisk />
            <TextInput label="Email" type="email" placeholder="example@gmail.com" withAsterisk />
            <Textarea label="Your message" placeholder="Tell us about your project" />
          </Stack>
          <Stack gap="md">
            <Title order={2}>Accordion</Title>
            <Accordion>
              {['Why do you charge monthly?', 'What do you use to build websites?'].map((question) => (
                <AccordionItem key={question} value={question}>
                  <AccordionControl>{question}</AccordionControl>
                  <AccordionPanel>Answers render here, pulled from the FAQ collection.</AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>
          </Stack>
        </SimpleGrid>
      </Section>

      <Section tone="dark" spacing="md">
        <Stack gap="xl" align="center">
          <Title order={2}>Tabs</Title>
          <Tabs defaultValue="ecommerce">
            <Group justify="center">
              <TabsList>
                <TabsTab value="ecommerce">eCommerce</TabsTab>
                <TabsTab value="leads">Lead Capture</TabsTab>
                <TabsTab value="memberships">Memberships</TabsTab>
              </TabsList>
            </Group>
            <TabsPanel value="ecommerce" pt="xl">
              <Text ta="center">Effortless online selling.</Text>
            </TabsPanel>
            <TabsPanel value="leads" pt="xl">
              <Text ta="center">Capture important user metrics.</Text>
            </TabsPanel>
            <TabsPanel value="memberships" pt="xl">
              <Text ta="center">Create a user base for premium content.</Text>
            </TabsPanel>
          </Tabs>
        </Stack>
      </Section>
    </>
  );
}
