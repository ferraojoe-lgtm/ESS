import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";

// Regular expressions for strict formats
// Phone: Must be 10-20 characters long, allow optional leading +, digits, spaces, parentheses, or dashes
const phoneRegex = /^\+?[0-9\s\-()]{10,20}$/;

// Request ID: REQ- followed by digits
const requestIdRegex = /^REQ-\d+$/;

// 1. Auth Signup & Login Schema
export const authSchema = z.object({
  email: z.string()
    .min(1, "Email is required")
    .trim()
    .email("Invalid email format")
    .max(255, "Email cannot exceed 255 characters"),
  
  password: z.string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters long")
    .max(100, "Password cannot exceed 100 characters")
});

// 2. Password Reset Schema
export const passwordResetSchema = z.object({
  email: z.string()
    .min(1, "Email is required")
    .trim()
    .email("Invalid email format")
    .max(255, "Email cannot exceed 255 characters")
});

// 3. Service Request POST Schema (Homepage Quote Request or Admin Creation)
export const createRequestSchema = z.object({
  clientName: z.string()
    .min(1, "Client name is required")
    .trim()
    .min(2, "Client name must be at least 2 characters")
    .max(100, "Client name cannot exceed 100 characters")
    .regex(/^[a-zA-Z\s.\-']+$/, "Client name can only contain letters, spaces, dots, hyphens, and apostrophes"),
  
  email: z.string()
    .min(1, "Email is required")
    .trim()
    .email("Invalid email format")
    .max(255, "Email cannot exceed 255 characters"),
  
  phone: z.string()
    .min(1, "Phone number is required")
    .trim()
    .regex(phoneRegex, "Phone number must be between 10 and 20 digits, and can only contain digits, spaces, parentheses, or dashes"),
  
  serviceType: z.string()
    .min(1, "Service type is required")
    .trim()
    .min(2, "Service type must be at least 2 characters")
    .max(100, "Service type cannot exceed 100 characters"),
  
  details: z.string()
    .max(2000, "Details cannot exceed 2000 characters")
});

// 4. Service Request PATCH Schema
export const updateRequestSchema = z.object({
  status: z.enum(["Pending", "In Progress", "Completed", "Canceled"]).optional(),
  
  billingAmount: z.number()
    .min(0, "Billing amount cannot be negative")
    .max(1000000, "Billing amount cannot exceed $1,000,000")
    .optional(),
  
  billingStatus: z.enum(["Unpaid", "Paid"]).optional()
}).refine(data => data.status !== undefined || data.billingAmount !== undefined || data.billingStatus !== undefined, {
  message: "At least one field to update must be provided"
});

// 5. Delete Request Archival Report Schema
export const deleteReportSchema = z.object({
  id: z.string()
    .regex(requestIdRegex, "ID must match format REQ-XXXX")
    .max(50, "ID is too long"),
  
  clientName: z.string()
    .min(2, "Client name must be at least 2 characters")
    .max(100, "Client name cannot exceed 100 characters"),
  
  email: z.string()
    .email("Invalid email format")
    .max(255, "Email cannot exceed 255 characters"),
  
  phone: z.string()
    .regex(phoneRegex, "Phone number format is invalid"),
  
  serviceType: z.string()
    .min(2, "Service type must be at least 2 characters")
    .max(100, "Service type cannot exceed 100 characters"),
  
  details: z.string()
    .max(2000, "Details cannot exceed 2000 characters"),
  
  createdAt: z.string()
    .datetime({ message: "CreatedAt must be a valid ISO 8601 datetime string" })
});

// Middleware Factory to handle requests
export const validateBody = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // parse will strictly throw if types/lengths/formats do not match exactly
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const issues = error.issues.map(err => ({
          field: err.path.join('.'),
          message: err.message
        }));
        return res.status(400).json({
          error: "Input validation failed. Please check your inputs.",
          details: issues
        });
      }
      return res.status(400).json({ error: "Invalid request payload" });
    }
  };
};

export const validateParams = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.params = schema.parse(req.params) as any;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          error: "Invalid URL parameters",
          details: error.issues.map(err => ({
            param: err.path.join('.'),
            message: err.message
          }))
        });
      }
      return res.status(400).json({ error: "Invalid URL parameters" });
    }
  };
};

// Parameter validator schemas
export const idParamSchema = z.object({
  id: z.string().regex(requestIdRegex, "Invalid Request ID format. Must match 'REQ-XXXX'.")
});
