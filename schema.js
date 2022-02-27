const { gql } = require('apollo-server-express');

exports.typeDefs = /*Graphql Schema */ gql` 

type User {
    id: ID!
    username: String!
    firstname: String!
    lastname: String!
    password: String!
    email: String!
    type: String!
}

type Listing {
    id: ID!
    listing_id: String!
    listing_title: String!
    description: String!
    street: String!
    city: String!
    postal_code: String!
    price: Float!
    email: String!
    username: String!
}
scalar Date

type Booking {
    id: ID!
    listing_id: String!
    booking_id: String!
    booking_date: Date!
    booking_start: Date!
    booking_end: Date!
    username: String!
}

type Query {
    """ 
    Gets current user who is logged in. NOT USED
    """
    getCurrentUser: User


    """ 
    Gets user's bookings
    """
    getUserBookings(username: String!): [Booking]


    """ 
    View all listings created by those with the role of Admin
    """
    getAdminListings: [Listing]


    """ 
    View all listing added by Admin user
    """
    getAdminCreatedListings(username: String!): [Listing]
    

    """ 
    Search listing by Name
    """
    searchListingByName(listing_title: String!): [Listing]


    """ 
    Search listing by City
    """
    searchListingByCity(city: String!): [Listing]


    """ 
    Search listing by Postal Code
    """
    searchListingByPCode(postal_code: String!): [Listing]
}

type Mutation {
    
    createUser(
        username: String!
        firstname: String!
        lastname: String!
        email: String!
        password: String!
        type: String!
    ): User

    login(
        username: String!
        password: String!
    ): String

    createListing(
        listing_id: String!
        listing_title: String!
        description: String!
        street: String!
        city: String!
        postal_code: String!
        price: Float!
        email: String!
        username: String!
    ): Listing
    
    createBooking(
        listing_id: String!
        booking_id: String!
        booking_start: String!
        booking_end: String!
        username: String!
    ): Booking
}



`;
