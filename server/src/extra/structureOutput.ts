import { z } from 'zod';

const OutputSchema = z.object({
    imageUsable: z.boolean(),

    skinType: z.string(),
    


    
});

export default OutputSchema;