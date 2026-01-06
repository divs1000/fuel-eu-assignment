import { PrismaClient, Route as PrismaRoute } from "@prisma/client";
import type { RouteRepository } from "../../core/ports/RouteRepository";
import type { Route } from "../../core/domain/Route";

/**
 * Prisma-backed implementation of the RouteRepository interface.
 *
 * This class adapts the Prisma Route model to the domain Route type.
 */
export class PostgresRouteRepository implements RouteRepository {
  constructor(private readonly prisma: PrismaClient) {}

  /**
   * Retrieve all routes from the database.
   */
  async findAll(): Promise<Route[]> {
    const routes = await this.prisma.route.findMany();
    return routes.map(this.toDomain);
  }

  /**
   * Retrieve a single route by its identifier.
   */
  async findById(id: string): Promise<Route | null> {
    const route = await this.prisma.route.findUnique({
      where: { id },
    });

    if (!route) {
      return null;
    }

    return this.toDomain(route);
  }

  /**
   * Persist a route.
   * If the route has an id, it will be updated; otherwise, a new record is created.
   */
  async save(route: Route): Promise<Route> {
    const { id, ...dataWithoutId } = route as Route & { id?: string };

    let saved: PrismaRoute;

    if (id) {
      saved = await this.prisma.route.update({
        where: { id },
        data: {
          vesselType: route.vesselType,
          fuelType: route.fuelType,
          year: route.year,
          ghgIntensity: route.ghgIntensity,
          fuelConsumption: route.fuelConsumption,
          distance: route.distance,
        },
      });
    } else {
      saved = await this.prisma.route.create({
        data: {
          vesselType: route.vesselType,
          fuelType: route.fuelType,
          year: route.year,
          ghgIntensity: route.ghgIntensity,
          fuelConsumption: route.fuelConsumption,
          distance: route.distance,
        },
      });
    }

    return this.toDomain(saved);
  }

  /**
   * Map a Prisma Route record to the domain Route entity.
   */
  private toDomain(prismaRoute: PrismaRoute): Route {
    return {
      id: prismaRoute.id,
      vesselType: prismaRoute.vesselType,
      fuelType: prismaRoute.fuelType,
      year: prismaRoute.year,
      ghgIntensity: prismaRoute.ghgIntensity,
      fuelConsumption: prismaRoute.fuelConsumption,
      distance: prismaRoute.distance,
      // createdAt / updatedAt can be added to the domain if needed
    } as Route;
  }
}

