

async function signup(parent, args, context, info) {
    const password = await bcrypt.hash(args.password, 10)
    const user = await context.prisma.user.create({data: {...args, password}})
    const token = jwt.sign({userId: user.id}, APP_SECRET)
    return {
        token,
        user,
    }
}

async function login(parent, args, context, info) {
    const user = await context.prisma.user.findOne({where: {email: args.email}})
    if(!user) {
        throw new Error("No such user found")
    }

    const valid = await bcrypt.compare(args.password, user.password)
    if(!valid) {
        throw new Error("Invalid Password")
    }

    const token = jwt.sign({userId: user.id}, APP_SECRET)

    return {
        token,
        user,
    }

}

function post (parent, args, context, info) => {
    const newLink = context.prisma.link.create({
      data: {
        url: args.url,
        description: args.description,
      }
    })
 
    return newLink
},

module.exports = {
    signup,
    login,
    post
}