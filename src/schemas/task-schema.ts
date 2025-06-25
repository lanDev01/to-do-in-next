import { z } from "zod";

export const taskSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
  date: z.date(),
  priority: z.number().int().optional(),
  alert: z.boolean(),
});

export type TaskFormData = z.infer<typeof taskSchema>;
