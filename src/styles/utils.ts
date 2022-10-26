import { CreateCSSProperties } from "@mui/styles";

type RemovedPx<T extends number | string | null> = T extends null ? null : number

export const removePx = <T extends number | string | null> (value: T): RemovedPx<T> => (
  value != null
    ? typeof value === "string" ? parseInt(value.replace("px", ""), 10) : value
    : null
) as RemovedPx<T>

export const maybePxToPx = (value?: number | string) =>
  typeof value === "number" ? `${value}px` : value != null ? value : "0";

export type PropsFunc<Props extends object, T> = (props: Props) => T;
export type PropsCssFunc<Props extends object> = PropsFunc<
  Props,
  CreateCSSProperties<Props>
>;
