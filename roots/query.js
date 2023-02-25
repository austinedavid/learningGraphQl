const {GraphQLSchema,
    GraphQLObjectType, 
    GraphQLString,
    GraphQLInt,
    GraphQLList
    } = require("graphql")


const {BookType, AuthorType} = require("../types")
const authors = require("../dbmodels/authormodel")
const books = require("../dbmodels/bookmodel")

// here we create our object type for the books


// creating our rootQuery
const RoootQuery = new GraphQLObjectType({
        name: 'firstQueryCheck',
        description: "lets check if it works",
        fields: ()=> ({
            books: {
                type: new GraphQLList(BookType),
                description: "this is for book list",
                resolve: ()=>{
                    const gottenbooks = books.find()
                    
                    return gottenbooks
                }
            },
            authors:{
                type: new GraphQLList(AuthorType),
                description: "here we get our all authors",
                resolve: ()=>{
                    const gottenauthors = authors.find()
                    return gottenauthors
                }
            },
            book:{
                type: BookType,
                description: "to get each book",
                args:{
                    _id: {type: GraphQLString}
                },
                resolve: (parents, args)=>{
                    const getonebook = books.findById(args._id)
                    return getonebook
                }
            },
            author:{
                type: AuthorType,
                description: "to get all the author",
                args:{
                    _id: {type: GraphQLString}
                },
                resolve: (parents, args)=>{
                    return authors.findById(args._id)
                }
            }
        })
    })

    module.exports = {RoootQuery}