/**
 * Formats the address object into a string representation.
 * @param {Address} address - An object containing the address details.
 * @param {string} address.city - The name of the city.
 * @param {string} address.street - The name of the street.
 * @param {number} address.number - The street number.
 * @param {string} address.zipcode - The postal code or zip code of the address.
 * @returns {string} A string representing the formatted address.
 */
export const formatAddress = (address: Address): string => {
  return `${address.number} ${address.street}, ${address.city}, ${address.zipcode}`;
};
