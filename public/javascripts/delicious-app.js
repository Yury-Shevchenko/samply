import '../sass/style.scss';

import { $, $$ } from './modules/bling';
import autocomplete from './modules/autocomplete';
import typeAhead from './modules/typeAhead';
import ajaxTest from './modules/addTest';
// import makeMap from './modules/map'

// autocomplete( $('#address'), $('#lat'), $('#lng') );
typeAhead( $('.search') );
// makeMap( $('#map'))

const testForms = $$('form.heart');//listen to all forms
testForms.on('submit', ajaxTest);
