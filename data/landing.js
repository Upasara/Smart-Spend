import { BarChart, Receipt, PieChart, CreditCard, Globe, LightbulbIcon, BarChart2 } from "lucide-react"

const statusData = [
    {
        value: '50K+',
        label: "Active Users"
    },
    {
        value: "2B+",
        label: "Transaction Tracked"
    },
    {
        value: "99.9%",
        label: "Uptime Guarantee"
    },
    {
        value:"4.9/5",
        label:" User Rating"
    }
]

const featuresData = [
    {
        icon:<BarChart className="h-6 w-6 text-secondary-main"/>,
        title:"Advance Analytics",
        description:"Get detailed insights into your financial habits with our advanced analytics tools."
    },
    {
        icon:<Receipt className="h-6 w-6 text-secondary-main"/>,
        title:"Smart Reciept Scanner",
        description:"Extract data automatically from reciept using advance AI technology."
    },
    {
        icon:<PieChart className="h-6 w-6 text-secondary-main"/>,
        title:"Budget Planning",
        description:"Plan and manage your budget effectively with our intuitive budgeting tools."
    },
    {
        icon:<CreditCard className="h-6 w-6 text-secondary-main"/>,
        title:"Multi Account Support",
        description:"Manage multiple bank accounts and credit cards all in one place."
    },
    {
        icon: <Globe className="h-6 w-6 text-secondary-main"/>,
        title:"Multi Currency Support",
        description:"Support for multiple currencies with real-time conversion."
    },
    {
        icon:<LightbulbIcon className="h-6 w-6 text-secondary-main"/>,
        title: "Automated Insights",
        description: "Receive personalized financial insights and recommendations based on your spending patterns."
    }

]

const howItWorksData = [
    {
        icon: <CreditCard className="h-8 w-8 text-secondary-main"/>,
        title:"1. Create Your Account",
        description:'Sign up for a free account using your email or social media accounts.'
    },
    {
        icon:<BarChart2 className="h-8 w-8 text-secondary-main"/>,
        title: "2. Track Your Expenses",
        description: "Easily log your daily expenses and categorize them for better tracking."
    },
    {
        icon:<PieChart className="h-8 w-8 text-secondary-main"/>,
        title: "3. Get Insights",
        description: "Analyze your spending patterns and receive personalized financial insights."
    }
]

const testimonialsData = [
    {
        name:"Mihiranga Upasara",
        role: "Software Engineer",
        image:'/testimonials/1.jpg',
        feedback:"This app has transformed the way I manage my finances. The analytics tools are incredibly powerful and easy to use."
    },
    {
        name:"Kalum Perera",
        role: "Product Manager",
        image:'/testimonials/2.jpg',
        feedback:"I love the smart receipt scanner feature! It saves me so much time and effort when logging my expenses."
    },
    {
        name:"  Nadeesha Fernando",
        role: "Entrepreneur",
        image:'/testimonials/4.jpg',
        feedback:"The budget planning tools have helped me stay on track with my financial goals. Highly recommend this app!"
    }
]

export {statusData, featuresData, howItWorksData, testimonialsData}

