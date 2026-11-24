
import * as zod from 'zod'

export const personalSchema = zod.object({
    fullName: zod.string()
        .nonempty('This field is required')
        .min(3, 'Invalid name'),

    email: zod.string()
        .nonempty('This field is required')
        .email('Invalid email'),

    password: zod.string()
        .nonempty('This field is required')
        .regex(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
            'Password must be at least 8 characters'
        ),

    confirmPassword: zod.string()
        .nonempty('This field is required'),

}).refine(
    (data) => data.password === data.confirmPassword,
    {
        message: "The passwords don't match",
        path: ['confirmPassword']
    }
)
