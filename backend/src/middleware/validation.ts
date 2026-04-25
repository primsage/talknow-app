import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  businessName: z.string().min(2),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const widgetSettingsSchema = z.object({
  primaryColor: z.string().regex(/^#[0-9A-F]{6}$/i),
  welcomeText: z.string().min(1),
  enabledFeatures: z.array(z.string()),
});
