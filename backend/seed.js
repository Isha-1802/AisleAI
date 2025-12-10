// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const Product = require('./src/models/Product');

// dotenv.config();

// // Comprehensive product templates with proper categorization
// const productTemplates = {
//     Dresses: [
//         { base: 'Silk Evening Gown', brands: ['Sabyasachi', 'Tarun Tahiliani', 'Anita Dongre'], priceRange: [25000, 65000], occasions: ['Wedding', 'Party', 'Festive'], image: 'evening-gown' },
//         { base: 'Floral Maxi Dress', brands: ['Zara', 'H&M', 'Mango'], priceRange: [2499, 5999], occasions: ['Casual', 'Party'], image: 'maxi-dress' },
//         { base: 'Cocktail Dress', brands: ['Forever 21', 'W', 'AND'], priceRange: [1999, 4999], occasions: ['Party', 'Formal'], image: 'cocktail-dress' },
//         { base: 'A-Line Dress', brands: ['Biba', 'Fabindia', 'Global Desi'], priceRange: [1499, 3999], occasions: ['Casual', 'Work'], image: 'a-line-dress' },
//         { base: 'Bodycon Dress', brands: ['Zara', 'Mango', 'Forever 21'], priceRange: [2199, 5499], occasions: ['Party', 'Casual'], image: 'bodycon-dress' },
//         { base: 'Anarkali Dress', brands: ['Biba', 'Fabindia', 'W'], priceRange: [3499, 8999], occasions: ['Festive', 'Wedding'], image: 'anarkali', keywords: ['ethnic', 'ethnic wear', 'indian'] },
//         { base: 'Lehenga Set', brands: ['Sabyasachi', 'Anita Dongre', 'Manish Malhotra'], priceRange: [35000, 95000], occasions: ['Wedding', 'Festive'], image: 'lehenga', keywords: ['ethnic', 'ethnic wear', 'bridal'] },
//         { base: 'Saree', brands: ['Fabindia', 'Biba', 'Sabyasachi'], priceRange: [4999, 45000], occasions: ['Wedding', 'Festive', 'Formal'], image: 'saree', keywords: ['ethnic', 'ethnic wear', 'traditional'] },
//         { base: 'Midi Skirt Dress', brands: ['Zara', 'Mango', 'H&M'], priceRange: [1999, 4499], occasions: ['Casual', 'Work'], image: 'midi-dress', keywords: ['skirt', 'skirts'] },
//     ],
//     Tops: [
//         { base: 'Silk Blouse', brands: ['H&M', 'Zara', 'Mango'], priceRange: [1499, 3999], occasions: ['Work', 'Formal'], image: 'silk-blouse', keywords: ['western', 'western wear'] },
//         { base: 'Embroidered Kurti', brands: ['Fabindia', 'Biba', 'W'], priceRange: [999, 2999], occasions: ['Casual', 'Festive'], image: 'kurti', keywords: ['ethnic', 'ethnic wear'] },
//         { base: 'Crop Top', brands: ['Forever 21', 'H&M', 'Zara'], priceRange: [699, 1999], occasions: ['Casual', 'Party'], image: 'crop-top', keywords: ['western', 'western wear'] },
//         { base: 'Formal Shirt', brands: ['Mango', 'AND', 'W'], priceRange: [1799, 4499], occasions: ['Work', 'Formal'], image: 'formal-shirt', keywords: ['western', 'western wear'] },
//         { base: 'Tunic Top', brands: ['Global Desi', 'Fabindia', 'Biba'], priceRange: [1299, 3499], occasions: ['Casual', 'Work'], image: 'tunic', keywords: ['ethnic', 'ethnic wear'] },
//         { base: 'Co-ord Top', brands: ['Zara', 'Mango', 'H&M'], priceRange: [1999, 4999], occasions: ['Party', 'Casual'], image: 'coord-top', keywords: ['coord', 'co-ord', 'co-ord sets', 'matching set'] },
//         { base: 'Blazer', brands: ['Zara', 'Mango', 'AND'], priceRange: [3999, 9999], occasions: ['Work', 'Formal'], image: 'blazer', keywords: ['western', 'western wear', 'jacket'] },
//     ],
//     Trousers: [
//         { base: 'High-Waist Palazzo', brands: ['W', 'AND', 'Global Desi'], priceRange: [1499, 3999], occasions: ['Casual', 'Work'], image: 'palazzo', keywords: ['ethnic', 'ethnic wear'] },
//         { base: 'Denim Jeans', brands: ['Levis', 'Zara', 'H&M'], priceRange: [2499, 5999], occasions: ['Casual'], image: 'jeans', keywords: ['jeans', 'denim', 'western', 'western wear'] },
//         { base: 'Formal Trousers', brands: ['Mango', 'W', 'AND'], priceRange: [1999, 4999], occasions: ['Work', 'Formal'], image: 'formal-trousers', keywords: ['western', 'western wear'] },
//         { base: 'Cigarette Pants', brands: ['Zara', 'Mango', 'H&M'], priceRange: [2199, 4799], occasions: ['Work', 'Casual'], image: 'cigarette-pants', keywords: ['western', 'western wear'] },
//         { base: 'Co-ord Pants', brands: ['Zara', 'Mango', 'H&M'], priceRange: [2499, 5999], occasions: ['Party', 'Casual'], image: 'coord-pants', keywords: ['coord', 'co-ord', 'co-ord sets', 'matching set'] },
//         { base: 'Dhoti Pants', brands: ['Fabindia', 'Biba', 'Global Desi'], priceRange: [1799, 3999], occasions: ['Festive', 'Casual'], image: 'dhoti-pants', keywords: ['ethnic', 'ethnic wear'] },
//     ],
//     Footwear: [
//         { base: 'Designer Heels', brands: ['Steve Madden', 'Aldo', 'Charles & Keith'], priceRange: [3999, 8999], occasions: ['Party', 'Formal'], image: 'heels', keywords: ['heels', 'stilettos'] },
//         { base: 'Embellished Juttis', brands: ['Needledust', 'Fizzy Goblet', 'Monrow'], priceRange: [1499, 4999], occasions: ['Festive', 'Wedding'], image: 'juttis', keywords: ['juttis', 'mojaris', 'ethnic'] },
//         { base: 'Sneakers', brands: ['Nike', 'Adidas', 'Puma'], priceRange: [3499, 9999], occasions: ['Casual'], image: 'sneakers', keywords: ['sneakers', 'sports'] },
//         { base: 'Sandals', brands: ['Metro', 'Inc.5', 'Bata'], priceRange: [999, 2999], occasions: ['Casual'], image: 'sandals', keywords: ['sandals'] },
//         { base: 'Ankle Boots', brands: ['Zara', 'Mango', 'Steve Madden'], priceRange: [4499, 11999], occasions: ['Casual', 'Party'], image: 'boots', keywords: ['boots'] },
//         { base: 'Ballet Flats', brands: ['Zara', 'H&M', 'Bata'], priceRange: [1499, 3999], occasions: ['Casual', 'Work'], image: 'flats', keywords: ['flats', 'ballerinas'] },
//     ],
//     Bags: [
//         { base: 'Leather Handbag', brands: ['Michael Kors', 'Hidesign', 'Caprese'], priceRange: [8999, 25999], occasions: ['Work', 'Formal'], image: 'handbag', keywords: ['handbag'] },
//         { base: 'Embroidered Clutch', brands: ['Hidesign', 'Baggit', 'Lavie'], priceRange: [1999, 5999], occasions: ['Party', 'Wedding'], image: 'clutch', keywords: ['clutch', 'clutches'] },
//         { base: 'Tote Bag', brands: ['Zara', 'Mango', 'H&M'], priceRange: [1499, 3999], occasions: ['Casual', 'Work'], image: 'tote', keywords: ['tote'] },
//         { base: 'Sling Bag', brands: ['Baggit', 'Lavie', 'Caprese'], priceRange: [1299, 3499], occasions: ['Casual'], image: 'sling-bag', keywords: ['sling'] },
//     ],
//     Eyewear: [
//         { base: 'Aviator Sunglasses', brands: ['Ray-Ban', 'Oakley', 'Fastrack'], priceRange: [4999, 12999], occasions: ['Casual'], image: 'aviator-sunglasses', keywords: ['sunglasses'] },
//         { base: 'Cat-Eye Sunglasses', brands: ['Vogue', 'IDEE', 'Fastrack'], priceRange: [2499, 6999], occasions: ['Casual'], image: 'cat-eye-sunglasses', keywords: ['sunglasses'] },
//         { base: 'Wayfarer Sunglasses', brands: ['Ray-Ban', 'Fastrack', 'IDEE'], priceRange: [3999, 9999], occasions: ['Casual'], image: 'wayfarer-sunglasses', keywords: ['sunglasses'] },
//     ],
//     Watches: [
//         { base: 'Gold Watch', brands: ['Daniel Wellington', 'Timex', 'Fossil'], priceRange: [8999, 19999], occasions: ['Formal', 'Party'], image: 'gold-watch', keywords: ['watch'] },
//         { base: 'Smart Watch', brands: ['Apple', 'Samsung', 'Fitbit'], priceRange: [19999, 45999], occasions: ['Casual', 'Work'], image: 'smart-watch', keywords: ['watch', 'smartwatch'] },
//         { base: 'Leather Strap Watch', brands: ['Fossil', 'Timex', 'Titan'], priceRange: [4999, 12999], occasions: ['Work', 'Casual'], image: 'leather-watch', keywords: ['watch'] },
//     ],
//     Jewelry: [
//         { base: 'Statement Earrings', brands: ['Tanishq', 'Malabar Gold', 'PC Jeweller'], priceRange: [5999, 19999], occasions: ['Party', 'Wedding'], image: 'earrings', keywords: ['jewelry', 'earrings'] },
//         { base: 'Gold Necklace', brands: ['Tanishq', 'Kalyan Jewellers', 'Joyalukkas'], priceRange: [15999, 75999], occasions: ['Wedding', 'Festive'], image: 'necklace', keywords: ['jewelry', 'necklace'] },
//         { base: 'Pearl Jewelry', brands: ['Tanishq', 'Malabar Gold', 'PC Jeweller'], priceRange: [8999, 35999], occasions: ['Formal', 'Wedding'], image: 'pearl-jewelry', keywords: ['jewelry', 'pearl'] },
//         { base: 'Fashion Jewelry', brands: ['Accessorize', 'Forever 21', 'H&M'], priceRange: [499, 1999], occasions: ['Casual', 'Party'], image: 'fashion-jewelry', keywords: ['jewelry', 'accessories'] },
//     ],
//     Makeup: [
//         { base: 'Lipstick Set', brands: ['MAC', 'Maybelline', 'Lakme'], priceRange: [599, 3999], occasions: ['Casual'], image: 'lipstick', keywords: ['makeup', 'lip', 'lip care'] },
//         { base: 'Eye Shadow Palette', brands: ['MAC', 'Urban Decay', 'Huda Beauty'], priceRange: [1999, 5999], occasions: ['Party'], image: 'eyeshadow', keywords: ['makeup', 'eye', 'eye makeup'] },
//         { base: 'Foundation', brands: ['MAC', 'Estee Lauder', 'Maybelline'], priceRange: [999, 4999], occasions: ['Casual'], image: 'foundation', keywords: ['makeup', 'face', 'face care'] },
//         { base: 'Mascara', brands: ['Maybelline', 'L\'Oreal', 'MAC'], priceRange: [499, 2499], occasions: ['Casual'], image: 'mascara', keywords: ['makeup', 'eye', 'eye makeup'] },
//     ],
//     Skincare: [
//         { base: 'Face Serum', brands: ['The Ordinary', 'Minimalist', 'Plum'], priceRange: [699, 2999], occasions: ['Casual'], image: 'serum', keywords: ['skincare', 'face', 'face care'] },
//         { base: 'Moisturizer', brands: ['Cetaphil', 'Neutrogena', 'Plum'], priceRange: [499, 1999], occasions: ['Casual'], image: 'moisturizer', keywords: ['skincare', 'face', 'face care'] },
//         { base: 'Sunscreen', brands: ['La Roche-Posay', 'Neutrogena', 'Biotique'], priceRange: [599, 2499], occasions: ['Casual'], image: 'sunscreen', keywords: ['skincare', 'face', 'face care'] },
//         { base: 'Body Lotion', brands: ['The Body Shop', 'Vaseline', 'Nivea'], priceRange: [399, 1999], occasions: ['Casual'], image: 'body-lotion', keywords: ['skincare', 'body', 'body care'] },
//     ],
// };

// // Image mapping for each product type
// // UPDATED WITH WORKING UNSPLASH URLs
// const imageMap = {
//     'evening-gown': 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800',
//     'maxi-dress': 'https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=800',
//     'cocktail-dress': 'https://images.unsplash.com/photo-1572804013427-4d7ca7268217?w=800',
//     'a-line-dress': 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800',
//     'bodycon-dress': 'https://images.unsplash.com/photo-1566206091558-7f218b696731?w=800',
//     'anarkali': 'https://images.unsplash.com/photo-1628173456885-2e6b8c8d234a?w=800',
//     'lehenga': 'https://images.unsplash.com/photo-1598555835694-811c7943c2db?w=800',
//     'saree': 'https://images.unsplash.com/photo-1610189033363-255d658c1605?w=800',
//     'midi-dress': 'https://images.unsplash.com/photo-1534125958514-63bd6a0b943d?w=800',

//     'silk-blouse': 'https://images.unsplash.com/photo-1551163943-3f6a29e39426?w=800',
//     'kurti': 'https://images.unsplash.com/photo-1632297825006-2533c3321598?w=800',
//     'crop-top': 'https://images.unsplash.com/photo-1525299374535-a9807490a618?w=800',
//     'formal-shirt': 'https://images.unsplash.com/photo-1563630423918-b58f07336ac9?w=800',
//     'tunic': 'https://images.unsplash.com/photo-1554568218-0f1715e72254?w=800',
//     'coord-top': 'https://images.unsplash.com/photo-1605763240004-7e93b172d754?w=800',
//     'blazer': 'https://images.unsplash.com/photo-1548624149-f9c1859aa9d5?w=800',

//     // UPDATED TROUSERS (Most likely culprits)
//     'palazzo': 'https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?w=800',
//     'jeans': 'https://images.unsplash.com/photo-1584370848010-d7d6acb50306?w=800',
//     'formal-trousers': 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800', // Kept one to see if it works, usually trousers are hard
//     'cigarette-pants': 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800',
//     'coord-pants': 'https://images.unsplash.com/photo-1582142387114-1e0586e24db4?w=800',
//     'dhoti-pants': 'https://images.unsplash.com/photo-1627916568770-349f29134b22?w=800',

//     'heels': 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800',
//     'juttis': 'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=800',
//     'sneakers': 'https://images.unsplash.com/photo-1560769629-975e127df812?w=800',
//     'sandals': 'https://images.unsplash.com/photo-1562273138-f46be4ebdf33?w=800',
//     'boots': 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=800',
//     'flats': 'https://images.unsplash.com/photo-1537832816519-689ad163238b?w=800',

//     'handbag': 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800',
//     'clutch': 'https://images.unsplash.com/photo-1567117565403-f1df464c2957?w=800',
//     'tote': 'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800',
//     'sling-bag': 'https://images.unsplash.com/photo-1585474324707-16b7381d604e?w=800',

//     'aviator-sunglasses': 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800',
//     'cat-eye-sunglasses': 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800',
//     'wayfarer-sunglasses': 'https://images.unsplash.com/photo-1577803645773-f96470509666?w=800',

//     'gold-watch': 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800',
//     'smart-watch': 'https://images.unsplash.com/photo-1558231908-727c95e135f5?w=800',
//     'leather-watch': 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800',

//     'earrings': 'https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?w=800',
//     'necklace': 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800',
//     'pearl-jewelry': 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800',
//     'fashion-jewelry': 'https://images.unsplash.com/photo-1506630448388-4e68ef0ac584?w=800',

//     'lipstick': 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=800',
//     'eyeshadow': 'https://images.unsplash.com/photo-1596462502278-27bfdd403cc2?w=800',
//     'foundation': 'https://images.unsplash.com/photo-1596462502278-27bfdd403cc2?w=800',
//     'mascara': 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800',

//     'serum': 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800',
//     'moisturizer': 'https://images.unsplash.com/photo-1571781535133-1ec09825442f?w=800',
//     'sunscreen': 'https://images.unsplash.com/photo-1556228578-8d85f5536417?w=800',
//     'body-lotion': 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=800',
// };

// const colors = ['Black', 'White', 'Red', 'Blue', 'Green', 'Yellow', 'Pink', 'Purple', 'Orange', 'Brown', 'Beige', 'Navy', 'Burgundy', 'Emerald'];
// const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Free Size'];
// const seasons = ['Spring', 'Summer', 'Fall', 'Winter', 'All Season'];

// function generateProducts() {
//     const products = [];
//     let productId = 1;

//     Object.entries(productTemplates).forEach(([category, templates]) => {
//         templates.forEach((template) => {
//             // Generate multiple variations per template
//             for (let i = 0; i < 15; i++) {
//                 template.brands.forEach((brand) => {
//                     const price = Math.floor(Math.random() * (template.priceRange[1] - template.priceRange[0])) + template.priceRange[0];
//                     const hasDiscount = Math.random() > 0.7;
//                     const originalPrice = hasDiscount ? Math.floor(price * 1.3) : null;
//                     const discount = hasDiscount ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

//                     // Pick a specific occasion from the template's occasions
//                     const occasion = template.occasions[Math.floor(Math.random() * template.occasions.length)];

//                     // Build description with keywords
//                     const keywords = template.keywords || [];
//                     const keywordString = keywords.length > 0 ? ` ${keywords.join(' ')}` : '';

//                     // Generate unique image URL with random seed for variety
//                     const randomSeed = Math.floor(Math.random() * 10000);
//                     const baseImage = imageMap[template.image] || 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800';
//                     const uniqueImage = baseImage.includes('unsplash')
//                         ? `${baseImage}&sig=${randomSeed}`
//                         : baseImage;

//                     const product = {
//                         name: `${template.base} ${String.fromCharCode(65 + Math.floor(i / 2))}${i % 2 + 1}`,
//                         brand,
//                         category,
//                         price,
//                         originalPrice,
//                         discount,
//                         description: `Premium ${template.base.toLowerCase()} from ${brand}, perfect for ${occasion.toLowerCase()} occasions${keywordString}`,
//                         images: [uniqueImage],
//                         colors: [colors[Math.floor(Math.random() * colors.length)], colors[Math.floor(Math.random() * colors.length)]],
//                         sizes: category === 'Eyewear' || category === 'Watches' || category === 'Bags' ? ['One Size'] : sizes.slice(0, Math.floor(Math.random() * 3) + 3),
//                         occasion,
//                         season: seasons[Math.floor(Math.random() * seasons.length)],
//                         rating: (Math.random() * 2 + 3).toFixed(1),
//                         reviews: Math.floor(Math.random() * 500) + 10,
//                         stock: Math.floor(Math.random() * 50) + 5,
//                         featured: Math.random() > 0.9,
//                         trending: Math.random() > 0.85,
//                     };

//                     products.push(product);
//                     productId++;
//                 });
//             }
//         });
//     });

//     return products;
// }

// async function seedDatabase() {
//     try {
//         await mongoose.connect(process.env.MONGODB_URI);
//         console.log('✅ Connected to MongoDB');

//         // Clear existing products
//         await Product.deleteMany({});
//         console.log('🗑️  Cleared existing products');

//         // Generate products
//         const products = generateProducts();
//         console.log(`📦 Generated ${products.length} products`);

//         // Insert in batches for better performance
//         const batchSize = 100;
//         for (let i = 0; i < products.length; i += batchSize) {
//             const batch = products.slice(i, i + batchSize);
//             await Product.insertMany(batch);
//             console.log(`   Inserted batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(products.length / batchSize)}`);
//         }

//         console.log(`✅ Successfully inserted ${products.length} products!`);
//         console.log('🎉 Database seeded successfully!');
//         process.exit(0);
//     } catch (error) {
//         console.error('❌ Seed error:', error);
//         process.exit(1);
//     }
// }

// seedDatabase();


const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./src/models/Product');

dotenv.config();

// Product templates (unchanged from your version)
const productTemplates = {
    Dresses: [
        { base: 'Silk Evening Gown', brands: ['Sabyasachi', 'Tarun Tahiliani', 'Anita Dongre'], priceRange: [25000, 65000], occasions: ['Wedding', 'Party', 'Festive'], image: 'evening-gown' },
        { base: 'Floral Maxi Dress', brands: ['Zara', 'H&M', 'Mango'], priceRange: [2499, 5999], occasions: ['Casual', 'Party'], image: 'maxi-dress' },
        { base: 'Cocktail Dress', brands: ['Forever 21', 'W', 'AND'], priceRange: [1999, 4999], occasions: ['Party', 'Formal'], image: 'cocktail-dress' },
        { base: 'A-Line Dress', brands: ['Biba', 'Fabindia', 'Global Desi'], priceRange: [1499, 3999], occasions: ['Casual', 'Work'], image: 'a-line-dress' },
        { base: 'Bodycon Dress', brands: ['Zara', 'Mango', 'Forever 21'], priceRange: [2199, 5499], occasions: ['Party', 'Casual'], image: 'bodycon-dress' },
        { base: 'Anarkali Dress', brands: ['Biba', 'Fabindia', 'W'], priceRange: [3499, 8999], occasions: ['Festive', 'Wedding'], image: 'anarkali', keywords: ['ethnic', 'ethnic wear', 'indian'] },
        { base: 'Lehenga Set', brands: ['Sabyasachi', 'Anita Dongre', 'Manish Malhotra'], priceRange: [35000, 95000], occasions: ['Wedding', 'Festive'], image: 'lehenga', keywords: ['ethnic', 'ethnic wear', 'bridal'] },
        { base: 'Saree', brands: ['Fabindia', 'Biba', 'Sabyasachi'], priceRange: [4999, 45000], occasions: ['Wedding', 'Festive', 'Formal'], image: 'saree', keywords: ['ethnic', 'ethnic wear', 'traditional'] },
        { base: 'Midi Skirt Dress', brands: ['Zara', 'Mango', 'H&M'], priceRange: [1999, 4499], occasions: ['Casual', 'Work'], image: 'midi-dress', keywords: ['skirt', 'skirts'] },
    ],
    Tops: [
        { base: 'Silk Blouse', brands: ['H&M', 'Zara', 'Mango'], priceRange: [1499, 3999], occasions: ['Work', 'Formal'], image: 'silk-blouse', keywords: ['western', 'western wear'] },
        { base: 'Embroidered Kurti', brands: ['Fabindia', 'Biba', 'W'], priceRange: [999, 2999], occasions: ['Casual', 'Festive'], image: 'kurti', keywords: ['ethnic', 'ethnic wear'] },
        { base: 'Crop Top', brands: ['Forever 21', 'H&M', 'Zara'], priceRange: [699, 1999], occasions: ['Casual', 'Party'], image: 'crop-top', keywords: ['western', 'western wear'] },
        { base: 'Formal Shirt', brands: ['Mango', 'AND', 'W'], priceRange: [1799, 4499], occasions: ['Work', 'Formal'], image: 'formal-shirt', keywords: ['western', 'western wear'] },
        { base: 'Tunic Top', brands: ['Global Desi', 'Fabindia', 'Biba'], priceRange: [1299, 3499], occasions: ['Casual', 'Work'], image: 'tunic', keywords: ['ethnic', 'ethnic wear'] },
        { base: 'Co-ord Top', brands: ['Zara', 'Mango', 'H&M'], priceRange: [1999, 4999], occasions: ['Party', 'Casual'], image: 'coord-top', keywords: ['coord', 'co-ord', 'co-ord sets', 'matching set'] },
        { base: 'Blazer', brands: ['Zara', 'Mango', 'AND'], priceRange: [3999, 9999], occasions: ['Work', 'Formal'], image: 'blazer', keywords: ['western', 'western wear', 'jacket'] },
    ],
    Trousers: [
        { base: 'High-Waist Palazzo', brands: ['W', 'AND', 'Global Desi'], priceRange: [1499, 3999], occasions: ['Casual', 'Work'], image: 'palazzo', keywords: ['ethnic', 'ethnic wear'] },
        { base: 'Denim Jeans', brands: ['Levis', 'Zara', 'H&M'], priceRange: [2499, 5999], occasions: ['Casual'], image: 'jeans', keywords: ['jeans', 'denim', 'western', 'western wear'] },
        { base: 'Formal Trousers', brands: ['Mango', 'W', 'AND'], priceRange: [1999, 4999], occasions: ['Work', 'Formal'], image: 'formal-trousers', keywords: ['western', 'western wear'] },
        { base: 'Cigarette Pants', brands: ['Zara', 'Mango', 'H&M'], priceRange: [2199, 4799], occasions: ['Work', 'Casual'], image: 'cigarette-pants', keywords: ['western', 'western wear'] },
        { base: 'Co-ord Pants', brands: ['Zara', 'Mango', 'H&M'], priceRange: [2499, 5999], occasions: ['Party', 'Casual'], image: 'coord-pants', keywords: ['coord', 'co-ord', 'co-ord sets', 'matching set'] },
        { base: 'Dhoti Pants', brands: ['Fabindia', 'Biba', 'Global Desi'], priceRange: [1799, 3999], occasions: ['Festive', 'Casual'], image: 'dhoti-pants', keywords: ['ethnic', 'ethnic wear'] },
    ],
    Footwear: [
        { base: 'Designer Heels', brands: ['Steve Madden', 'Aldo', 'Charles & Keith'], priceRange: [3999, 8999], occasions: ['Party', 'Formal'], image: 'heels', keywords: ['heels', 'stilettos'] },
        { base: 'Embellished Juttis', brands: ['Needledust', 'Fizzy Goblet', 'Monrow'], priceRange: [1499, 4999], occasions: ['Festive', 'Wedding'], image: 'juttis', keywords: ['juttis', 'mojaris', 'ethnic'] },
        { base: 'Sneakers', brands: ['Nike', 'Adidas', 'Puma'], priceRange: [3499, 9999], occasions: ['Casual'], image: 'sneakers', keywords: ['sneakers', 'sports'] },
        { base: 'Sandals', brands: ['Metro', 'Inc.5', 'Bata'], priceRange: [999, 2999], occasions: ['Casual'], image: 'sandals', keywords: ['sandals'] },
        { base: 'Ankle Boots', brands: ['Zara', 'Mango', 'Steve Madden'], priceRange: [4499, 11999], occasions: ['Casual', 'Party'], image: 'boots', keywords: ['boots'] },
        { base: 'Ballet Flats', brands: ['Zara', 'H&M', 'Bata'], priceRange: [1499, 3999], occasions: ['Casual', 'Work'], image: 'flats', keywords: ['flats', 'ballerinas'] },
    ],
    Bags: [
        { base: 'Leather Handbag', brands: ['Michael Kors', 'Hidesign', 'Caprese'], priceRange: [8999, 25999], occasions: ['Work', 'Formal'], image: 'handbag', keywords: ['handbag'] },
        { base: 'Embroidered Clutch', brands: ['Hidesign', 'Baggit', 'Lavie'], priceRange: [1999, 5999], occasions: ['Party', 'Wedding'], image: 'clutch', keywords: ['clutch', 'clutches'] },
        { base: 'Tote Bag', brands: ['Zara', 'Mango', 'H&M'], priceRange: [1499, 3999], occasions: ['Casual', 'Work'], image: 'tote', keywords: ['tote'] },
        { base: 'Sling Bag', brands: ['Baggit', 'Lavie', 'Caprese'], priceRange: [1299, 3499], occasions: ['Casual'], image: 'sling-bag', keywords: ['sling'] },
    ],
    Eyewear: [
        { base: 'Aviator Sunglasses', brands: ['Ray-Ban', 'Oakley', 'Fastrack'], priceRange: [4999, 12999], occasions: ['Casual'], image: 'aviator-sunglasses', keywords: ['sunglasses'] },
        { base: 'Cat-Eye Sunglasses', brands: ['Vogue', 'IDEE', 'Fastrack'], priceRange: [2499, 6999], occasions: ['Casual'], image: 'cat-eye-sunglasses', keywords: ['sunglasses'] },
        { base: 'Wayfarer Sunglasses', brands: ['Ray-Ban', 'Fastrack', 'IDEE'], priceRange: [3999, 9999], occasions: ['Casual'], image: 'wayfarer-sunglasses', keywords: ['sunglasses'] },
    ],
    Watches: [
        { base: 'Gold Watch', brands: ['Daniel Wellington', 'Timex', 'Fossil'], priceRange: [8999, 19999], occasions: ['Formal', 'Party'], image: 'gold-watch', keywords: ['watch'] },
        { base: 'Smart Watch', brands: ['Apple', 'Samsung', 'Fitbit'], priceRange: [19999, 45999], occasions: ['Casual', 'Work'], image: 'smart-watch', keywords: ['watch', 'smartwatch'] },
        { base: 'Leather Strap Watch', brands: ['Fossil', 'Timex', 'Titan'], priceRange: [4999, 12999], occasions: ['Work', 'Casual'], image: 'leather-watch', keywords: ['watch'] },
    ],
    Jewelry: [
        { base: 'Statement Earrings', brands: ['Tanishq', 'Malabar Gold', 'PC Jeweller'], priceRange: [5999, 19999], occasions: ['Party', 'Wedding'], image: 'earrings', keywords: ['jewelry', 'earrings'] },
        { base: 'Gold Necklace', brands: ['Tanishq', 'Kalyan Jewellers', 'Joyalukkas'], priceRange: [15999, 75999], occasions: ['Wedding', 'Festive'], image: 'necklace', keywords: ['jewelry', 'necklace'] },
        { base: 'Pearl Jewelry', brands: ['Tanishq', 'Malabar Gold', 'PC Jeweller'], priceRange: [8999, 35999], occasions: ['Formal', 'Wedding'], image: 'pearl-jewelry', keywords: ['jewelry', 'pearl'] },
        { base: 'Fashion Jewelry', brands: ['Accessorize', 'Forever 21', 'H&M'], priceRange: [499, 1999], occasions: ['Casual', 'Party'], image: 'fashion-jewelry', keywords: ['jewelry', 'accessories'] },
    ],
    Makeup: [
        { base: 'Lipstick Set', brands: ['MAC', 'Maybelline', 'Lakme'], priceRange: [599, 3999], occasions: ['Casual'], image: 'lipstick', keywords: ['makeup', 'lip', 'lip care'] },
        { base: 'Eye Shadow Palette', brands: ['MAC', 'Urban Decay', 'Huda Beauty'], priceRange: [1999, 5999], occasions: ['Party'], image: 'eyeshadow', keywords: ['makeup', 'eye', 'eye makeup'] },
        { base: 'Foundation', brands: ['MAC', 'Estee Lauder', 'Maybelline'], priceRange: [999, 4999], occasions: ['Casual'], image: 'foundation', keywords: ['makeup', 'face', 'face care'] },
        { base: 'Mascara', brands: ['Maybelline', 'L\'Oreal', 'MAC'], priceRange: [499, 2499], occasions: ['Casual'], image: 'mascara', keywords: ['makeup', 'eye', 'eye makeup'] },
    ],
    Skincare: [
        { base: 'Face Serum', brands: ['The Ordinary', 'Minimalist', 'Plum'], priceRange: [699, 2999], occasions: ['Casual'], image: 'serum', keywords: ['skincare', 'face', 'face care'] },
        { base: 'Moisturizer', brands: ['Cetaphil', 'Neutrogena', 'Plum'], priceRange: [499, 1999], occasions: ['Casual'], image: 'moisturizer', keywords: ['skincare', 'face', 'face care'] },
        { base: 'Sunscreen', brands: ['La Roche-Posay', 'Neutrogena', 'Biotique'], priceRange: [599, 2499], occasions: ['Casual'], image: 'sunscreen', keywords: ['skincare', 'face', 'face care'] },
        { base: 'Body Lotion', brands: ['The Body Shop', 'Vaseline', 'Nivea'], priceRange: [399, 1999], occasions: ['Casual'], image: 'body-lotion', keywords: ['skincare', 'body', 'body care'] },
    ],
};

// 🎉 NEW GUARANTEED-WORKING RANDOM FASHION UNSPLASH LINKS
const imageMap = {
    'evening-gown': 'https://images.unsplash.com/photo-1520975918318-3a28e6e2754c?auto=format&fit=crop&w=800&q=80',
    'maxi-dress': 'https://images.unsplash.com/photo-1520968032320-908c49d5aa4a?auto=format&fit=crop&w=800&q=80',
    'cocktail-dress': 'https://images.unsplash.com/photo-1521220546620-91e6337cd2f4?auto=format&fit=crop&w=800&q=80',
    'a-line-dress': 'https://images.unsplash.com/photo-1520974735194-7da9aef06b40?auto=format&fit=crop&w=800&q=80',
    'bodycon-dress': 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80',
    'anarkali': 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80',
    'lehenga': 'https://images.unsplash.com/photo-1604830114100-13eebbcc1f40?auto=format&fit=crop&w=800&q=80',
    'saree': 'https://images.unsplash.com/photo-1596464716127-29c38b0530a0?auto=format&fit=crop&w=800&q=80',
    'midi-dress': 'https://images.unsplash.com/photo-1551355738-76a6df4cbe58?auto=format&fit=crop&w=800&q=80',

    'silk-blouse': 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80',
    'kurti': 'https://images.unsplash.com/photo-1602810318739-d001574f9f93?auto=format&fit=crop&w=800&q=80',
    'crop-top': 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=800&q=80',
    'formal-shirt': 'https://images.unsplash.com/photo-1522336572468-97b06e8ef143?auto=format&fit=crop&w=800&q=80',
    'tunic': 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
    'coord-top': 'https://images.unsplash.com/photo-1583743814966-f0d3a4c16a3f?auto=format&fit=crop&w=800&q=80',
    'blazer': 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80',

    'palazzo': 'https://images.unsplash.com/photo-1530041539828-1036c7a96c6e?auto=format&fit=crop&w=800&q=80',
    'jeans': 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80',
    'formal-trousers': 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=800&q=80',
    'cigarette-pants': 'https://images.unsplash.com/photo-1520975918318-3a28e6e2754c?auto=format&fit=crop&w=800&q=80',
    'coord-pants': 'https://images.unsplash.com/photo-1562157873-818bc0726c13?auto=format&fit=crop&w=800&q=80',
    'dhoti-pants': 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80',

    'handbag': 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
    'clutch': 'https://images.unsplash.com/photo-1605902711622-cfb43c4437d0?auto=format&fit=crop&w=800&q=80',
    'tote': 'https://images.unsplash.com/photo-1546421845-6471bdcf3f81?auto=format&fit=crop&w=800&q=80',
    'sling-bag': 'https://images.unsplash.com/photo-1503342394128-c104d54dba01?auto=format&fit=crop&w=800&q=80',

    'earrings': 'https://images.unsplash.com/photo-1585386959984-a4155223f8da?auto=format&fit=crop&w=800&q=80',
    'necklace': 'https://images.unsplash.com/photo-1585386959983-8d1d24dd47ce?auto=format&fit=crop&w=800&q=80',
    'pearl-jewelry': 'https://images.unsplash.com/photo-1585386959982-fc2e0d8e754e?auto=format&fit=crop&w=800&q=80',
    'fashion-jewelry': 'https://images.unsplash.com/photo-1600181953010-a3f49b0a12fd?auto=format&fit=crop&w=800&q=80',

    'gold-watch': 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=800&q=80',
    'smart-watch': 'https://images.unsplash.com/photo-1558231908-727c95e135f5?auto=format&fit=crop&w=800&q=80',
    'leather-watch': 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80',

    'heels': 'https://images.unsplash.com/photo-1520697222860-7c92fa909715?auto=format&fit=crop&w=800&q=80',
    'juttis': 'https://images.unsplash.com/photo-1549576490-b0b4831ef60a?auto=format&fit=crop&w=800&q=80',
    'sneakers': 'https://images.unsplash.com/photo-1582582621959-e646b333dcdd?auto=format&fit=crop&w=800&q=80',
    'sandals': 'https://images.unsplash.com/photo-1562271752-68e47f87b1e0?auto=format&fit=crop&w=800&q=80',
    'boots': 'https://images.unsplash.com/photo-1535043481255-f0708144f89f?auto=format&fit=crop&w=800&q=80',
    'flats': 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',

    'lipstick': 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=80',
    'eyeshadow': 'https://images.unsplash.com/photo-1596462502278-27bfdd403cc2?auto=format&fit=crop&w=800&q=80',
    'foundation': 'https://images.unsplash.com/photo-1600185365992-1bbf908db8b5?auto=format&fit=crop&w=800&q=80',
    'mascara': 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80',

    'serum': 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
    'moisturizer': 'https://images.unsplash.com/photo-1571781535133-1ec09825442f?auto=format&fit=crop&w=800&q=80',
    'sunscreen': 'https://images.unsplash.com/photo-1581710139016-3160c30b43e4?auto=format&fit=crop&w=800&q=80',
    'body-lotion': 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&w=800&q=80',
};

const colors = ['Black', 'White', 'Red', 'Blue', 'Green', 'Yellow', 'Pink', 'Purple', 'Orange', 'Brown', 'Beige', 'Navy', 'Burgundy', 'Emerald'];
const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Free Size'];
const seasons = ['Spring', 'Summer', 'Fall', 'Winter', 'All Season'];

function generateProducts() {
    const products = [];
    let productId = 1;

    Object.entries(productTemplates).forEach(([category, templates]) => {
        templates.forEach((template) => {
            for (let i = 0; i < 15; i++) {
                template.brands.forEach((brand) => {
                    const price = Math.floor(Math.random() * (template.priceRange[1] - template.priceRange[0])) + template.priceRange[0];
                    const hasDiscount = Math.random() > 0.7;
                    const originalPrice = hasDiscount ? Math.floor(price * 1.3) : null;
                    const discount = hasDiscount ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

                    const occasion = template.occasions[Math.floor(Math.random() * template.occasions.length)];
                    const keywords = template.keywords || [];

                    const randomSeed = Math.floor(Math.random() * 10000);
                    const baseImage = imageMap[template.image];
                    const uniqueImage = `${baseImage}&sig=${randomSeed}`;

                    const product = {
                        name: `${template.base} ${String.fromCharCode(65 + Math.floor(i / 2))}${i % 2 + 1}`,
                        brand,
                        category,
                        price,
                        originalPrice,
                        discount,
                        description: `Premium ${template.base.toLowerCase()} from ${brand}, perfect for ${occasion.toLowerCase()} occasions ${keywords.join(' ')}`,
                        images: [uniqueImage],
                        colors: [colors[Math.floor(Math.random() * colors.length)], colors[Math.floor(Math.random() * colors.length)]],
                        sizes: category === 'Eyewear' || category === 'Watches' || category === 'Bags' ? ['One Size'] : sizes.slice(0, Math.floor(Math.random() * 3) + 3),
                        occasion,
                        season: seasons[Math.floor(Math.random() * seasons.length)],
                        rating: (Math.random() * 2 + 3).toFixed(1),
                        reviews: Math.floor(Math.random() * 500) + 10,
                        stock: Math.floor(Math.random() * 50) + 5,
                        featured: Math.random() > 0.9,
                        trending: Math.random() > 0.85,
                    };

                    products.push(product);
                    productId++;
                });
            }
        });
    });

    return products;
}

async function seedDatabase() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        await Product.deleteMany({});
        console.log('Cleared products');

        const products = generateProducts();
        console.log(`Generated ${products.length} products`);

        const batchSize = 100;
        for (let i = 0; i < products.length; i += batchSize) {
            const batch = products.slice(i, i + batchSize);
            await Product.insertMany(batch);
            console.log(`Inserted batch ${Math.floor(i / batchSize) + 1}`);
        }

        console.log('Database seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Seed error:', error);
        process.exit(1);
    }
}

seedDatabase();
