/*
*********************************
**    'yarn generate-types'    **
*********************************
*/

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const filePath = join(process.cwd(), 'src', 'api', 'types.ts');
const comment = `
/*
***********************************************************************
***      THIS FILE CONTAINS CURRENTSEA-API TYPES/INTERFACES/DTOS    ***
***                                                                 ***
***              TO UPDATE, RUN "yarn generate-types"               ***
***                                                                 ***
***********************************************************************
*/


`;

const fileContents = readFileSync(filePath, 'utf8');

const fileWithComment = comment + fileContents;

writeFileSync(filePath, fileWithComment);
