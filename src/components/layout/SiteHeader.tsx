import { Container } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';
import classes from './SiteHeader.module.css';

/** Placeholder header. The full navbar (menu overlay, tone-aware logo) comes in the build phase. */
export function SiteHeader() {
  return (
    <header className={classes.root} data-tone="light">
      <Container size="xl">
        <Link href="/" aria-label="Onn Grid home">
          <Image
            src="/brand/logo-horizontal-on-light.svg"
            alt=""
            width={175}
            height={42}
            priority
            className={classes.logo}
          />
        </Link>
      </Container>
    </header>
  );
}
