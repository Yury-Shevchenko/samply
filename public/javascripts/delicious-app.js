import '../sass/style.scss';

import { $, $$ } from './modules/bling';
import autocomplete from './modules/autocomplete';
import typeAhead from './modules/typeAhead';
import ajaxTest from './modules/addTest';

typeAhead( $('.search') );

const testForms = $$('form.heart');//listen to all forms
testForms.on('submit', ajaxTest);
