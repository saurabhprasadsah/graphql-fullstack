/**
 * Here are your Resolvers for your Schema. They must match
 * the type definitions in your scheama
 */

module.exports = {
  Query: {
    pets(_, { input }, ctx) {
      return ctx.models.Pet.findMany(input)
    },
    pet(_, { input }, ctx) {
      console.log('QUERY => owner')
      return ctx.models.Pet.findOne(input)
    }
  },
  Mutation: {
    newPet(_, { input }, ctx) {
      const pet = ctx.models.Pet.create(input)
      return pet
    }
  },
  Pet: {
    img(pet) {
      return pet.type === 'DOG'
        ? 'https://placedog.net/300/300'
        : 'http://placekitten.com/300/300'
    },
    //OWNER is a field level resolver
    owner(pet, __, ctx) {
      console.log('PET => owner')
      //IN REAL SSCENARIO
      // ctx.models.User.findById(pet.user) 
      return ctx.models.User.findOne()
    }
  },
  User: {
    pets(user, __, ctx) {
      return ctx.models.Pet.findMany({ user: user.id })
    }
  }
}
