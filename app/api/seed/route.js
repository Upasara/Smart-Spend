const { seedTransaction } = require("@/actions/seed");

async function GET(){
    const result = await seedTransaction()
    return Response.json(result)
}

export {GET}