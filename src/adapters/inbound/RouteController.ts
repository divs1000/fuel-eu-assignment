import type { Request, Response, NextFunction, Router } from "express";
import { Router as createRouter } from "express";
import type { RouteService } from "../../core/application/RouteService";

/**
 * Factory for an Express router handling route-related HTTP endpoints.
 *
 * The controller depends on the RouteService from the application layer,
 * which is injected to keep this adapter free of business logic.
 */
export function createRouteController(routeService: RouteService): Router {
  const router = createRouter();

  /**
   * GET /routes
   * Returns all routes.
   */
  router.get(
    "/routes",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const routes = await routeService.getAllRoutes();
        res.json(routes);
      } catch (error) {
        next(error);
      }
    }
  );

  return router;
}

