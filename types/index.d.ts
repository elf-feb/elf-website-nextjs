export interface InitProps {
  ctx: {
    asPath: string,
    isServer: boolean,
    pathname: string,
    query: any,
    req?: any,
    store: {
      dispatch: Function,
      getState: Function,
      liftedStore: any,
      replaceReducer: Function,
      runSagaTask: Function,
      sagaTask: any,
      subscribe: Function,
    },
  },
}
