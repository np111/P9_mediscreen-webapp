export interface ApiPatient {
    id: string;
    firstName: string;
    lastName: string;
    birthdate?: string;
    gender?: ApiGender;
    phone?: string;
    address?: string;
    city?: string;
    postalCode?: string;
    state?: string;
    countryCode?: string;
}

export type ApiGender = 'MALE' | 'FEMALE';

export interface ApiCountries {
    locale: string;
    countries: {[code: string]: ApiCountry};
}

export interface ApiCountry {
    code: string;
    name: string;
}

export interface ApiPhoneCountries {
    locale: string;
    countries: ApiPhoneCountry[];
}

export interface ApiPhoneCountry {
    regionCode: string;
    callingCode: number;
    name: string;
}
