import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Restaurant from 'App/Models/Restaurant'
import faker from 'faker'
import Address from 'App/Models/Address'

const logoLinks = [
  'https://png.pngtree.com/png-clipart/20200709/original/pngtree-restaurant-logos-png-png-image_3600190.jpg',
  'https://png.pngtree.com/png-clipart/20200709/original/pngtree-cafe-tea-logo-free-logo-design-template-png-image_3555238.jpg',
  'https://png.pngtree.com/png-clipart/20190604/original/pngtree-restaurant-logo-creative-png-image_1021100.jpg',
  'https://png.pngtree.com/png-clipart/20200709/original/pngtree-restaurant-logo-png-image_4009936.jpg',
  'https://png.pngtree.com/png-clipart/20190630/original/pngtree-food-restaurant-logo-design-template-png-image_4154930.jpg',
  'https://png.pngtree.com/png-clipart/20201208/original/pngtree-cool-funny-chicken-mascot-design-suitable-for-restaurant-logo-or-packaging-png-image_5562210.jpg',
  'https://png.pngtree.com/png-clipart/20200709/original/pngtree-restaurant-logo-png-image_4009927.jpg',
  'https://png.pngtree.com/png-clipart/20201216/original/pngtree-restaurant-logo-design-png-image_5721285.jpg',
  'https://png.pngtree.com/png-clipart/20191121/original/pngtree-lettering-noodle-with-vegetable-for-restaurant-logo-vector-illustration-png-image_5103487.jpg',
  'https://png.pngtree.com/png-clipart/20200721/original/pngtree-smart-restaurant-logo-design-png-image_4844560.jpg',
]

const categories = [
  'Fine Dining',
  'Casual Dining',
  'Contemporary Casual',
  'Family Style',
  'Fast Casual',
  'Fast Food',
  'Cafe',
  'Buffet',
  'Food Trucks and Concession Stands',
]

const resolution = ['300x300', '400x400', '500x500']

export default class RestaurantSeeder extends BaseSeeder {
  public async run() {
    try {
      for (let i = 0; i < 10; i++) {
        faker.locale = 'it'
        const randCat = faker.datatype.number({ min: 0, max: 8, precision: 1 })
        const randRes = faker.datatype.number({ min: 0, max: 2, precision: 1 })

        const restaurant = await Restaurant.create({
          category: categories[randCat],
          name: faker.company.companyName(),
          logoUrl: logoLinks[i],
          description: faker.company.catchPhraseDescriptor(),
        })

        for (let j = 0; j < 10; j++) {
          await restaurant.related('restaurantFoods').create({
            name: faker.company.catchPhraseNoun(),
            imageUrl: `https://source.unsplash.com/${resolution[randRes]}/?food`,
            description: faker.commerce.productDescription(),
            price: faker.datatype.float({ min: 7.5, max: 69.99, precision: 1 }),
          })
        }

        faker.locale = 'tr'
        const restaurantAddress = await Address.create({
          country: 'Türkiye',
          city: faker.address.city(),
          district: faker.address.streetName(),
          neighborhood: faker.address.streetName(),
          street: faker.address.streetAddress(),
        })

        await restaurant.related('restaurantAddress').attach([restaurantAddress.id])
      }
    } catch (error) {
      console.error(error.message)
      console.error(error.stack)
    }
  }
}
