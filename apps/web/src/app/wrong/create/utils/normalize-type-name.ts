import { normalize } from "@/app/wrong/create/utils/label-match";

export const normalizeTypeName = (v: string) => normalize(v).toLowerCase();
