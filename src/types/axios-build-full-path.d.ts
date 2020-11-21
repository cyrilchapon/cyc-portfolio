declare module 'axios/lib/core/buildFullPath' {
  const buildFullPath: (baseURL: string | undefined | null, requestedURL: string) => string
  export default buildFullPath
}
