// types/pinia.d.ts
import { PiniaCustomStateProperties } from 'pinia';

declare module 'pinia' {
  export interface DefineStoreOptionsBase<S, Store> {
    persist?: {
      storage?: Storage | undefined;
    };
  }

  export interface DefineSetupStoreOptions<Id extends string, S extends Record<string, any>, G, A> {
    persist?: {
      storage?: Storage | undefined;
    };
  }
}
