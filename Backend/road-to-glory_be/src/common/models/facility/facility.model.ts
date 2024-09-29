export interface Facility{
    iron_cost: number[];
    grain_cost: number[];
    unit_name: string[];
    health: number; //Ovo sluzi za odabir konkretne jedinice (ako imamo vise istog tipa)
    type: string; //Ovo sluzi za odabir konkretnog factory
}