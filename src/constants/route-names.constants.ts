/**
 * - Route names should be equal to the name of the component
 * if it is possible.
 *
 * - Route names should be unique.
 */
interface RouteNames {
  [componentName: string]: string
}
const ROUTE_NAMES: RouteNames = Object.freeze({
  Breeds: 'Breeds',
  BreedsFavorites: 'BreedsFavorites',
  BreedsItem: 'BreedsItem',
})

export default ROUTE_NAMES
