import * as zod from 'zod'
export const careerSchema = zod.object({
 
    major:zod.string().nonempty('This field is required'),
    experienceLevel : zod.string().nonempty('This field is required')
     
})