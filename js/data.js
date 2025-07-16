// ===== PRODUCT DATA ===== //
const PRODUCTS_DATA = [
    {
        id: 1,
        name: "Élégance Noir",
        category: "homme",
        price: 189,
        oldPrice: 249,
        volume: "100ml",
        description: "Une fragrance sophistiquée aux notes boisées et épices orientales. Parfaite pour les occasions spéciales et l'usage nocturne.",
        notes: ["Boisé", "Épicé", "Oriental"],
        badge: "Nouveau",
        images: [
            "https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=400",
            "https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=400"
        ],
        featured: true,
        inStock: true,
        rating: 4.8,
        reviews: 127
    },
    {
        id: 2,
        name: "Rose Mystique",
        category: "femme",
        price: 225,
        oldPrice: null,
        volume: "100ml",
        description: "Fragrance florale sophistiquée aux roses bulgares et jasmin. Une composition élégante et féminine.",
        notes: ["Floral", "Rose", "Jasmin"],
        badge: "Premium",
        images: [
            "https://images.pexels.com/photos/1961795/pexels-photo-1961795.jpeg?auto=compress&cs=tinysrgb&w=400",
            "https://images.pexels.com/photos/1961795/pexels-photo-1961795.jpeg?auto=compress&cs=tinysrgb&w=400"
        ],
        featured: true,
        inStock: true,
        rating: 4.9,
        reviews: 89
    },
    {
        id: 3,
        name: "Océan Breeze",
        category: "homme",
        price: 159,
        oldPrice: null,
        volume: "100ml",
        description: "Fragrance aquatique et rafraîchissante, idéale pour le quotidien. Notes citriques et marines.",
        notes: ["Aquatique", "Citrique", "Frais"],
        badge: null,
        images: [
            "https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=400",
            "https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=400"
        ],
        featured: false,
        inStock: true,
        rating: 4.6,
        reviews: 203
    },
    {
        id: 4,
        name: "Rêves Sucrés",
        category: "femme",
        price: 179,
        oldPrice: null,
        volume: "100ml",
        description: "Fragrance douce et enveloppante aux notes de vanille et fruits rouges. Parfaite pour les moments romantiques.",
        notes: ["Doux", "Vanille", "Fruité"],
        badge: "Best Seller",
        images: [
            "https://images.pexels.com/photos/1961795/pexels-photo-1961795.jpeg?auto=compress&cs=tinysrgb&w=400",
            "https://images.pexels.com/photos/1961795/pexels-photo-1961795.jpeg?auto=compress&cs=tinysrgb&w=400"
        ],
        featured: true,
        inStock: true,
        rating: 4.7,
        reviews: 156
    },
    {
        id: 5,
        name: "Essence Urbaine",
        category: "unisex",
        price: 199,
        oldPrice: null,
        volume: "100ml",
        description: "Fragrance moderne et polyvalente, parfaite pour toute occasion. Notes équilibrées et sophistiquées.",
        notes: ["Moderne", "Équilibré", "Polyvalent"],
        badge: null,
        images: [
            "https://images.pexels.com/photos/1961795/pexels-photo-1961795.jpeg?auto=compress&cs=tinysrgb&w=400",
            "https://images.pexels.com/photos/1961795/pexels-photo-1961795.jpeg?auto=compress&cs=tinysrgb&w=400"
        ],
        featured: false,
        inStock: true,
        rating: 4.5,
        reviews: 94
    },
    {
        id: 6,
        name: "Puissance Intense",
        category: "homme",
        price: 299,
        oldPrice: 399,
        volume: "100ml",
        description: "Fragrance intense et marquante pour hommes confiants. Notes profondes et durables.",
        notes: ["Intense", "Marquant", "Durable"],
        badge: "Édition Limitée",
        images: [
            "https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=400",
            "https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=400"
        ],
        featured: true,
        inStock: true,
        rating: 4.9,
        reviews: 67
    },
    {
        id: 7,
        name: "Jardin Secret",
        category: "femme",
        price: 245,
        oldPrice: null,
        volume: "100ml",
        description: "Une création exclusive inspirée des jardins français. Notes florales délicates et raffinées.",
        notes: ["Floral", "Délicat", "Raffiné"],
        badge: "Premium",
        images: [
            "https://images.pexels.com/photos/1961795/pexels-photo-1961795.jpeg?auto=compress&cs=tinysrgb&w=400",
            "https://images.pexels.com/photos/1961795/pexels-photo-1961795.jpeg?auto=compress&cs=tinysrgb&w=400"
        ],
        featured: false,
        inStock: true,
        rating: 4.8,
        reviews: 112
    },
    {
        id: 8,
        name: "Nuit Étoilée",
        category: "unisex",
        price: 275,
        oldPrice: null,
        volume: "100ml",
        description: "Fragrance mystérieuse et captivante pour les soirées d'exception. Composition unique et envoûtante.",
        notes: ["Mystérieux", "Captivant", "Unique"],
        badge: "Édition Limitée",
        images: [
            "https://images.pexels.com/photos/1961795/pexels-photo-1961795.jpeg?auto=compress&cs=tinysrgb&w=400",
            "https://images.pexels.com/photos/1961795/pexels-photo-1961795.jpeg?auto=compress&cs=tinysrgb&w=400"
        ],
        featured: true,
        inStock: false,
        rating: 5.0,
        reviews: 23
    }
];

// ===== FILTER CATEGORIES ===== //
const FILTER_CATEGORIES = [
    { id: 'all', name: 'Toutes', count: PRODUCTS_DATA.length },
    { id: 'homme', name: 'Pour Homme', count: PRODUCTS_DATA.filter(p => p.category === 'homme').length },
    { id: 'femme', name: 'Pour Femme', count: PRODUCTS_DATA.filter(p => p.category === 'femme').length },
    { id: 'unisex', name: 'Unisexe', count: PRODUCTS_DATA.filter(p => p.category === 'unisex').length },
    { id: 'limited', name: 'Édition Limitée', count: PRODUCTS_DATA.filter(p => p.badge === 'Édition Limitée').length }
];

// ===== TESTIMONIALS DATA ===== //
const TESTIMONIALS_DATA = [
    {
        id: 1,
        name: "Marie Dubois",
        location: "Paris",
        rating: 5,
        comment: "Une expérience olfactive exceptionnelle. La qualité Tataifelps est incomparable.",
        product: "Rose Mystique",
        avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100"
    },
    {
        id: 2,
        name: "Jean-Pierre Martin",
        location: "Lyon",
        rating: 5,
        comment: "Élégance Noir est devenu ma signature. Un parfum d'une sophistication rare.",
        product: "Élégance Noir",
        avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100"
    },
    {
        id: 3,
        name: "Sophie Laurent",
        location: "Marseille",
        rating: 5,
        comment: "Le service client est exceptionnel et les fragrances sont d'une qualité irréprochable.",
        product: "Jardin Secret",
        avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100"
    }
];

// ===== COMPANY INFO ===== //
const COMPANY_INFO = {
    name: "Tataifelps",
    subtitle: "Maison de Parfums Exclusifs",
    description: "L'excellence française au service de l'art olfactif depuis 1990.",
    founded: 1990,
    location: "São Paulo - SP",
    email: "atelier@tataifelps.com",
    phone: "+55 (11) 99999-9999",
    whatsapp: "5511999999999",
    social: {
        instagram: "#",
        facebook: "#",
        tiktok: "#"
    },
    services: [
        "Consultation Privée",
        "Création Sur Mesure",
        "Coffrets Cadeaux",
        "Livraison Premium"
    ],
    values: [
        {
            icon: "fas fa-award",
            title: "Excellence Artisanale",
            description: "Création manuelle de chaque fragrance avec les plus nobles matières premières"
        },
        {
            icon: "fas fa-leaf",
            title: "Ingrédients Rares",
            description: "Sélection exclusive d'essences précieuses provenant des quatre coins du monde"
        },
        {
            icon: "fas fa-crown",
            title: "Éditions Limitées",
            description: "Collections exclusives en quantités limitées pour les connaisseurs"
        }
    ]
};

// ===== EXPORT DATA ===== //
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        PRODUCTS_DATA,
        FILTER_CATEGORIES,
        TESTIMONIALS_DATA,
        COMPANY_INFO
    };
} else if (typeof window !== 'undefined') {
    window.PRODUCTS_DATA = PRODUCTS_DATA;
    window.FILTER_CATEGORIES = FILTER_CATEGORIES;
    window.TESTIMONIALS_DATA = TESTIMONIALS_DATA;
    window.COMPANY_INFO = COMPANY_INFO;
}