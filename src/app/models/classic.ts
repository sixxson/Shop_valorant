
export interface Gun {
    id: number;
    name: string;
    price: number;
    imgURL: {
        colordefault: string;
        color1: string;
        color2: string;
        color3: string;
    };
    colorURL: {
        colorDefault: string;
        color1: string;
        color2: string;
        color3: string; 
    }
    title: string;
    type: string;
    set: string;
    ranking: string;
    star: number;
}


export interface User {
    id: number;
    username: string;
    password: string;
    email: string;
    role: string;
}

export interface Other {
    id: number;
    fullName: string;
    company: string;
    fullAddress: string;
    email: string;
    phone: number;
    items:{
        id: number;
        price: number;
        img: string;
        name: string;
        set: string;
        quantity: number;
    }
    shipping: string;
    totalAmount: number;
    payment: string;
    status: string;
}