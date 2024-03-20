export const types = `#graphql
    type User {
        id: ID!
        firstName: String!
        lastName: String
        email: String
        profilePicture: String
    }

    input UserInput {
        firstName: String!
        lastName: String!
        email: String!
        profilePicture: String!
    }
`