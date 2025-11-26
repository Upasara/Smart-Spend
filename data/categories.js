export const defaultCategories = [
    //income
    {
        id: "salary",
        name: "Salary",
        type: "INCOME",
        color: '#22c55e',
        icon: 'Wallet'
    },
    {
        id: "freelance",
        name: "Freelance",
        type: "INCOME",
        color: '#06b6d4',
        icon: 'Laptop'
    },{
        id: "investment",
        name: "Investment",
        type: "INCOME",
        color: '#8b5cf6',
        icon: 'TrendingUp'
    },{
        id: "other-income",
        name: "Other Income",
        type: "INCOME",
        color: '#64748b',
        icon: 'Wallet'
    },

    //expense
    {
        id: "rent",
        name: "Rent",
        type: "EXPENSE",
        color:'#ef4444',
        icon: 'Home',
        subCategories:["Rent", "Mortgage", "Property Tax"]
    },
    {
        id: "groceries",
        name: "Groceries",
        type: "EXPENSE",
        color:'#14b8a6',
        icon: '',
        subCategories:["Supermarket", "Farmers Market", "Grocery Delivery"]
    },
    {
        id: "utilities",
        name: "Utilities",
        type: "EXPENSE",
        color:'#f97316',
        icon: 'NotebookText',
        subCategories:["Electricity", "Water", "Gas", "Internet", "Phone" ]
    },
    {
        id: "entertainment",
        name: "Entertainment",
        type: "EXPENSE",
        color:'#d946ef',
        icon: 'Clapperboard',
        subCategories:["Movies", "Concerts", "Games", "Streaming Services"]
    },
    {
        id: "transportation",
        name: "Transportations",
        type: "EXPENSE",
        color:'#6366f1',
        icon: 'Bus',
        subCategories:["Public Transit", "Fuel", "Taxi", "Ride Sharing" ]
    },
]

export const categoryColor = defaultCategories.reduce((acc, category) => {
    acc[category.id] = category.color
    return acc
}, {})
