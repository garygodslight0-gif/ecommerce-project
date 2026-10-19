import { it, expect ,describe } from "vitest";

import { formatMoney } from "./format-money";
describe ('formarMoney',( )=>{
it ('formats 199 cents as $19.99', ()=>{

expect(formatMoney(1999)).toBe('$19.99')
});

it('displays 2 decimals ', ()=>{    
    expect(formatMoney(2000)).toBe('$20.00');
    expect (formatMoney(100)).toBe('$1.00');
});

});
