const {PrismClient} = require("@prisma/client")

const prisma = new PrismClient()

async function main() {
    const allLinks = await prisma.link.findMany()
    console.log(allLinks)
}

main()
    .catch(e => {
        throw e
    })
    .finally(
        async () => {
            await prisma.disconnect()
        }
    )