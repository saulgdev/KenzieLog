export interface iAddressRequest {
    district: string
    zipCode: string
    number?: string
    city: string
    state: string
}

export interface iAddressUpdate{
    district: string
    zipCode: string
    number: string
    city?: string
    state?: string
}