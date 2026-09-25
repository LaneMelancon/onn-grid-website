'use server';

import { z } from 'zod';
import {
  contactSchema,
  HONEYPOT_FIELD,
  type ContactFormState,
} from '@/lib/forms/contact';

const SUCCESS_MESSAGE =
  'Thank you! Your submission has been received and a team member will reach out to you shortly.';

export async function submitContactForm(
  _previousState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  // Bots get the same success response so they have no signal to retry with.
  if (formData.get(HONEYPOT_FIELD)) {
    return { status: 'success', message: SUCCESS_MESSAGE };
  }

  const result = contactSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    company: formData.get('company') || undefined,
    message: formData.get('message'),
  });

  if (!result.success) {
    return {
      status: 'error',
      message: 'Please double-check the highlighted fields.',
      fieldErrors: z.flattenError(result.error).fieldErrors,
    };
  }

  // TODO: deliver the submission (CRM, email notifications). See .claude/ARCHITECTURE.md.

  return { status: 'success', message: SUCCESS_MESSAGE };
}
