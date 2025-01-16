export type PricingPlan ={
    level :string;
    price:string;
    services: string[]

}


export const pricingPlan : PricingPlan[]= [
{
    level : "Free",
    price : "$0/month",
    services :[
        "3 free credits",
        "Basic Supports",
        "Limited Features",
        " Limited Community Access"
    ]
},
{
    level : "Pro",
    price : "$29/month",
    services :[
        "Unlimited credits",
        "Basic Supports",
        "Limited Features",
        "Community Access"
    ]
},
{
    level : "Enterprice",
    price : "$100/month",
    services :[
        "Unlimited credits",
        "Full Supports",
        "All Features",
        "Community Access"
    ]
}

]