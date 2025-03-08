import { z } from "zod";

const patientSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(2),
    last_name: z.string().min(2),
    email: z.string().email(),
    curp: z.string().min(3),
    company_id: z.string().min(1),
    active: z.boolean(),
    token: z.string().min(20),
})

export default patientSchema
