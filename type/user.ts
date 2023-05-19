interface UserResponse {
  address: Address;
  id: number;
  email: string;
  username: string;
  password: string;
  name: Name;
  phone: string;
}

interface Address {
  geolocation: GeolocationType;
  city: string;
  street: string;
  number: number;
  zipcode: string;
}

interface GeolocationType {
  lat: string;
  long: string;
}

interface Name {
  firstname: string;
  lastname: string;
}
