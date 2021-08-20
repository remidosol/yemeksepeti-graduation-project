import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'
import Restaurant from 'App/Models/Restaurant'
import { PaymentMethods } from 'App/Models/Order'
import faker from 'faker'

export default class MainSeeder extends BaseSeeder {
  public async run() {
    try {
      let user = await User.create({
        id: 1,
        email: 'serverigaram@gmail.com',
        password: 'remidosol4434',
      })

      await user.related('profile').create({
        id: user.id,
        firstName: 'İbrahim',
        lastName: 'AKSÜT',
        mobileNumber: '+905301176240',
        avatarUrl:
          'https://media-exp1.licdn.com/dms/image/C4E03AQEwfmiuErPpgA/profile-displayphoto-shrink_200_200/0/1625012495038?e=1632355200&v=beta&t=AMjggl65J_pC15hvpECfd_G2du9IOKktrwEE1DjsE24',
        userId: user.id,
      })

      await user.save()
      await user.refresh()

      const burgerKing = await Restaurant.create({
        name: 'Burger King',
        category: 'Burger',
        logoUrl: 'https://logowik.com/content/uploads/images/burger-king-new-20218389.jpg',
        description: 'Have It Your Way',
        arrivalTime: 45,
        rating: 9.5,
      })

      await burgerKing.related('restaurantFoods').createMany([
        {
          name: 'Double King Chicken Menu',
          price: 32.99,
          description:
            '2 adet King Chicken eti, susamlı sandviç ekmeği, mayonez ve doğranmış maruldan oluşan klasikleşmiş lezzet alternatifini, enfes patates kızartması ve içeceğiyle birlikte istediğin gibi yaşa!',
          imageUrl:
            'https://www.burgerking.com.tr/cmsfiles/products/double-king-chicken-menu.png?v=173',
        },
        {
          name: 'Whopper Jr. Menu',
          price: 28.5,
          description:
            'Hamburger eti, küçük boy susamlı sandviç ekmeği, salatalık turşusu, ketçap, mayonez, doğranmış marul, domates ve soğandan oluşan, Whopper lezzetinden vazgeçemeyenlere nefis bir seçim.',
          imageUrl: 'https://www.burgerking.com.tr/cmsfiles/products/whopper-jr-menu.png?v=173',
        },
        {
          name: 'Double Whopper Menu',
          price: 48.5,
          description:
            'İki adet Whopper eti, büyük boy susamlı sandviç ekmeği, salatalık turşusu, ketçap, mayonez, doğranmış marul, domates ve soğanla, klasik Whopper lezzetini ikiye katlamak için ideal.',
          imageUrl:
            'https://www.burgerking.com.tr/cmsfiles/products/double-whopper-menu-1.png?v=173',
        },
        {
          name: 'Triple Whopper Menu',
          price: 59.99,
          description:
            '3 adet Whopper eti, büyük boy susamlı sandviç ekmeği, salatalık turşusu, ketçap, mayonez, göbek salata, domates ve soğandan oluşan nefis bir seçim.',
          imageUrl:
            'https://www.burgerking.com.tr/cmsfiles/products/triple-whopper-menu-1.png?v=173',
        },
        {
          name: 'Texas Smokehouse Menu',
          price: 44.99,
          description:
            'Whopper eti, füme eti, cheddar peyniri, barbekü sosu ve çıtır kaplamalı soğanları ile nefis bir seçim.',
          imageUrl:
            'https://www.burgerking.com.tr/cmsfiles/products/texas-smokehouse-burger-menu-1.png?v=173',
        },
        {
          name: 'Double Texas Smokehouse Menu',
          price: 54.99,
          description:
            '2 kat Whopper eti, füme eti, barbekü sosu, cheddar peyniri ve çıtır kaplamalı soğanları ile nefis bir seçim.',
          imageUrl:
            'https://www.burgerking.com.tr/cmsfiles/products/double-texas-smokehouse-burger-menu-1.png?v=173',
        },
        {
          name: 'Big King Jr. Menu',
          price: 28.5,
          description:
            'Hamburger eti, küçük boy susamlı sandviç ekmeği, cheddar peyniri, salatalık turşusu, doğranmış marul ve soğana eşlik eden özel Big King sosun birleşimi. ',
          imageUrl: 'https://www.burgerking.com.tr/cmsfiles/products/big-king-jr-menu-1.png?v=173',
        },
        {
          name: 'Big King Menu',
          price: 34.5,
          description:
            '2 adet Hamburger eti, 3 katlı özel ekmeği, cheddar peyniri, salatalık turşusu, doğranmış marul ve soğana eşlik eden özel Big King sosun birleşimi.',
          imageUrl: 'https://www.burgerking.com.tr/cmsfiles/products/big-king-menu.png?v=173',
        },
        {
          name: 'Double Big King Menu',
          price: 49.99,
          description:
            '4 adet Hamburger eti, 3 katlı özel ekmeği, cheddar peyniri, salatalık turşusu, doğranmış marul ve soğana eşlik eden özel Big King sosun birleşimi.',
          imageUrl:
            'https://www.burgerking.com.tr/cmsfiles/products/double-big-king-menu-1.png?v=173',
        },
        {
          name: 'Big King XXL Menu',
          price: 51.99,
          description:
            '2 adet Whopper eti, büyük boy susamlı sandviç ekmeği, 4 adet cheddar peyniri, salatalık turşusu, doğranmış marul, soğan ve Big King sosunun birleştiği göz doyurucu bir seçim.',
          imageUrl: 'https://www.burgerking.com.tr/cmsfiles/products/big-king-xxl-menu.png?v=173',
        },
        {
          name: 'Coca-Cola (33 cl.)',
          price: 7.5,
          description: 'Coca-Cola',
          imageUrl: 'https://www.burgerking.com.tr/cmsfiles/products/coca-cola.png?v=173',
        },
        {
          name: 'Sprite (33 cl.)',
          price: 7.5,
          description: 'Sprite',
          imageUrl: 'https://www.burgerking.com.tr/cmsfiles/products/coca-cola.png?v=173',
        },
      ])

      const mcDonalds = await Restaurant.create({
        name: "McDonald's",
        category: 'Burger',
        logoUrl:
          'https://turbologo.com/articles/wp-content/uploads/2019/07/mcdonalds-the-m-logo-1968.jpg',
        arrivalTime: 30,
        rating: 8.9,
      })

      await mcDonalds.related('restaurantFoods').createMany([
        {
          name: 'Big Mac Menu',
          description:
            'Çift katlı, dana etinden peynir ve sosla olan muhteşem uyumuna soğan, taze marul ve turşunun da katılması, ona olan tutkunuzu açıklayabilir mi?',
          price: 36.5,
          imageUrl: 'https://siparis.mcdonalds.com.tr/Files/All/Menuler/bigmacmenu.png',
        },
        {
          name: 'Double Big Mac Menu',
          price: 51.5,
          description:
            'Çift katlı, dana etinden peynir ve sosla olan muhteşem uyumuna soğan, taze marul ve turşunun da katılması, ona olan tutkunuzu açıklayabilir mi?',
          imageUrl:
            'https://siparis.mcdonalds.com.tr/Files/All/Menuler/1b54b963-21ce-4d4d-8a2a-2731923196ac-urunler-400x4006-5-1-.jpg',
        },
        {
          name: 'McChicken Menu',
          price: 31.5,
          description:
            'Karamelize, yumuşak susamlı ekmeğinin içerisinde tavuk lezzetinde bir adet tavuk göğsü, özel mayonezi, taze yeşil salatası doğru süslenmiş görüntüsü ile farklı seçimlerimizden birisi.',
          imageUrl: 'https://siparis.mcdonalds.com.tr/Files/All/Menuler/mcchickenmenu.png',
        },
        {
          name: 'Double McChicken Menu',
          price: 36.5,
          description:
            'Karamelize, yumuşak susamlı ekmeğinin içerisinde tavuk lezzetinde bir adet tavuk göğsü, özel mayonezi, taze yeşil salatası doğru süslenmiş görüntüsü ile farklı seçimlerimizden birisi.',
          imageUrl: 'https://siparis.mcdonalds.com.tr/Files/All/Menuler/doublechickenmenu.png',
        },
        {
          name: 'Double Cheeseburger Menu',
          price: 37.99,
          description:
            'Karamelize, yumuşak regular ekmeğinin içerisinde dana eti kızarmış iki adet eti, yıldız şeklinde konulmuş peyniri, ketçapı, sulandırılmış kuru soğanı, hardalı ve iki adet yan yana konulan salatalık turşusu, doğru süslenmiş görüntüsü ile iştah açıcı bir seçim.',
          imageUrl: 'https://siparis.mcdonalds.com.tr/Files/All/Menuler/doublecheeseburgermenu.png',
        },
        {
          name: 'Quarter Pounder Menu',
          price: 41.99,
          description:
            "Dana eti ve iki kat peynir keyfi. Soğan, turşu, ketçap, hardal ve susamlı ekmek... Mükemmel birliktelik. Lezzetli kelimesi Quanter Pounder'ı anlatmak için sizce de yetersiz kalmıyor mu?",
          imageUrl: 'https://siparis.mcdonalds.com.tr/Files/All/Menuler/quarterpoundermenu.png',
        },
        {
          name: 'Double Quarter Pounder Menu',
          price: 49.99,
          description:
            "Soğan, turşu, ketçap, hardal ve susamlı ekmek... Mükemmel birliktelik. Lezzetli kelimesi Quanter Pounder'ı anlatmak için sizce de yetersiz kalmıyor mu?",
          imageUrl:
            'https://siparis.mcdonalds.com.tr/Files/All/Menuler/doublequarterpoundermenu.png',
        },
        {
          name: 'McRoyal Menu',
          price: 44.99,
          description:
            "Dana etinden dolgun köfteyi, lezzetli peynir, taze marul, domates, turşu ve soslarla birleştir. Her ısırıkta lezzetine doyum olmayan McRoyal'ın tadını çıkar.",
          imageUrl: 'https://siparis.mcdonalds.com.tr/Files/All/Menuler/mcroyalmenu.png',
        },
        {
          name: 'Daba Daba Burger Menu',
          price: 34.99,
          description:
            'Dibi dibi ödeyip daba daba doymak isteyene iki kat tavuk etinin arasında peynir, marul, domates ve mayonez sosu ile tek kişilik Daba Daba Burger menü.',
          imageUrl: 'https://siparis.mcdonalds.com.tr/Files/All/Menuler/dabadababurgermenu.png',
        },
        {
          name: 'Hamburger Menu',
          price: 28.5,
          description: 'Hamburger Menü (Büyük)',
          imageUrl:
            'https://siparis.mcdonalds.com.tr/Files//59e1f32e-0688-443f-bfc0-9f56998c40c4-hamburger-menu.png',
        },
        {
          name: 'Coca-Cola (33 cl.)',
          price: 7.5,
          description: 'Coca-Cola',
          imageUrl: 'https://www.burgerking.com.tr/cmsfiles/products/coca-cola.png?v=173',
        },
        {
          name: 'Sprite (33 cl.)',
          price: 7.5,
          description: 'Sprite',
          imageUrl: 'https://www.burgerking.com.tr/cmsfiles/products/coca-cola.png?v=173',
        },
      ])

      await user.save()
      await user.refresh()

      const paymentMethods = [
        PaymentMethods.CASH,
        PaymentMethods.COUPON,
        PaymentMethods.CREDIT_CARD,
        PaymentMethods.WALLET,
      ]

      await burgerKing.load('restaurantFoods')
      await mcDonalds.load('restaurantFoods')
      for (let i = 0; i < 5; i++) {
        const randomPaymentId = faker.datatype.number({ min: 0, max: 3, precision: 1 })
        const randomfoodCount = faker.datatype.number({ min: 1, max: 5, precision: 1 })

        let order = await user.related('orders').create({
          restaurantId: burgerKing.id,
          orderPaymentMethod: paymentMethods[randomPaymentId],
          orderNote: faker.lorem.sentence(5),
        })

        let totalPrice = 0
        for (let j = 0; j < randomfoodCount; j++) {
          const randomBurgerId = faker.datatype.number({ min: 0, max: 11, precision: 1 })
          const food = burgerKing.restaurantFoods[randomBurgerId]
          totalPrice += parseFloat(food.price.toFixed(2))
          await order.related('orderFoods').attach([randomBurgerId])
        }

        order.total = totalPrice

        await order.save()
        await order.refresh()
      }

      for (let i = 0; i < 5; i++) {
        const randomPaymentId = faker.datatype.number({ min: 0, max: 3, precision: 1 })
        const randomfoodCount = faker.datatype.number({ min: 1, max: 5, precision: 1 })

        let order = await user.related('orders').create({
          restaurantId: mcDonalds.id,
          orderPaymentMethod: paymentMethods[randomPaymentId],
          orderNote: faker.lorem.sentence(5),
        })

        let totalPrice = 0
        for (let j = 0; j < randomfoodCount; j++) {
          const randomMcId = faker.datatype.number({ min: 0, max: 11, precision: 1 })
          const food = mcDonalds.restaurantFoods[randomMcId]
          totalPrice += parseFloat(food.price.toFixed(2))
          await order.related('orderFoods').attach([randomMcId])
        }

        order.total = totalPrice

        await order.save()
        await order.refresh()
      }

      await user.save()
      await user.refresh()
    } catch (error) {
      console.warn(error.message)
      console.warn(error.stack)
    }
  }
}
