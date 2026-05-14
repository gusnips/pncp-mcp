import { z } from 'zod';
import type { Contratacao, Contrato, Ata } from '../schemas/pncp.js';

export const ESFERA_VALUES = ['federal', 'estadual', 'municipal', 'distrital'] as const;
export type Esfera = (typeof ESFERA_VALUES)[number];

export const EsferaSchema = z.enum(ESFERA_VALUES);

const ESFERA_TO_PNCP_ID: Record<Esfera, string> = {
  federal: 'F',
  estadual: 'E',
  municipal: 'M',
  distrital: 'D',
};

export function matchesEsfera(
  item: Contratacao | Contrato | Ata,
  esfera: Esfera | undefined,
): boolean {
  if (!esfera) return true;
  const expected = ESFERA_TO_PNCP_ID[esfera];
  const actual = item.orgaoEntidade?.esferaId;
  if (!actual) return false;
  return actual.toUpperCase() === expected;
}
