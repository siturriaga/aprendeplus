declare module "react" {
  export type Key = string | number;

  export interface Attributes {
    key?: Key | null | undefined;
  }

  export type ReactText = string | number;
  export type ReactChild = ReactElement | ReactText;
  export type ReactFragment = {} | Iterable<ReactNode>;
  export type ReactNode = ReactChild | ReactFragment | boolean | null | undefined;

  export interface ReactElement<P = any, T extends string | JSXElementConstructor<any> = string | JSXElementConstructor<any>> {
    type: T;
    props: P;
    key: Key | null;
  }

  export interface FC<P = {}> {
    (props: P & { children?: ReactNode }): ReactElement<any, any> | null;
    displayName?: string;
  }

  export interface ProviderProps<T> {
    value: T;
    children?: ReactNode;
  }

  export interface ProviderExoticComponent<P> {
    (props: P & { children?: ReactNode }): ReactElement | null;
  }

  export interface ConsumerProps<T> {
    children: (value: T) => ReactNode;
  }

  export interface Context<T> {
    Provider: ProviderExoticComponent<ProviderProps<T>>;
    Consumer: FC<ConsumerProps<T>>;
  }

  export function createContext<T>(defaultValue: T): Context<T>;
  export function useContext<T>(context: Context<T>): T;

  export interface Dispatch<A> {
    (value: A): void;
  }

  export type SetStateAction<S> = S | ((prevState: S) => S);

  export function useState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>];
  export function useState<S = undefined>(): [S | undefined, Dispatch<SetStateAction<S | undefined>>];
  export function useReducer<R extends (state: S, action: A) => S, S, A>(reducer: R, initialState: S): [S, Dispatch<A>];
  export function useEffect(effect: () => void | (() => void), deps?: readonly unknown[]): void;
  export function useLayoutEffect(effect: () => void | (() => void), deps?: readonly unknown[]): void;
  export function useMemo<T>(factory: () => T, deps: readonly unknown[]): T;
  export function useCallback<T extends (...args: any[]) => any>(callback: T, deps: readonly unknown[]): T;
  export function useRef<T>(initialValue: T | null): RefObject<T>;

  export interface RefObject<T> {
    readonly current: T | null;
  }

  export interface PropsWithChildren<P> {
    children?: ReactNode;
  }

  export interface LazyExoticComponent<P extends FC<any>> {
    (props: Parameters<P>[0]): ReturnType<P>;
    readonly $$typeof: symbol;
  }

  export function lazy<T extends FC<any>>(factory: () => Promise<{ default: T }>): LazyExoticComponent<T>;

  export interface SuspenseProps {
    children?: ReactNode;
    fallback?: ReactNode;
  }

  export const Suspense: FC<SuspenseProps>;
  export const StrictMode: FC<{ children?: ReactNode }>;
  export const Fragment: unique symbol;

  export interface JSXElementConstructor<P> {
    (props: P): ReactElement<any, any> | null;
  }

  export interface Component<P = {}, S = {}> {
    props: Readonly<P> & { children?: ReactNode };
    state: Readonly<S>;
    setState(state: Partial<S> | ((prev: Readonly<S>) => Partial<S> | null)): void;
  }

  export interface ComponentClass<P = {}, S = {}> {
    new (props: P): Component<P, S>;
    prototype: Component<P, S>;
  }

  export function createElement<P>(type: string | JSXElementConstructor<P>, props?: P | null, ...children: ReactNode[]): ReactElement<P>;
  export function cloneElement<P>(element: ReactElement<P>, props?: Partial<P>, ...children: ReactNode[]): ReactElement<P>;
}

declare module "react/jsx-runtime" {
  export const Fragment: typeof import("react").Fragment;
  export function jsx(type: any, props: any, key?: any): any;
  export function jsxs(type: any, props: any, key?: any): any;
}

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
  interface IntrinsicAttributes extends import("react").Attributes {}
}
