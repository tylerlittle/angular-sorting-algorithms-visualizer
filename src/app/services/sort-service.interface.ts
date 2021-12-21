import { Bar } from "../models";

export interface ISortService {
    sort: (originalArray: Bar[]) => Bar[][];
}