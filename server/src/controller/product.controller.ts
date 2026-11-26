import { ChatOpenAI } from "@langchain/openai";
import fs from "node:fs/promises";
import OutputSchema from "../extra/structureOutput.ts";
import imageBuffer from "../extra/createImageBuffer.ts";

export async function embedText(text: string) {
    const response = await fetch("https://ai-gateway.vercel.sh/v1/embeddings", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${process.env.AI_GATEWAY_API_KEY}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            model: "cohere/embed-v5.0-fast",
            input: text,
            dimensions: 1536,
        }),
    });

    if (!response.ok) {
        throw new Error(await response.text());
    }

    const data = await response.json();

    return data.data[0].embedding as number[];
}

const SearchProduct = async (req: any, res: any) => {
    try {
        const apiKey = process.env.AI_GATEWAY_API_KEY;

        if (!apiKey) {
            res.send("Api key is not found");
        }

        const base64Image = imageBuffer.toString("base64");

        if (!imageBuffer || !base64Image) {
            return res.send("some issue with image");
        }

        const model = new ChatOpenAI({
            model: "gpt-6.1-terra",
            apiKey: apiKey,
            configuration: {
                baseURL: "https://ai-gateway.vercel.sh/v1",
            },
        });

        const modelWithStructureOutput =
            model.withStructuredOutput(OutputSchema);
        const response = await modelWithStructureOutput.invoke([
            {
                role: "user",
                content: [
                    {
                        type: "text",
                        text: `
                        You are an advanced dermatological image analysis assistant. Your task is to analyze an uploaded image of a user's skin/body part and generate a detailed, structured descriptive text snippet. This description will be converted into a vector embedding to perform semantic search against a skincare product database.

                        Strictly adhere to the following output format and guidelines:

                        1. TARGET BODY AREA:
                        - Precisely identify the anatomical location shown (e.g., face, forehead, cheeks, nose, chest, back, under-eyes, general body/legs).

                        2. SKIN TYPE & TEXTURE:
                        - Assess skin type (e.g., oily, dry, combination, normal, sensitive).
                        - Describe texture characteristics (e.g., smooth, rough, bumpy, flaky, congested, enlarged pores).

                        3. PRIMARY SKIN CONCERNS & CONDITIONS:
                        - Identify active concerns clearly (e.g., stubborn acne, mild breakouts, blackheads, whiteheads, hyperpigmentation, dark spots, redness, uneven skin tone, or extreme dryness).
                        - Note severity if discernible (e.g., mild, moderate, stubborn).

                        4. DESCRIPTIVE NARRATIVE STYLE:
                        - Combine the above points into a coherent, rich paragraph that mirrors professional skincare product descriptions (mentioning target concerns, desired active ingredient focus like BHA, Benzoyl Peroxide, Vitamin C, Retinoids, or Ceramides, and suitability for the specific body zone).

                        Example Output Format:
                        "Target Area: Back and chest. Skin Type: Oily and acne-prone. Texture: Congested with rough texture. Primary Concerns: Moderate to stubborn body acne, active pimples, and clogged pores requiring maximum strength antibacterial and exfoliating care suitable for face and body application."
                        `,
                    },
                    {
                        type: "image_url",
                        image_url: {
                            url: `data:image/jpeg;base64,${base64Image}`,
                        },
                    },
                ],
            },
        ]);

        const result = await embedText(response.skinType);

        console.log(result);

        res.send(result);
    } catch (error) {
        console.log(error instanceof Error ? error : "Some error occured");
        res.send("error side");
    }
};

export { SearchProduct };
