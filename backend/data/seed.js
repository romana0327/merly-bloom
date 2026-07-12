// ── Database Seed Script ──────────────────────────────────────
// Run: node data/seed.js
require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const Flower = require('../models/Flower');
const Meaning = require('../models/Meaning');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/merlybloom';

// ── Sample Flowers Data ──────────────────────────────────────
const flowers = [
  {
  name: 'Blush Rose Bouquet',
  price: 150,
  originalPrice: 200,
  image: 'https://i.pinimg.com/736x/aa/85/83/aa8583b0306da01a1843ff0403313031.jpg',
  description: 'A charming bouquet of fresh pink roses accented with delicate baby’s breath, beautifully wrapped in soft blush paper and finished with an elegant satin ribbon. Perfect for birthdays, anniversaries, or expressing heartfelt love and appreciation.',
  category: 'Wedding',
  isBestSeller: true,
  isFeatured: true,
  stock: 15
  },
  {
     name: 'Rosy Elegance',
  price: 150,
  originalPrice: 200,
  image: 'https://i.pinimg.com/736x/7c/62/fb/7c62fbee33bb929d26f805cd908babae.jpg',
  description: 'A graceful bouquet of soft pink and white roses, beautifully arranged with delicate greenery and wrapped in elegant blush paper. A perfect floral gift to celebrate weddings and unforgettable moments.',
  category: 'Wedding',
  isBestSeller: true,
  isFeatured: true,
  stock: 15
  },
  {
    name: 'Ivory Blossom',
  price: 150,
  originalPrice: 200,
  image: 'https://i.pinimg.com/736x/5f/85/25/5f852548ec427e61a4538768d68348b2.jpg',
  description: 'A stunning bouquet of elegant white roses and delicate baby’s breath, beautifully wrapped in premium white paper with a luxurious satin ribbon. A timeless choice for weddings and unforgettable celebrations.',
  category: 'Wedding',
  isBestSeller: true,
  isFeatured: true,
  stock: 15
  },
  {
     name: 'Golden Romance',
  price: 150,
  originalPrice: 200,
  image: 'https://i.pinimg.com/736x/62/53/7b/62537b9e02fbc0a9033e8e0b7aea8454.jpg',
  description: 'A luxurious bouquet of golden yellow roses paired with delicate white baby’s breath, elegantly wrapped in premium ivory paper and finished with a satin ribbon. A radiant choice for weddings and unforgettable celebrations.',
  category: 'Wedding',
  isBestSeller: true,
  isFeatured: true,
  stock: 15
  },
  {
    name: 'Sunny Bloom',
  price: 80,
  originalPrice: 150,
  image: 'https://i.pinimg.com/736x/14/07/9e/14079e5eef1a53d435ed217fcb24dd80.jpg',
  description: 'A vibrant bouquet of radiant sunflowers, fresh white daisies, and delicate greenery, beautifully wrapped in elegant kraft paper. A joyful floral gift perfect for birthdays and cheerful celebrations.',
  category: 'Birthday',
  isBestSeller: true,
  isFeatured: true,
  stock: 20
  },
  {
      name: 'Pink Delight',
  price: 80,
  originalPrice: 150,
  image: 'https://i.pinimg.com/736x/e1/fb/26/e1fb262ce22b4d1542d72e066ad2fd09.jpg',
  description: 'A delightful bouquet of fresh pink roses and delicate white baby’s breath, elegantly wrapped in soft pink paper with a satin ribbon. A charming gift to brighten birthdays and create unforgettable memories.',
  category: 'Birthday',
  isBestSeller: true,
  isFeatured: true,
  stock: 20
  },
  {
    name: 'Crimson Romance',
  price: 100,
  image: 'https://i.pinimg.com/736x/ae/41/53/ae4153f76617a6e264a54d0ca0cd108c.jpg',
  description: 'A romantic bouquet of vibrant red roses, elegantly wrapped in premium white paper and finished with a luxurious satin ribbon. A timeless gift to celebrate love, anniversaries, and unforgettable moments.',
  category: 'Anniversary',
  isBestSeller: true,
  isFeatured: true,
  stock: 12
  },
  {
    name: 'Lavender Dreams',
  price: 100,
  image: 'https://i.pinimg.com/736x/d3/cf/6d/d3cf6dd64ddff8c7b78a30f1ed683a00.jpg',
  description: 'A graceful bouquet of soft lavender and pastel purple roses, delicately wrapped in elegant lilac paper with a satin ribbon. A beautiful floral gift to celebrate anniversaries with elegance and lasting love.',
  category: 'Anniversary',
  isBestSeller: true,
  isFeatured: true,
  stock: 12
  },
  {
     name: 'Birthday Bliss',
  price: 80,
  originalPrice: 180,
  image: 'https://i.pinimg.com/1200x/6d/ba/d2/6dbad2ff2cc28c5e051113dd5cea2a19.jpg',
  description: 'A charming bouquet of soft pink roses, delicate white baby’s breath, and fresh greenery, elegantly wrapped in premium blush paper. A beautiful floral gift that adds warmth, joy, and happiness to every birthday celebration.',
  category: 'Birthday',
  isBestSeller: true,
  stock: 18
  },
  {
    name: 'Pink Velvet Roses',
  price: 200,
  image: 'https://i.pinimg.com/736x/93/67/19/936719c0fb49ee2afa390fbbac27f2d5.jpg',
  description: 'A stunning bouquet of premium pink roses, elegantly wrapped in luxurious pastel paper and finished with a satin ribbon. A timeless floral gift to express love, gratitude, and heartfelt affection.',
  category: 'Roses',
  isBestSeller: true,
  stock: 8
  },
  {
     name: 'Sunset Roses',
  price: 200,
  image: 'https://i.pinimg.com/736x/50/f0/00/50f000679e030e55bdb4f4b1d03279cf.jpg',
  description: 'A breathtaking bouquet of premium orange roses, elegantly wrapped in luxurious white paper and finished with a satin ribbon. A vibrant floral gift that symbolizes passion, enthusiasm, and heartfelt admiration.',
  category: 'Roses',
  isBestSeller: true,
  stock: 11
  },
  {
     name: 'White Rose Elegance',
  price: 200,
  image: 'https://i.pinimg.com/736x/30/3a/4e/303a4e9bd9d2dc6c7b7f40ebc2f88d14.jpg',
  description: 'A luxurious bouquet of premium white roses, beautifully wrapped in elegant white paper and finished with a delicate satin ribbon. A timeless floral arrangement that symbolizes purity, grace, and sincere admiration.',
  category: 'Roses',
  isBestSeller: true,
  stock: 8
  },
  {
     name: 'Purple Majesty',
  price: 200,
  image: 'https://i.pinimg.com/736x/db/09/4c/db094c1f39a7e8e2b4302b36d4e9d2ad.jpg',
  description: 'A luxurious bouquet of premium purple roses, elegantly wrapped in soft lavender paper and finished with a satin ribbon. A sophisticated floral gift that symbolizes admiration, enchantment, and everlasting elegance.',
  category: 'Roses',
  isBestSeller: true,
  stock: 8
  },
  {
    name: 'Golden Sun Roses',
  price: 200,
  image: 'https://i.pinimg.com/736x/3f/84/bf/3f84bfe00abb2b430e131bb3e51ea145.jpg',
  description: 'A luxurious bouquet of premium yellow roses, beautifully wrapped in elegant cream paper and finished with a satin ribbon. A radiant floral gift that symbolizes friendship, happiness, joy, and new beginnings.',
  category: 'Roses',
  isBestSeller: true,
  stock: 8
  },
  {
    name: 'Blush Wedding Bouquet',
  price: 180,
  image: 'https://i.pinimg.com/webp85/736x/8d/aa/c0/8daac04b41ca4bf3d0f1cd24e09ef393.webp',
  description: 'A romantic bouquet of soft pink roses and delicate baby’s breath, elegantly wrapped in premium blush paper with a satin ribbon. A graceful floral arrangement designed to make every wedding celebration unforgettable.',
  category: 'Wedding',
  isBestSeller: true,
  stock: 10
  },
  {
    name: 'Pink Romance',
  price: 95,
  image: 'https://i.pinimg.com/736x/9e/13/92/9e1392c77c84f591531818c0b83c3d3e.jpg',
  description: 'A romantic bouquet of fresh pink roses, delicate white baby’s breath, and lush greenery, beautifully wrapped in elegant blush paper. A timeless floral gift to celebrate love, anniversaries, and cherished moments.',
  category: 'Anniversary',
  isFeatured: true,
  stock: 14
  },
  {
    name: 'Golden Celebration',
  price: 120,
  image: 'https://i.pinimg.com/736x/0a/a2/21/0aa221014262a704dd970b8f7eeddf8b.jpg',
  description: 'A stunning bouquet of vibrant yellow roses, accented with fresh greenery and elegantly wrapped in premium white paper with a satin ribbon. A joyful floral gift, perfect for celebrating achievements, graduations, promotions, and special milestones.',
  category: 'Congratulations',
  isFeatured: true,
  stock: 9
  },
  {
     name: 'Purple Triumph',
  price: 120,
  image: 'https://i.pinimg.com/736x/76/a7/77/76a7775fc34792eac951b5790260b114.jpg',
  description: 'A stunning bouquet of elegant purple roses accented with fresh greenery, beautifully wrapped in premium lavender paper and finished with a satin ribbon. A sophisticated floral gift to celebrate achievements, graduations, promotions, and special milestones.',
  category: 'Congratulations',
  isFeatured: true,
  stock: 9
  },
  {
     name: 'Sunshine Success',
  price: 120,
  image: 'https://i.pinimg.com/webp85/736x/ad/53/d5/ad53d5ad0d2ada129bd4e269f495fa0b.webp',
  description: 'A radiant bouquet of bright yellow roses, delicately accented with fresh greenery and elegantly wrapped in premium white paper. A cheerful floral gift that celebrates success, achievements, graduations, and new beginnings.',
  category: 'Congratulations',
  isFeatured: true,
  stock: 9
  },
  {
     name: 'Royal Achievement',
  price: 120,
  image: 'https://i.pinimg.com/736x/d3/14/af/d314aff3744e32e95f40a233cfbc8677.jpg',
  description: 'A sophisticated bouquet of premium purple roses, beautifully accented with fresh greenery and wrapped in elegant white paper. A meaningful floral gift that celebrates achievements, milestones, graduations, and memorable successes.',
  category: 'Congratulations',
  isFeatured: true,
  stock: 9
  },
  {
     name: 'Crimson Elegance',
  price: 250,
  image: 'https://i.pinimg.com/736x/f8/6f/dd/f86fdd533076c6e1358bd10ef55a89bb.jpg',
  description: 'A luxurious bouquet of premium red roses, elegantly wrapped in sophisticated black paper and finished with a matching satin ribbon. A timeless floral gift that expresses deep love, passion, and everlasting devotion for a truly unforgettable anniversary.',
  category: 'Anniversary',
  stock: 6
  },
  {
     name: 'Golden Birthday Bloom',
  price: 65,
  image: 'https://i.pinimg.com/736x/70/10/20/70102020fec0d55c57d160cfc6576f99.jpg',
  description: 'A cheerful bouquet of radiant yellow roses, fresh white daisies, and lush greenery, elegantly wrapped in premium kraft paper. A joyful floral gift that brings warmth, happiness, and smiles to every birthday celebration.',
  category: 'Birthday',
  stock: 25
  },
  {
     name: 'Pure Wedding Elegance',
  price: 130,
  image: 'https://i.pinimg.com/736x/1f/41/6c/1f416c100e032c38fbb1ec28c8acf81f.jpg',
  description: 'A graceful bouquet of premium white roses, delicately accented with fresh greenery and wrapped in elegant white paper with a luxurious satin ribbon. A timeless floral arrangement that symbolizes purity, love, and the beauty of every wedding celebration.',
  category: 'Wedding',
  stock: 11
  },
  {
    name: 'Spring Blossom',
  price: 110,
  image: 'https://i.pinimg.com/736x/1e/19/c2/1e19c2b3f4431e5278cc26780f9545cd.jpg',
  description: 'A charming bouquet of soft pink roses, delicate white baby’s breath, and fresh greenery, elegantly wrapped in premium blush paper. Inspired by the beauty of spring, this floral arrangement brings warmth, freshness, and joy to every seasonal celebration.',
  category: 'Seasonal',
  isFeatured: true,
  stock: 7
  },
  {
   name: 'Autumn Harvest',
  price: 110,
  image: 'https://i.pinimg.com/736x/ed/9b/7b/ed9b7b80a84afaf07bc10bc7b1143187.jpg',
  description: 'A warm seasonal bouquet featuring vibrant orange roses, delicate white baby’s breath, and fresh greenery, beautifully wrapped in elegant kraft paper. Inspired by the rich colors of autumn, this arrangement is perfect for celebrating the beauty of every season.',
  category: 'Seasonal',
  isFeatured: true,
  stock: 7
  },
  {
    name: 'Winter Frost',
  price: 110,
  image: 'https://i.pinimg.com/736x/d7/ea/1b/d7ea1b750d7dc8c46dc6b5e872ddd737.jpg',
  description: 'A sophisticated seasonal bouquet of elegant white roses, delicate baby’s breath, and fresh greenery, beautifully wrapped in premium white paper with a satin ribbon. Inspired by the serenity of winter, this timeless arrangement brings grace and elegance to every occasion.',
  category: 'Seasonal',
  isFeatured: true,
  stock: 7
  },
  {
    name: 'Spring Harmony',
  price: 110,
  image: 'https://i.pinimg.com/webp85/736x/25/5e/0b/255e0b985479aff45c9140e512ca6223.webp',
  description: 'A fresh seasonal bouquet of soft pink roses, delicate white baby’s breath, and lush greenery, elegantly wrapped in premium blush paper. Inspired by the beauty of spring, this arrangement brings warmth, freshness, and natural elegance to every occasion.',
  category: 'Seasonal',
  isFeatured: true,
  stock: 7
  },
  {
    name: 'Peaceful Remembrance',
  price: 110,
  image: 'https://i.pinimg.com/736x/97/e0/e3/97e0e30f9e49203c3cedce09edf671d3.jpg',
  description: 'A graceful bouquet of pure white roses, delicate baby’s breath, and fresh greenery, elegantly wrapped in premium white paper. A heartfelt floral tribute that offers comfort, peace, and sincere sympathy during times of remembrance.',
  category: 'Sympathy',
  isFeatured: true,
  stock: 7
  },
  {
    name: 'Gentle Remembrance',
  price: 110,
  image: 'https://i.pinimg.com/736x/a7/63/6c/a7636cdea2b8464259aacc6a284aa7e5.jpg',
  description: 'A delicate bouquet of soft pink roses, white baby’s breath, and fresh greenery, elegantly wrapped in premium blush paper. A thoughtful floral tribute that offers comfort, compassion, and heartfelt sympathy during difficult times.',
  category: 'Sympathy',
  isFeatured: true,
  stock: 7
  },
  {
    name: 'Peaceful Tribute',
  price: 110,
  image: 'https://i.pinimg.com/736x/2c/70/b6/2c70b6ca93ae81abbda6d571f18aa8ea.jpg',
  description: 'A graceful bouquet of pure white roses, delicate baby’s breath, and fresh eucalyptus, elegantly wrapped in premium white paper. A heartfelt expression of sympathy, offering peace, comfort, and loving remembrance during difficult times.',
  category: 'Sympathy',
  isFeatured: true,
  stock: 7
  }
];

// ── Sample Flower Meanings Data ───────────────────────────────
const meanings = [
  {
    flowerName: 'Rose',
    image: 'https://i.pinimg.com/736x/c9/1e/e0/c91ee053cf5e6ad481fe7bf2312d7935.jpg',
    meaning: 'Roses symbolize love, beauty, and passion. Red roses represent deep romantic love, while pink roses convey admiration and gratitude. White roses stand for purity and new beginnings.',
    occasions: ["Valentine's Day", 'Weddings', 'Anniversaries', 'Romantic Gestures'],
    color: '#720009',
    funFact: 'Roses have been symbols of love for over 5,000 years and were sacred to Aphrodite, the Greek goddess of love.'
  },
  {
    flowerName: 'Peony',
    image: 'https://i.pinimg.com/webp85/736x/16/6e/4d/166e4d16b9de20084aa614d2c9ea7fff.webp',
    meaning: 'Peonies represent prosperity, good luck, love, and honor. In Chinese culture, they are considered the "king of flowers" and symbolize wealth and nobility.',
    occasions: ['Weddings', 'Graduations', 'New Home', 'Birthdays'],
    color: '#f4a7b9',
    funFact: 'Peonies can live for 100 years and still bloom every spring. They require cold winters to bloom beautifully.'
  },
  {
    flowerName: 'Tulip',
    image: 'https://i.pinimg.com/736x/07/28/17/0728179a341efd6c735f6b928671efca.jpg',
    meaning: 'Tulips symbolize perfect love, elegance, and grace. Red tulips declare deep love, yellow tulips represent cheerful thoughts, and white tulips mean forgiveness.',
    occasions: ["Mother's Day", 'Spring Celebrations', 'Apologies', "Easter"],
    color: '#53031d',
    funFact: 'During the Dutch "Tulip Mania" in the 1630s, tulip bulbs were worth more than houses. They were used as currency!'
  },
  {
    flowerName: 'Lavender',
    image: 'https://i.pinimg.com/736x/f7/79/85/f7798512816208c570709a7efffd8fd8.jpg',
    meaning: 'Lavender symbolizes serenity, grace, calmness, and devotion. It represents elegance and refinement, often associated with female beauty and purity.',
    occasions: ['Thank You Gifts', 'Relaxation', 'Sympathy', 'Wellness'],
    color: '#b8a9d9',
    funFact: 'Lavender has been used for over 2,500 years for its calming and healing properties. The Romans used it to scent their baths.'
  },
  {
    flowerName: 'Sunflower',
    image: 'https://i.pinimg.com/736x/4b/b7/31/4bb731167692cb52f87f73696907e01e.jpg',
    meaning: 'Sunflowers represent happiness, warmth, positivity, and adoration. They symbolize loyalty and longevity, turning their faces toward the sun as a sign of devotion.',
    occasions: ['Birthdays', 'Get Well Soon', 'Congratulations', 'Housewarming'],
    color: '#ffd166',
    funFact: 'A sunflower head is actually made up of up to 2,000 tiny individual flowers called florets, all packed together.'
  },
  {
    flowerName: 'Lily',
    image: 'https://i.pinimg.com/736x/68/2c/66/682c66be3de50ddd313d804812fa6fca.jpg',
    meaning: 'Lilies symbolize purity, renewal, and majesty. White lilies represent purity and virtue, while stargazer lilies symbolize ambition and encouragement.',
    occasions: ['Weddings', 'Funerals & Sympathy', 'Baptisms', 'Easter'],
    color: '#e8d5c4',
    funFact: 'Lilies are one of the oldest cultivated flowers, with evidence of their cultivation dating back over 3,000 years in ancient Egypt.'
  },
  {
    flowerName: 'Ranunculus',
    image: 'https://i.pinimg.com/736x/d1/ab/b4/d1abb4981a2c0d2289bcc01e28189f45.jpg',
    meaning: 'Ranunculus symbolizes radiant charm, attractiveness, and saying "I am dazzled by your charms." They represent attraction and charm in the language of flowers.',
    occasions: ['Weddings', 'Romantic Occasions', "Valentine's Day", 'Spring Events'],
    color: '#5e2500',
    funFact: 'Ranunculus flowers have over 800 species and can be found naturally on every continent except Antarctica.'
  },
  {
    flowerName: 'Cherry Blossom',
    image: 'https://i.pinimg.com/736x/46/55/7c/46557cbe2bfdb0195ca8150367655a3b.jpg',
    meaning: 'Cherry blossoms symbolize renewal, the fleeting nature of life, and beauty. In Japanese culture (Hanami), they represent the Buddhist concept of mono no aware — the bittersweet awareness of impermanence.',
    occasions: ['Spring Celebrations', 'New Beginnings', 'Japanese Festivals', 'Mindfulness Gifts'],
    color: '#ffb3c6',
    funFact: 'Cherry blossom season in Japan lasts only about two weeks. Over 200 varieties of cherry trees exist throughout Japan alone.'
  },
  {
    flowerName: 'Orchid',
    image: 'https://i.pinimg.com/736x/19/57/ac/1957acc7bbda61731a51966528a96560.jpg',
    meaning: 'Orchids symbolize luxury, beauty, strength, and love. They represent refinement, thoughtfulness, and mature charm. In ancient Greece, they were associated with virility and fertility.',
    occasions: ['Anniversaries', 'Luxury Gifts', 'Congratulations', 'Thank You'],
    color: '#b8e6c0',
    funFact: 'There are over 28,000 species of orchids worldwide, making them one of the largest flowering plant families. Their seeds are as small as dust particles!'
  },
  {
    flowerName: 'Hydrangea',
    image: 'https://i.pinimg.com/webp85/736x/ed/c3/c9/edc3c95b99048b5b540287c5da295165.webp',
    meaning: 'Hydrangeas symbolize heartfelt emotions, gratitude, and understanding. They represent apology or thank you for understanding. Blue hydrangeas represent remorse and coldness, while pink represents sincere emotion.',
    occasions: ['Apologies', 'Anniversaries', 'Thank You Gifts', 'Mother\'s Day'],
    color: '#a8c8e8',
    funFact: 'Hydrangea flower color changes based on soil pH — acidic soil produces blue flowers, while alkaline soil produces pink flowers!'
  },
  {
    flowerName: 'Daisy',
    image: 'https://i.pinimg.com/736x/8d/34/84/8d3484ca161a16fa8e39698aedb22ea0.jpg',
    meaning: 'Daisies symbolize innocence, purity, new beginnings, and loyal love. They represent cheerfulness and simplicity. In Victorian flower language, they say "I will never tell your secret."',
    occasions: ['Birthdays', 'New Baby', 'Friendship Gifts', 'Spring Celebrations'],
    color: '#fff0b5',
    funFact: 'Daisies close their petals at night and open them again in the morning, which is why they\'re called "day\'s eye" (Old English "dægeseage").'
  },
  {
    flowerName: 'Carnation',
    image: 'https://i.pinimg.com/736x/34/03/5d/34035d12b0c430cc05aa8b93405148f4.jpg',
    meaning: 'Carnations symbolize fascination, distinction, and love. Red carnations represent deep love and admiration, white carnations stand for pure love and good luck, and pink carnations mean "I will never forget you."',
    occasions: ['Mother\'s Day', 'Anniversaries', 'Sympathy', 'Graduations'],
    color: '#f0a0b0',
    funFact: 'Carnations are the birth flower for January and have been cultivated for over 2,000 years. They can last up to three weeks in a vase!'
  },
  {
    flowerName: 'Iris',
    image: 'https://i.pinimg.com/webp85/736x/13/23/e8/1323e8fbfb87b4f3cdf54cdf531e0299.webp',
    meaning: 'Iris symbolizes hope, wisdom, courage, and admiration. The three upright petals represent faith, valor, and wisdom. In Greek mythology, Iris was the goddess of the rainbow and messenger of the gods.',
    occasions: ['Sympathy', 'Get Well Soon', 'New Beginnings', 'Congratulations'],
    color: '#b5c8e0',
    funFact: 'The iris is the inspiration for the fleur-de-lis, the famous symbol of French royalty. Over 300 species of iris exist worldwide.'
  },
  {
    flowerName: 'Dahlia',
    image: 'https://i.pinimg.com/736x/6e/b0/fc/6eb0fcba074cdd28c3602e575f847663.jpg',
    meaning: 'Dahlias symbolize elegance, inner strength, creativity, and dignity. They represent staying kind despite challenges. Red dahlias represent strength, pink represents grace, and purple represents royalty.',
    occasions: ['Weddings', 'Artistic Gifts', 'Anniversaries', 'Thank You'],
    color: '#e0a0c0',
    funFact: 'Dahlias were originally called "tree peonies" by Spanish explorers in Mexico. They are the national flower of Mexico and can grow up to 20 feet tall!'
  },
  {
    flowerName: 'Gardenia',
    image: 'https://i.pinimg.com/736x/5c/aa/4f/5caa4feebb49feb233938256ed98a1b7.jpg',
    meaning: 'Gardenias symbolize purity, sweetness, secret love, and joy. They represent "you are lovely" and are often associated with trust and clarity. Their intoxicating fragrance represents refined beauty.',
    occasions: ['Romantic Gestures', 'Weddings', 'Apologies', 'Sympathy'],
    color: '#d0e8d2',
    funFact: 'Gardenias are notoriously difficult to grow because they require high humidity, specific soil acidity, and constant temperatures — but their fragrance is worth the effort!'
  },
  {
    flowerName: 'Aster',
    image: 'https://i.pinimg.com/736x/7c/7d/6d/7c7d6d4e9384edb5785ee21f5668ef27.jpg',
    meaning: 'Asters symbolize patience, elegance, love, and daintiness. Named after the Greek word for "star," they represent talismans of love. In ancient times, people believed aster leaves burned by evil spirits would drive them away.',
    occasions: ['Birthdays', 'New Baby', 'Friendship', 'September Celebrations'],
    color: '#c0a0e0',
    funFact: 'Asters are the birth flower for September. Legend says asters were created from stardust when the goddess Astraea cried, and her tears turned into star-shaped flowers.'
  },
  {
    flowerName: 'Magnolia',
    image: 'https://i.pinimg.com/736x/b7/b2/6e/b7b26ea93add166a130839f6676d0745.jpg',
    meaning: 'Magnolias symbolize dignity, nobility, perseverance, and love of nature. They represent beauty that withstands time. In the American South, they embody hospitality and feminine grace.',
    occasions: ['Weddings', 'Mother\'s Day', 'Sympathy', 'Graduations'],
    color: '#d7f5db',
    funFact: 'Magnolias existed before bees — they evolved to be pollinated by beetles over 95 million years ago, making them one of the oldest flowering plants on Earth!'
  },
  {
    flowerName: 'Anemone',
    image: 'https://i.pinimg.com/736x/33/29/36/3329361c97d7efa08ae08f6d5cf92b36.jpg',
    meaning: 'Anemones symbolize anticipation, protection, fading hope, and sincerity. They represent forsaken love in Victorian flower language. The dark center represents anticipation for something just out of reach.',
    occasions: ['Romantic Gestures', 'Sympathy', 'New Beginnings', 'Spring Weddings'],
    color: '#eea4e8',
    funFact: 'Anemones are also called "wind flowers" because the Greeks believed the wind (Anemos) brings them into bloom in spring. They close at night and when rain approaches.'
  },
  {
    flowerName: 'Camellia',
    image: 'https://i.pinimg.com/736x/24/ab/ce/24abce3b2c6bbab9418bd00ce5a4bc15.jpg',
    meaning: 'Camellias symbolize admiration, perfection, gratitude, and unrequited love. Pink camellias represent longing, white represents adoration, and red represents passionate love. They embody the ideal balance between passion and discipline.',
    occasions: ['Thank You Gifts', 'Apologies', 'Anniversaries', 'Chinese New Year'],
    color: '#f0a0a0',
    funFact: 'Camellias are the tea plant\'s famous cousin — Camellia sinensis gives us tea leaves, while Camellia japonica is purely ornamental. A single camellia bush can bloom for 100+ years!'
  },
  {
    flowerName: 'Freesia',
    image: 'https://i.pinimg.com/736x/0c/e9/fd/0ce9fda13816df013abc3a69bcb8bc5d.jpg',
    meaning: 'Freesias symbolize friendship, trust, thoughtfulness, and innocence. They represent the last flower of trust in Victorian times. Their sweet fragrance is associated with sweetness and purity of heart.',
    occasions: ['Friendship Gifts', 'Birthdays', 'Get Well Soon', 'Thank You'],
    color: '#f5e0a0',
    funFact: 'Freesias are one of the most fragrant flowers in the world, and their scent has been proven to reduce stress and anxiety. They naturally bloom in a straight line along one side of the stem!'
  },
  {
    flowerName: 'Delphinium',
    image: 'https://i.pinimg.com/736x/6b/a0/3d/6ba03d85900f913b5a357c45acf2c10b.jpg',
    meaning: 'Delphiniums symbolize lightness, levity, fun, and big-heartedness. They represent an open heart and ardent attachment. Blue delphiniums represent dignity, while purple represents first love and sweet emotions.',
    occasions: ['Summer Weddings', 'Birthdays', 'New Baby (Boy)', 'Congratulations'],
    color: '#6088d0',
    funFact: 'Delphiniums can grow up to 8 feet tall in ideal conditions. The name comes from the Greek "delphis" (dolphin) because the flower bud shape resembles a dolphin\'s nose.'
  },
  {
    flowerName: 'Snapdragon',
    image: 'https://i.pinimg.com/webp85/736x/bc/f6/2d/bcf62d3613dd8ebfb30f55ccf647ce31.webp',
    meaning: 'Snapdragons symbolize grace, strength, deception, and protection. They represent graciousness and resistance. In folklore, snapdragons were believed to protect against curses and witchcraft when grown near doorways.',
    occasions: ['Get Well Soon', 'Sympathy', 'Graduations', 'Protective Gifts'],
    color: '#e0a0c8',
    funFact: 'When you squeeze the sides of a snapdragon flower, the "dragon mouth" opens and closes. Children in Mediterranean countries have played with them as "dragon puppets" for over 500 years!'
  },
  {
    flowerName: 'Hyacinth',
    image: 'https://i.pinimg.com/webp85/736x/24/21/83/242183586bfe1e0d8bb608509863ba02.webp',
    meaning: 'Hyacinths symbolize jealousy, sorrow, peace, and beauty. They represent deep regret and request for forgiveness in purple, playfulness in yellow, and constancy in white. The flower of Apollo\'s mourning for the youth Hyakinthos.',
    occasions: ['Apologies', 'Sympathy', 'Spring Celebrations', 'Easter'],
    color: '#c090c8',
    funFact: 'Hyacinths are the most fragrant spring bulb after peonies. In Greek myth, Apollo’s tears and the dying boy Hyakinthos’ blood created the first hyacinth. They bloom for 2-3 weeks but their intense perfume lasts even longer!'
  }
];

// ── Run Seed ──────────────────────────────────────────────────
const seedDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Flower.deleteMany({});
    await Meaning.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Insert new data
    await Flower.insertMany(flowers);
    console.log(`🌸 Inserted ${flowers.length} flowers`);

    await Meaning.insertMany(meanings);
    console.log(`📖 Inserted ${meanings.length} flower meanings`);

    console.log('✅ Database seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding failed:', err.message);
    process.exit(1);
  }
};

seedDatabase();
