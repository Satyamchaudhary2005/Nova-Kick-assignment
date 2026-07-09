import { Request, Response } from "express";
export declare const getProducts: (req: Request, res: Response) => Promise<void>;
export declare const getProductById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getFeaturedProducts: (_req: Request, res: Response) => Promise<void>;
export declare const getTrendingProducts: (_req: Request, res: Response) => Promise<void>;
export declare const getCategories: (_req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=productController.d.ts.map