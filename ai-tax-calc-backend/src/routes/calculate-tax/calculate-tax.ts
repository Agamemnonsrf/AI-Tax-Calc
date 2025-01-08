import express, { Request, Response } from 'express';
import { calculateBusinessTax, calculateTax } from './util';
import { BusinessTaxFormData, TaxFormData } from '../auth/models/tax';

const router = express.Router();


router.post("/salary-tax", (req: Request, res: Response) => {
    const formData: TaxFormData = req.body;
    const result = calculateTax(formData);
    res.json(result);
});

router.post("/business-tax", (req: Request, res: Response) => {
    const formData: BusinessTaxFormData = req.body;
    const result = calculateBusinessTax(formData);
    res.json(result);
});

export default router;