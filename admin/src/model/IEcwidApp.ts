export interface IEcwidApp {
  init(data: IInitData): void

  setAppStorage(
    data: { public: string },
    successCallback: () => void,
    errorCallback: (error: unknown) => void
  ): void
  getAppPublicConfig(callback: (value: string | null) => void): void
}

interface IInitData {
  app_id: string
  autoloadedflag: boolean
  autoheight: boolean
}