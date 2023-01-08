export default function limitNumber(num: any, min: number, max: number) {
  const MIN = min || -9999999;
  const MAX = max || 9999999;
  const parsed = parseFloat(num);
  const result = Math.min(Math.max(parsed, MIN), MAX);
  return result;
}
