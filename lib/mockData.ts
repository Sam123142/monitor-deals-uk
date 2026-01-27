export interface Monitor {
    id: string;
    title: string;
    price: number;
    originalPrice: number;
    image: string;
    specs: {
        brand: string;
        size: string;
        resolution: string;
        refreshRate: string;
    };
    affiliateLink: string;
    retailer: string;
    lastUpdated: string;
}

export const mockMonitors: Monitor[] = [
    {
        id: "1",
        title: "UltraGear 27\" OLED Gaming Monitor GS95QE",
        price: 749.99,
        originalPrice: 899.99,
        image: "https://placehold.co/600x400/png?text=LG+OLED+27",
        specs: {
            brand: "LG",
            size: "27 inches",
            resolution: "QHD (2560 x 1440)",
            refreshRate: "240Hz",
        },
        affiliateLink: "#",
        retailer: "Amazon UK",
        lastUpdated: "Today",
    },
    {
        id: "2",
        title: "Odyssey G9 OLED Curved Gaming Monitor",
        price: 1099.99,
        originalPrice: 1499.00,
        image: "https://placehold.co/600x400/png?text=Samsung+G9+OLED",
        specs: {
            brand: "Samsung",
            size: "49 inches",
            resolution: "DQHD (5120 x 1440)",
            refreshRate: "240Hz",
        },
        affiliateLink: "#",
        retailer: "Samsung UK",
        lastUpdated: "Yesterday",
    },
    {
        id: "3",
        title: "Alienware AW3423DWF QD-OLED",
        price: 649.99,
        originalPrice: 929.00,
        image: "https://placehold.co/600x400/png?text=Alienware+QD-OLED",
        specs: {
            brand: "Dell",
            size: "34 inches",
            resolution: "WQHD (3440 x 1440)",
            refreshRate: "165Hz",
        },
        affiliateLink: "#",
        retailer: "Dell UK",
        lastUpdated: "2 hours ago",
    },
    {
        id: "4",
        title: "TUF Gaming VG27AQ1A",
        price: 249.00,
        originalPrice: 329.00,
        image: "https://placehold.co/600x400/png?text=ASUS+TUF+VG27",
        specs: {
            brand: "ASUS",
            size: "27 inches",
            resolution: "QHD (2560 x 1440)",
            refreshRate: "170Hz",
        },
        affiliateLink: "#",
        retailer: "Amazon UK",
        lastUpdated: "Today",
    },
    {
        id: "5",
        title: "Gigabyte M27Q KVM",
        price: 269.95,
        originalPrice: 359.99,
        image: "https://placehold.co/600x400/png?text=Gigabyte+M27Q",
        specs: {
            brand: "Gigabyte",
            size: "27 inches",
            resolution: "QHD (2560 x 1440)",
            refreshRate: "170Hz",
        },
        affiliateLink: "#",
        retailer: "Overclockers UK",
        lastUpdated: "Today",
    },
    {
        id: "6",
        title: "Acer Predator X27U OLED",
        price: 799.00,
        originalPrice: 899.99,
        image: "https://placehold.co/600x400/png?text=Predator+X27U",
        specs: {
            brand: "Acer",
            size: "27 inches",
            resolution: "QHD (2560 x 1440)",
            refreshRate: "240Hz",
        },
        affiliateLink: "#",
        retailer: "Amazon UK",
        lastUpdated: "Today",
    },
    {
        id: "7",
        title: "MSI Optix MAG274QRF-QD",
        price: 329.99,
        originalPrice: 449.00,
        image: "https://placehold.co/600x400/png?text=MSI+Optix+QD",
        specs: {
            brand: "MSI",
            size: "27 inches",
            resolution: "QHD (2560 x 1440)",
            refreshRate: "165Hz",
        },
        affiliateLink: "#",
        retailer: "Currys",
        lastUpdated: "Just now",
    },
    {
        id: "8",
        title: "KOORUI 24E3 Gaming Monitor",
        price: 119.99,
        originalPrice: 159.99,
        image: "https://placehold.co/600x400/png?text=KOORUI+24E3",
        specs: {
            brand: "KOORUI",
            size: "24 inches",
            resolution: "FHD (1920 x 1080)",
            refreshRate: "165Hz",
        },
        affiliateLink: "#",
        retailer: "Amazon UK",
        lastUpdated: "Today",
    },
    {
        id: "9",
        title: "BenQ MOBIUZ EX2710S",
        price: 189.00,
        originalPrice: 249.00,
        image: "https://placehold.co/600x400/png?text=BenQ+Mobiuz",
        specs: {
            brand: "BenQ",
            size: "27 inches",
            resolution: "FHD (1920 x 1080)",
            refreshRate: "165Hz",
        },
        affiliateLink: "#",
        retailer: "Amazon UK",
        lastUpdated: "Today",
    },
    {
        id: "10",
        title: "AOC Gaming C24G2A Curved",
        price: 129.00,
        originalPrice: 169.99,
        image: "https://placehold.co/600x400/png?text=AOC+C24G2A",
        specs: {
            brand: "AOC",
            size: "24 inches",
            resolution: "FHD (1920 x 1080)",
            refreshRate: "165Hz",
        },
        affiliateLink: "#",
        retailer: "Amazon UK",
        lastUpdated: "Today",
    },
];
