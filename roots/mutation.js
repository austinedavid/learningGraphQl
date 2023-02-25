const {GraphQLSchema,
    GraphQLObjectType, 
    GraphQLString,
    GraphQLInt,
    GraphQLList
    } = require("graphql")
    
    
    const {BookType, AuthorType} = require("../types")
    const authors = require("../dbmodels/authormodel")
    const books = require("../dbmodels/bookmodel")

// creating our root mutation below

const RootMutation = new GraphQLObjectType({
    name: 'ourMutation',
    description: 'running my mutation',
    fields: ()=> ({
        // book creation
        bookCreate:{
            type:BookType,
            description: "here we craete a book",
            args:{
                name: {type: GraphQLString},
                authorId: {type: GraphQLString}
            },
            resolve: (parents, args)=>{
                const newbook = new books({
                    name: args.name,
                    authorId: args.authorId
                })
                const savedbook = newbook.save();
                return savedbook
            }
        }, 
        // author creation
        authorCreate:{
            type: AuthorType,
            description: "here we create our authors",
            args:{
                name: {type: GraphQLString},
                origin: {type: GraphQLString}
            },
            resolve: (parents, args)=>{
             const newUser = new authors({
                name: args.name,
                origin: args.origin
             })
             const saveduser = newUser.save()
             return saveduser
            }
        },
        
        // book delete
        bookdelete:{
            type: BookType,
            description: "here i will delete my books using its _id",
            args:{
                _id: {type: GraphQLString}
            },
            resolve: async(parents, args)=>{
                const delbook = await books.findByIdAndDelete(args._id)
                return delbook
            }
        },
        // book update
        bookupdate:{
            type: BookType,
            description: "here i will update my books using its _id",
            args:{
                _id: {type: GraphQLString},
                name: {type: GraphQLString}
            },
            resolve: async(parents, args)=>{
                const updatebook = await books.findByIdAndUpdate(args._id, {name: args.name}, {new: true})
                return updatebook
            }
        }
    })
})

module.exports = {RootMutation}