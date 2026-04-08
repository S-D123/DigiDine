const admin = require('firebase-admin');

// If GOOGLE_APPLICATION_CREDENTIALS is set this will use that service account
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  projectId: 'digidine-ee170'
});

const db = admin.firestore();

async function addEntries() {
  const batch = db.batch();
  const items = [
        {
            "category": "starters",
            "description": "Crispy chicken wings tossed in our signature spicy buffalo sauce",
            "filters": ["non-veg", "spicy"],
            "name": "Spicy Buffalo Wings",
            "price": 12.99
        },
        {
            "category": "starters",
            "description": "Creamy hummus served with warm pita bread and fresh vegetables",
            "filters": ["vegan"],
            "name": "Hummus Platter",
            "price": 9.99
        },
        {
            "category": "starters",
            "description": "Lightly battered squid rings served with marinara sauce",
            "filters": ["non-veg"],
            "name": "Crispy Calamari",
            "price": 14.99
        },
        {
            "category": "main",
            "description": "12oz prime ribeye with garlic butter, served with roasted vegetables",
            "filters": ["non-veg"],
            "name": "Grilled Ribeye Steak",
            "price": 34.99
        },
        {
            "category": "main",
            "description": "Atlantic salmon with lemon dill sauce and quinoa pilaf",
            "filters": ["non-veg"],
            "name": "Pan-Seared Salmon",
            "price": 28.99
        },
        {
            "category": "main",
            "description": "Creamy arborio rice with wild mushrooms and parmesan",
            "filters": ["veg"],
            "name": "Mushroom Risotto",
            "price": 22.99
        },
        {
            "category": "main",
            "description": "Tender chicken in aromatic coconut curry with jasmine rice",
            "filters": ["non-veg", "spicy"],
            "name": "Thai Green Curry",
            "price": 19.99
        },
        {
            "category": "main",
            "description": "Quinoa, roasted chickpeas, avocado, and tahini dressing",
            "filters": ["vegan"],
            "name": "Buddha Bowl",
            "price": 16.99
        },
        {
            "category": "desserts",
            "description": "Warm chocolate cake with a gooey center, served with vanilla ice cream",
            "filters": ["veg"],
            "name": "Molten Chocolate Cake",
            "price": 10.99
        },
        {
            "category": "desserts",
            "description": "Classic Italian dessert with espresso-soaked ladyfingers and mascarpone",
            "filters": ["veg"],
            "name": "Tiramisu",
            "price": 9.99
        },
        {
            "category": "desserts",
            "description": "Assorted seasonal fruit sorbets - refreshing and dairy-free",
            "filters": ["vegan"],
            "name": "Fresh Fruit Sorbet",
            "price": 7.99
        },
        {
            "category": "beverages",
            "description": "Freshly brewed single-origin coffee - Americano, Latte, or Cappuccino",
            "filters": ["veg"],
            "name": "Artisan Coffee",
            "price": 4.99
        },
        {
            "category": "beverages",
            "description": "House-made lemonade with fresh mint - classic or strawberry",
            "filters": ["vegan"],
            "name": "Fresh Lemonade",
            "price": 5.99
        },
        {
            "category": "beverages",
            "description": "Mango, pineapple, and coconut blended to perfection",
            "filters": ["vegan"],
            "name": "Tropical Smoothie",
            "price": 7.99
        },
        {
            "category": "beverages",
            "description": "Selection of fine red wines by the glass",
            "filters": ["veg"],
            "name": "House Red Wine",
            "price": 12.99
        }
    ]

//   items.forEach(item => {
//     const ref = db.collection('restaurants/urban-bistro/menu-items').doc(item.id);
//     batch.set(ref, item, { merge: true });
//   });

    for (const item of items) {
        try {
        let ref;
        // auto-generate id and include it in the document data
        ref = db.collection('restaurants/urban-bistro/menu-items').doc();
        batch.set(ref, { ...item, id: ref.id }, { merge: true });
        } catch (err) {
        console.error('Failed to prepare item for batch:', item, err);
        throw err;
        }
    }

  await batch.commit();
  console.log(`Added ${items.length} documents to menuItems collection.`);
}

addEntries().catch(err => { console.error(err); process.exit(1); });