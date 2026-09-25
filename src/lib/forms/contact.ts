import { z } from 'zod';

/**
 * Name of the hidden honeypot input. Real visitors never see or fill it;
 * bots that fill every field get their submission dropped on the server.
 */
export const HONEYPOT_FIELD = 'website';

export const contactSchema = z.object({
  name: z.string().trim().min(1, 'Please enter your name.').max(256),
  email: z.email('Please enter a valid email address.').max(256),
  phone: z.string().trim().min(7, 'Please enter a valid phone number.').max(32),
  company: z.string().trim().max(256).optional(),
  message: z.string().trim().min(1, 'Please tell us about your project.').max(5000),
});

export type ContactInput = z.infer<typeof contactSchema>;

export type ContactFormState = {
  status: 'idle' | 'success' | 'error';
  message?: string;
  fieldErrors?: Partial<Record<keyof ContactInput, string[]>>;
};

export const initialContactFormState: ContactFormState = { status: 'idle' };
