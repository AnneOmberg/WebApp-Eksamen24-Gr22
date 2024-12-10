export type HappeningType = {
    id: string,
    slug: string,
    title: string,
    date: string,
    description: string,
    location: string,
    category: string,
    seats: string,       
    price: string,
    status: string
}

export type OrderType = {
    id: string,
    slug: string,
    title: string,
    date: string,
    description: string,
    location: string,
    category: string,
    seats: string,       
    price: string,
    status: string,
    ticets: string,
    name: string,
    email: string,
}

export type FormType = {
    id: string
    title: string
    persons: PersonType[]
}

export type PersonType = {
    id: string
    name: string
    email: string
}

// export type AdminType = {

// }