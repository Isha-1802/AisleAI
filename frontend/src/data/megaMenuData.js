export const megaMenuData = {
    columns: [
        {
            title: 'CLOTHING',
            items: [
                { name: 'Dresses', link: '/collections?category=Dresses' },
                { name: 'Tops & Blouses', link: '/collections?category=Tops' },
                { name: 'Trousers & Pants', link: '/collections?category=Trousers' },
                { name: 'Jeans', link: '/collections?search=jeans' },
                { name: 'Skirts', link: '/collections?search=skirts' },
                { name: 'Co-ord Sets', link: '/collections?search=coord' },
                { name: 'Ethnic Wear', link: '/collections?search=ethnic' },
                { name: 'Western Wear', link: '/collections?search=western' },
            ]
        },
        {
            title: 'FOOTWEAR',
            items: [
                { name: 'Heels & Stilettos', link: '/collections?category=Footwear&search=heels' },
                { name: 'Sneakers', link: '/collections?category=Footwear&search=sneakers' },
                { name: 'Sandals', link: '/collections?category=Footwear&search=sandals' },
                { name: 'Juttis & Mojaris', link: '/collections?category=Footwear&search=juttis' },
                { name: 'Boots', link: '/collections?category=Footwear&search=boots' },
                { name: 'Flats & Ballerinas', link: '/collections?category=Footwear&search=flats' },
            ]
        },
        {
            title: 'ACCESSORIES',
            items: [
                { name: 'Handbags', link: '/collections?category=Bags' },
                { name: 'Clutches', link: '/collections?category=Bags&search=clutch' },
                { name: 'Sunglasses', link: '/collections?category=Eyewear' },
                { name: 'Watches', link: '/collections?category=Watches' },
                { name: 'Jewelry', link: '/collections?category=Jewelry' },
                { name: 'Belts & Scarves', link: '/collections?search=accessories' },
            ]
        },
        {
            title: 'BEAUTY',
            items: [
                { name: 'Makeup', link: '/collections?category=Makeup' },
                { name: 'Skincare', link: '/collections?category=Skincare' },
                { name: 'Lip Care', link: '/collections?category=Makeup&search=lip' },
                { name: 'Eye Makeup', link: '/collections?category=Makeup&search=eye' },
                { name: 'Face Care', link: '/collections?category=Skincare&search=face' },
                { name: 'Body Care', link: '/collections?search=body' },
            ]
        },
        {
            title: 'SHOP BY OCCASION',
            items: [
                { name: 'Party Wear', link: '/collections?occasion=Party' },
                { name: 'Wedding Collection', link: '/collections?occasion=Wedding' },
                { name: 'Casual Wear', link: '/collections?occasion=Casual' },
                { name: 'Office Wear', link: '/collections?occasion=Work' },
                { name: 'Festive Collection', link: '/collections?occasion=Festive' },
                { name: 'Formal Attire', link: '/collections?occasion=Formal' },
            ]
        },
        {
            title: 'TRENDING NOW',
            highlight: true,
            items: [
                { name: 'New Arrivals', link: '/collections?filter=new', badge: 'NEW' },
                { name: 'Best Sellers', link: '/collections?sort=-reviews', badge: '🔥' },
                { name: 'Sale Items', link: '/collections?discount=true', badge: '50% OFF' },
                { name: 'Featured Brands', link: '/collections?featured=true' },
                { name: 'Under ₹999', link: '/collections?maxPrice=999' },
                { name: 'Luxury Collection', link: '/collections?minPrice=10000' },
            ]
        },
    ]
};
