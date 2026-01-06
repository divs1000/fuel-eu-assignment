import type { Route } from "../domain/Route";

/**
 * Abstraction for accessing and persisting Route domain entities.
 *
 * Implementations may use databases, external services, or in-memory storage,
 * but this interface should remain free of infrastructure concerns.
 */
export interface RouteRepository {
  /**
   * Retrieves all routes.
   */
  findAll(): Promise<Route[]>;

  /**
   * Retrieves a single route by its identifier.
   *
   * @param id - Unique identifier of the route.
   * @returns The route if found, otherwise null.
   */
  findById(id: string): Promise<Route | null>;

  /**
   * Persists a route.
   *
   * @param route - The route to save.
   * @returns The saved route (which may include updated fields like IDs).
   */
  save(route: Route): Promise<Route>;
}

