const {GraphQLSchema,
    GraphQLObjectType, 
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLID
    } = require("graphql")
    
    const authors = require("./dbmodels/authormodel")
    const books = require("./dbmodels/bookmodel")

// for book objects
const BookType = new GraphQLObjectType({
    name: 'books',
    fields: ()=> ({
        _id: {type: GraphQLString},
        name: {type: GraphQLString},
        authorId: {type: GraphQLString},
        author:{
            type: AuthorType,
            resolve: async(books)=>{
                const ourauthors = await authors.findOne({_id: books.authorId})
               
                return ourauthors
            }
        }
    })
})

// for author objects
const AuthorType = new GraphQLObjectType({
    name: "authors",
    fields: ()=> ({
        _id: {type: GraphQLString},
        name: {type: GraphQLString},
        origin: {type: GraphQLString},
        books:{
            type: BookType,
            resolve: async(author)=>{
                const bookgotten = await books.findOne({authorId: author._id})
                return bookgotten
            }
        }
    })
})

module.exports = {BookType, AuthorType}