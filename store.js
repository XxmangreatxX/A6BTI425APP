import { atom } from 'jotai';

export const favouritesAtom = atom([]); // When I remove the empty array, the cardDetails when
                                        // clicked would crash or not show anything so I didnt remove it
export const searchHistoryAtom = atom([]); // for this too