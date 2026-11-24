import { createAgent } from "langchain"

const SearchProduct = async (req: any, res: any) => {
    const agent = createAgent({
        model: "",
        
    })
}

export {
    SearchProduct,
}