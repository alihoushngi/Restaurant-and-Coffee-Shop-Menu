declare module "minimatch" {
  export interface IMinimatchOptions {
    nocase?: boolean;
    dot?: boolean;
    noext?: boolean;
    matchBase?: boolean;
    nocomment?: boolean;
    nonegate?: boolean;
    flipNegate?: boolean;
    windowsPathsNoEscape?: boolean;
  }

  export function minimatch(
    pattern: string,
    input: string,
    options?: IMinimatchOptions,
  ): boolean;
  export default minimatch;
}
